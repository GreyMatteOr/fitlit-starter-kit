const dateMath = require('date-arithmetic');

class Activity {
  constructor(data) {
    this.data = data.map((datum) => {
      if(datum.date.__proto__.constructor.name !== 'Date') {
        let newDate = datum.date.split('/')
                              .map((data) => parseInt(data));
        datum.date = new Date(...newDate);
      }
      return datum;
    });
  };

  getUserData(id) {
    let userData = this.data.filter((datum) => {
      return datum.userID === id;
    });
    return userData;
  };

  getMilesWalked(date, user) {
    let day = this.data.find((datum) => {
      return dateMath.eq(datum.date, date) && datum.userID === user.id;
    });
    if (day === undefined) return null;
    let steps = day.numSteps;
    let strideLength = user.strideLength;
    return steps * strideLength / 5280;
  };

  getMinutesActive(date, id) {
    let day = this.data.find((datum) => {
      return dateMath.eq(datum.date, date) && datum.userID === id;
    });
    if (day === undefined) return null;
    return day.minutesActive;
  }

  getAverageActivityOverWeek(weekStart, weekEnd, id) {
    let userData = this.data.filter(datum => {
      let diffFromStart = dateMath.diff(datum.date, weekStart, 'day', false);
      let diffFromEnd = dateMath.diff(datum.date, weekEnd, 'day', false);
      return datum.userID === id &&
             Math.abs(diffFromStart) <= 6 &&
             Math.abs(diffFromEnd) <= 6;
    });
    let totalMinutes = userData.reduce((sumActive, curr, i, arr) => {
      return sumActive + curr.minutesActive;
    }, 0);
    return totalMinutes / userData.length
  }

  exceededGoal(user, day) {
    if( user === undefined || day === undefined) return null;
    let isRightUser = user.id === day.userID;
    let exceededGoal = day.numSteps > user.dailyStepGoal
    return isRightUser && exceededGoal;
  };

  getDaysExceeded(user) {
    let daysExceeded = this.data.filter((datum) => {
      return this.exceededGoal(user, datum)
    })
    return daysExceeded || [];
  };

  getRecordStairs(user) {
    return this.data.reduce((record, contender) => {
      return (contender.userID === user.id ? Math.max(record, contender.flightsOfStairs) : record);
    }, 0);
  };

  getMonthlyActivityChampion(beginDate, endDate = dateMath.add(beginDate, 1, 'month')) {
    return this.data.reduce((record, current) => {
      let check = record.record;
      let test = (dateMath.inRange(current.date, beginDate, endDate) ? Math.max(record.record, current.minutesActive) : record.record);
      return (check === test ? record : {userID: current.userID, record: current.minutesActive});
    }, {userID: null, record: 0});
  };

}

if (typeof(module) !== undefined) {
  module.exports = Activity;
}

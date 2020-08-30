// const moment = require('moment');

class Activity {
  constructor(data) {
    this.data = data.map((datum) => {
      if(datum.date.__proto__.constructor.name !== 'Date') {
        datum.date = moment(datum.date, 'YYYY/MM/DD');
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

  getDayStat(date, id, stat) {
    let day = this.data.find((datum) => {
      return id === datum.userID && moment(date).isSame(datum.date);
    });
    if (day === undefined) return null;
    return day[stat];
  }

  getStepsTaken(date, id) {
    return this.getDayStat(date, id, 'numSteps');
  }

  getMilesWalked(date, user) {
    let steps = this.getStepsTaken(date, user.id)
    let strideLength = user.strideLength;
    return (steps === null ? null : steps * strideLength / 5280);
  };

  getMinutesActive(date, id) {
    return this.getDayStat(date, id, 'minutesActive');
  }

  getFlightsClimbed(date, id) {
    return this.getDayStat(date, id, 'flightsOfStairs');
  }

  getAverageActivityOverWeek(id, weekEnd, weekStart = moment(weekEnd).subtract(6, 'd')) {
    return this.getAverageStatOverWeek(weekEnd, weekStart, id, 'minutesActive')
  }

  getAverageStepsOverWeek(id, weekEnd, weekStart = moment(weekEnd).subtract(6, 'd')) {
    return this.getAverageStatOverWeek(weekEnd, weekStart, id, 'numSteps')
  }

  getAverageFlightsOverWeek(id, weekEnd, weekStart = moment(weekEnd).subtract(6, 'd')) {
    return this.getAverageStatOverWeek(weekEnd, weekStart, id, 'flightsOfStairs')
  }

  getAverageStatOverWeek(weekEnd, weekStart, id, stat) {
    weekStart = moment(weekStart).subtract(1, 's');
    weekEnd = moment(weekEnd).add(1, 's');
    let userData = this.data.filter(datum => {
      return datum.userID === id && moment(datum.date).isBetween(weekStart, weekEnd);
    });
    console.log(userData)
    let total = userData.reduce((sum, curr) => {
      return sum + curr[stat];
    }, 0);
    return total / userData.length
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

  getMonthlyActivityChampion(beginDate, endDate = moment(beginDate).add(1, 'M')) {
    return this.data.reduce((record, current) => {
      let check = record.record;
      let test = (moment(current.date).isBetween(beginDate, endDate) ? Math.max(record.record, current.minutesActive) : record.record);
      return (check === test ? record : {userID: current.userID, record: current.minutesActive});
    }, {userID: null, record: 0});
  };

  getAverageStepsOnDay(date) {
    return this.getAverageStatOnDate('numSteps', date);
  };

  getAverageMinutesOnDay(date) {
    return this.getAverageStatOnDate('minutesActive', date);
  }

  getAverageFlightsOnDay(date) {
    return this.getAverageStatOnDate('flightsOfStairs', date);
  }

  getAverageStatOnDate(stat, date) {
    let days = this.data.filter((obj) => {
      return moment(date).isSame(obj.date)
    });
    if(days.length === 0) return 0;
    let sum = days.reduce((total, currentUser) => {
      total += currentUser[stat]
      return total
    },0);
    return sum / days.length;
  }
}

// module.exports = Activity;

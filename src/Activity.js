// if( typeof(module) !== undefined) {
const moment = require('moment');
// }

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

  getStepsTaken(date, id) {

    let day = this.data.find((datum) => {
      return id === datum.userID && moment(date, 'YYYY/MM/DD').isSame(datum.date);
    });
    console.log(day)
    return day.numSteps;
  }

  getMilesWalked(date, user) {
    let day = this.data.find((datum) => {
      return moment(datum.date).isSame(date) && datum.userID === user.id;
    });
    if (day === undefined) return null;
    let steps = day.numSteps;
    let strideLength = user.strideLength;
    return steps * strideLength / 5280;
  };

  getMinutesActive(date, id) {
    let day = this.data.find((datum) => {
      return moment(datum.date).isSame(date) && datum.userID === id;
    });
    if (day === undefined) return null;
    return day.minutesActive;
  }

  getAverageActivityOverWeek(weekStart, weekEnd, id) {
    weekStart = moment(weekStart).subtract(1, 's');
    weekEnd = moment(weekEnd).add(1, 's');
    let userData = this.data.filter(datum => {
      return datum.userID === id && moment(datum.date).isBetween(weekStart, weekEnd);
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

  getMonthlyActivityChampion(beginDate, endDate = moment(beginDate).add(1, 'M')) {
    return this.data.reduce((record, current) => {
      let check = record.record;
      let test = (moment(current.date).isBetween(beginDate, endDate) ? Math.max(record.record, current.minutesActive) : record.record);
      return (check === test ? record : {userID: current.userID, record: current.minutesActive});
    }, {userID: null, record: 0});
  };

  // data accessed to?- input/form
    // days - array of user activity objects
  //what is ouput?
    // average steps overall for the day
    // add up all user activity object numSteps / day.length
    // return single number
  //what methods could be helpful
    //filter- for day
    //reduce

  // break it downtown
    //pick specified date object
    // if object date property matched date passed inspect
    //
  getOverallAverageStepsOnDay(date) {
    let days = this.data.filter((obj) => {
      return moment(date).isSame(obj.date)
    });
    if(days.length === 0) return 0;
    let allSteps = days.reduce((total, currentUser) => {
      total += currentUser.numSteps
      return total
    },0);
    return allSteps / days.length;
  };


}

if (typeof(module  ) !== undefined) {
  module.exports = Activity;
}

// if (typeof module !== 'undefined') {
//   var moment = require('moment');
//   var DataRepository = require('./DataRepository.js');
// }

class Activity extends DataRepository {
  constructor(data) {
    super(data);
  };

  getStepsTaken(date, id) {
    return this.getDayStat(date, id, 'numSteps');
  }

  getMinutesActive(date, id) {
    return this.getDayStat(date, id, 'minutesActive');
  }

  getFlightsClimbed(date, id) {
    return this.getDayStat(date, id, 'flightsOfStairs');
  }

  getMilesWalked(date, user) {
    let steps = this.getStepsTaken(date, user.id)
    let strideLength = user.strideLength;
    return (steps === null ? null : steps * strideLength / 5280);
  };

  getAverageActivityOverWeek(id, weekEnd) {
    return this.getAverageStatOverWeek(id, 'minutesActive', weekEnd)
  }

  getAverageStepsOverWeek(id, weekEnd) {
    return this.getAverageStatOverWeek(id, 'numSteps', weekEnd)
  }

  getAverageFlightsOverWeek(id, weekEnd) {
    return this.getAverageStatOverWeek(id, 'flightsOfStairs', weekEnd)
  }

  exceededGoal(user, day) {
    if (user === undefined || day === undefined || user.id !== day.userID) return null;
    return day.numSteps > user.dailyStepGoal;
  };

  getDaysExceeded(user) {
    let daysExceeded = this.data.filter((datum) => {
      return this.exceededGoal(user, datum)
    })
    return daysExceeded || [];
  };

  getRecordStairs(user) {
    if(this.getUserData(user.id).length ===0) {
      return null;
    }
    return this.getUserData(user.id).reduce((record, contender) => {
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
    if(days.length === 0) return null;
    let sum = days.reduce((total, currentUser) => {
      total += currentUser[stat]
      return total
    },0);
    return sum / days.length;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}

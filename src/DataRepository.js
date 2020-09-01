if (typeof(module) !== 'undefined') {
  const moment = require('moment');
}

class DataRepository{
  constructor(data) {
    this.data = data.map((datum) => {
      if(datum.date.__proto__.constructor.name !== 'Date') {
        datum.date = moment(datum.date, 'YYYY/MM/DD');
      }
      return datum;
    });
    this.trackedUsers = {};
    this.uniqueIDs = this.data.reduce((userIDs, data) => {
      userIDs.add(data.userID);
      return userIDs;
    }, new Set());
    this.uniqueIDs = Array.from(this.uniqueIDs);
  }

  getUserData(id) {
    let userData = this.trackedUsers[id];
    if(userData === undefined) {
      userData = this.data.filter((datum) => datum.userID === id);
      userData.sort((a, b) => {
        return (moment(a.date).isBefore(b.date) ? -1 : 0);
      });
      this.trackedUsers[id] = userData;
    }
    return userData;
  }

  getDayStat(date, id, stat) {
    let userData = this.getUserData(id);
    let day = userData.find((datum) => {
      return moment(date).isSame(datum.date);
    });
    if (day === undefined) return null;
    return day[stat];
  }

  getWeekStats(id,
    stat,
    weekEnd,
    weekStart = moment(weekEnd).subtract(6, 'd')
  ) {
    let userData = this.getUserData(id);
    weekStart = moment(weekStart).subtract(1, 's');
    weekEnd = moment(weekEnd).add(1, 's');
    let week = userData.filter(datum => moment(datum.date).isBetween(weekStart, weekEnd));
    let output = week.map(day => (day ? day[stat]: null));
    week = week.filter(day => day !== null);
    return output;
  }

  getAverageStatOverWeek(
    id,
    stat,
    weekEnd,
    weekStart = moment(weekEnd).subtract(6, 'd')
  ) {
    weekStart = moment(weekStart).subtract(1, 's');
    weekEnd = moment(weekEnd).add(1, 's');
    let week = this.getWeekStats(id, stat, weekEnd, weekStart);
    let total = week.reduce((sum, day) => {
      return sum + day;
    }, 0);
    return total / week.length
  }

  getStatOverallAverageForUser(stat, id) {
    let userData = this.getUserData(id);
    if(userData.length === 0){
      return 0;
    }
    let total = userData.reduce((sum, day) => {
      sum += day[stat];
      return sum;
    }, 0);
    return total / userData.length;
  }

  getStatDailyGlobalAvg(date, stat) {
    let sum = this.data.reduce((total, datum) => total + datum[stat], 0);
    return sum / this.data.length;
  }
}

if (typeof(module) !== 'undefined') {
  module.exports = DataRepository;
}

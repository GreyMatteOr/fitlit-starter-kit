const moment = require('moment');
const DataRepository = require('./DataRepository.js');

class Sleep extends DataRepository{
  constructor(data) {
    super(data);
    this.uniqueIDs = this.data.reduce((userIDs, data) => {
      userIDs.add(data.userID);
      return userIDs;
    }, new Set());
    this.uniqueIDs = Array.from(this.uniqueIDs);
  };

  getAverageHours(id) {
    return this.getStatOverallAverageForUser('hoursSlept', id);
  }

  getAverageQuality(id) {
    return this.getStatOverallAverageForUser('sleepQuality', id);
  }

  getHoursOnDate(date, id) {
    return this.getDayStat(date, id, 'hoursSlept');
  };

  getQualityOnDate(date, id) {
    return this.getDayStat(date, id, 'sleepQuality');
  };

  getWeeklyQuantity(date, id) {
    return this.getWeekStats(id, 'hoursSlept', date);
  }

  getWeeklyQuality(date, id) {
    return this.getWeekStats(id, 'sleepQuality', date);
  }

  getAverageQualityAll() {
    if (this.data.length === 0) return [];
    return this.uniqueIDs.map(id => {
      return this.getStatOverallAverageForUser('sleepQuality', id)
    });
  }

  findHighQualityUsers(date) {
    return this.uniqueIDs.filter((id) => {
      return this.getAverageStatOverWeek(id, 'sleepQuality', date) >= 3;
    });
  }

  getHighestOnDay(date) {
    let output =this.uniqueIDs.reduce(([champ, record], contender) => {
      let contenderHours = this.getHoursOnDate(date, contender);
      if (contenderHours > record) {
        return [contender, contenderHours];
      }
      return [champ, record];
    }, [null, 0]);
    return (output[0] === null? null : output)
  }

  getBestSleepDay() {
    let best = this.data.reduce((champ, contender) => {
      let currentProduct = champ.sleepQuality * champ.hoursSlept;
      let contenderProduct = contender.sleepQuality * contender.hoursSlept;
      if (contenderProduct > currentProduct) champ = contender;
      else if (contenderProduct === currentProduct) {
        let champIsBefore = moment(champ.date).isBefore(contender.date);
        champ = (champIsBefore ? champ : contender);
      }
      return champ;
    });
    return best;
  }
};

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}

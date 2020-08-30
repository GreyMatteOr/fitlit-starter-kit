const moment = require('moment');
const DataRepository = require('./DataRepository.js');

class Hydration extends DataRepository{
  constructor(data) {
    super(data);
  }

  calculateAverageHydration(id) {
    return this.getStatOverallAverageForUser('numOunces', id);
  }

  findOuncesWaterOfDay(date, id) {
    return this.getDayStat(date, id, 'numOunces');
  }

  findOuncesWaterOfWeekBefore(dateOfLastDay, id) {
    return this.getWeekStats(id, 'numOunces', dateOfLastDay);
  };
};

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}

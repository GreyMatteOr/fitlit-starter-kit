class Sleep {
  constructor(sleepUserData) {
    this.data = sleepUserData
  };

  calculateAverage() {
    if(this.data.length === 0){
      return 0;
    }
    let totalHoursSlept = this.data.reduce((hoursSlept, day) => {
      hoursSlept += day.hoursSlept;
      return hoursSlept;
    }, 0);
    return totalHoursSlept / this.data.length;
  }

  calculateAverageQuality() {
    if(this.data.length === 0){
      return 0;
    }
    let totalQuality = this.data.reduce((sleepQuality, day) => {
      sleepQuality += day.sleepQuality;
      return sleepQuality;
    }, 0);
    return totalQuality / this.data.length;
  }

  getHoursSleptOnDate(date) {
    return this.getDetailOnDate('hoursSlept', date);
  };

  getQualityOnDate(date) {
    return this.getDetailOnDate('sleepQuality', date);
  };

  getDetailOnDate(detail, date) {
    let sleepDay = this.data.find((day) => {
      return date === day.date;
    });
    return (sleepDay === undefined ? 0 : sleepDay[detail]);
  }

  getWeeklySleepQuantity(date) {
    return this.getDetailOnWeek('getHoursSleptOnDate', date);
  }

  getWeeklySleepQuality(date) {
    return this.getDetailOnWeek('getQualityOnDate', date);
  }

  getDetailOnWeek(detailFunction, date) {
    let endOfWeek = this.data.find((day) => {
      return date === day.date;
    });
    if (endOfWeek === undefined) return [0, 0, 0, 0, 0, 0, 0];
    let endOfWeekIndex = this.data.indexOf(endOfWeek) + 1;
    let beginningOfWeekIndex = endOfWeekIndex - 7;
    let week = this.data.slice(beginningOfWeekIndex, endOfWeekIndex);
    return week.map(day => this[detailFunction](day.date));
  }
};

module.exports = Sleep;

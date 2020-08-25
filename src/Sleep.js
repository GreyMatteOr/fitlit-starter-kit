class Sleep {
  constructor(sleepUserData) {
    this.data = sleepUserData
  };

  calculateAverage() {
    return this.calculateDetailAverage('hoursSlept');
  }

  calculateAverageQuality() {
    return this.calculateDetailAverage('sleepQuality');
  }

  calculateDetailAverage(detail) {
    if(this.data.length === 0){
      return 0;
    }
    let total = this.data.reduce((sum, day) => {
      sum += day[detail];
      return sum;
    }, 0);
    return total / this.data.length;
  }

  getHoursSleptOnDate(date) {
    return this.getDetailOnDate('hoursSlept', date);
  };

  getQualityOnDate(date) {
    return this.getDetailOnDate('sleepQuality', date);
  };

  getDetailOnDate(detail, date) {
    let day = this.data.find((testDay) => {
      return date === testDay.date;
    });
    return (day === undefined ? 0 : day[detail]);
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

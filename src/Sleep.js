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
    let sleepDay = this.data.find((day) => {
      return date === day.date;
    });
    return (sleepDay === undefined ? this.calculateAverage() : sleepDay.hoursSlept);
  };

  getQualityOnDate(date) {
    let sleepDay = this.data.find((day) => {
      return date === day.date;
    });
    return (sleepDay === undefined ? this.calculateAverageQuality() : sleepDay.sleepQuality);
  };
};

module.exports = Sleep;

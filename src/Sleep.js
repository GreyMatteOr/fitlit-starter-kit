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
};

module.exports = Sleep;

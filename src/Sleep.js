class Sleep {
  constructor(sleepUserData) {

    // current assumptions:
    // Only one users sleep dataOnData//
    // It's sorted chronologically by day with no gaps
    this.data = sleepUserData;

    // new implementation:
    // It's all users
    // Sorted by user, then chronologically by day with no gaps
  };

  getUserData(id) {
    let userData = this.data.filter((sleepData) => sleepData.userID === id);
    return userData;
  }
  calculateAverage(id) {
    let userData = this.getUserData(id);
    return this.calculateDetailAverage('hoursSlept', userData);
  }

  calculateAverageQuality(id) {
    let userData = this.getUserData(id);
    return this.calculateDetailAverage('sleepQuality', userData);
  }

  calculateDetailAverage(detail, userData) {
    if(userData.length === 0){
      return 0;
    }
    let total = userData.reduce((sum, day) => {
      sum += day[detail];
      return sum;
    }, 0);
    return total / userData.length;
  }

  getHoursSleptOnDate(date, id) {
    return this.getDetailOnDate('hoursSlept', date, id);
  };

  getQualityOnDate(date, id) {
    return this.getDetailOnDate('sleepQuality', date, id);
  };

  getDetailOnDate(detail, date, id) {
    let day = this.data.find((testDay) => {
      return (date === testDay.date && id === testDay.userID);
    });
    return (day === undefined ? 0 : day[detail]);
  }

  getWeeklySleepQuantity(date, id) {
    return this.getDetailOnWeek('hoursSlept', date, id);
  }

  getWeeklySleepQuality(date, id) {
    return this.getDetailOnWeek('sleepQuality', date, id);
  }

  getDetailOnWeek(detail, date, id) {
    let userData = this.getUserData(id);
    userData.sort((a, b) => {
      let [aYear, aMonth, aDay] = a.date.split('/');
      let [bYear, bMonth, bDay] = b.date.split('/');
      return aYear - bYear || aMonth - bMonth || aDay - bDay;
    });
    let endOfWeek = userData.find((day) => {
      return date === day.date;
    });
    if (endOfWeek === undefined) return [0, 0, 0, 0, 0, 0, 0];
    let endOfWeekIndex = userData.indexOf(endOfWeek) + 1;
    let beginningOfWeekIndex = endOfWeekIndex - 7;
    let week = userData.slice(beginningOfWeekIndex, endOfWeekIndex);
    return week.map(day => this.getDetailOnDate(detail , day.date, id));
  }
};

module.exports = Sleep;

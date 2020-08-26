class Sleep {
  constructor(sleepUserData) {
    this.data = sleepUserData;
    this.uniqueIDs = this.data.reduce((userIDs, data) => {
      userIDs.add(data.userID);
      return userIDs;
    }, new Set());
    this.uniqueIDs = Array.from(this.uniqueIDs);
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

  getWeeklyQuantity(date, id) {
    return this.getDetailOnWeek('hoursSlept', date, id);
  }

  getWeeklyQuality(date, id) {
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
    let endOfWeekIndex = userData.indexOf(endOfWeek) + 1;
    let beginningOfWeekIndex = Math.max(endOfWeekIndex - 7, 0);
    let week = userData.slice(beginningOfWeekIndex, endOfWeekIndex);
    let output = week.map(day => this.getDetailOnDate(detail , day.date, id));
    while (output.length < 7) {
      output.unshift(0);
    }
    return output;
  }

  getAverageQualityAll() {
    if (this.data.length === 0) return [];
    let userTotals = this.data.reduce((users, user) => {
      let userObj = (users[user.userID] ? users[user.userID] : {total: 0, count: 0});
      userObj.total += user.sleepQuality;
      userObj.count++;
      users[user.userID] = userObj;
      return users;
    }, {});
    return Object.keys(userTotals).map(user => {
      return userTotals[user].total / userTotals[user].count
    });
  }

  findHighQualityUsers(date) {
    let userQuality = this.uniqueIDs.map((id) => {
      return this.getWeeklyQuality(date, id);
    });

    let weeklyAverages = userQuality.map((week) => {
      let weeklyTotal = week.reduce((totalQuality, qualityOfSleep) => {
        return totalQuality + qualityOfSleep;
      }, 0);
      return weeklyTotal / week.length;
    });

    let output = [];
    this.uniqueIDs.forEach((id, i) => {
      if(weeklyAverages[i] >= 3) output.push(id);
    });
    return output;
  }

  getHighestOnDay(date) {
    let quantitiesSleep = this.uniqueIDs.map((id) => {
      return this.getHoursSleptOnDate(date, id);
    })
    let maximumSleep = Math.max(...quantitiesSleep);
    let output = [];
    this.uniqueIDs.forEach((id, i) => {
      if(quantitiesSleep[i] === maximumSleep) output.push(id);
    });
    return output;
  }

  getBestSleepDay() {
    let data = this.data.reduce((currentHighest, contender) => {
      let currentProduct = currentHighest.sleepQuality * currentHighest.hoursSlept;
      let contenderProduct = contender.sleepQuality * contender.hoursSlept;
      if (contenderProduct > currentProduct) currentHighest = contender;
      else if (contenderProduct === currentProduct) {
        let contenderYearMonthDay = contender.date.split('/');
        let highYearMonthDay = currentHighest.date.split('/')
        let [contYear, contMonth, contDay] =  contenderYearMonthDay.map(time => parseInt(time));
        let [highYear, highMonth, highDay] = highYearMonthDay.map(time => parseInt(time));
        let check = contYear - highYear || contMonth - highMonth || contDay - highDay;
        currentHighest = (check >= 0 ? currentHighest : contender);
      }
      return currentHighest;
    });
    return data;
  }
};

module.exports = Sleep;

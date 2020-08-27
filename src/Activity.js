const dateMath = require('date-arithmetic');

class Activity {
  constructor(data) {
    this.data = data.map((datum) => {
      let newDate = datum.date.split('/').map((data) => parseInt(data))
      datum.date = new Date(...newDate);
      return datum;
    });
  };

  getUserData(id) {
    let userData = this.data.filter((datum) => {
      return datum.userID === id;
    });
    return userData;
  };

  getMilesWalked(date, user) {
    let day = this.data.find((datum) => {
      return dateMath.eq(datum.date, date) && datum.userID === user.id;
    });
    if (day === undefined) return null;
    let steps = day.numSteps;
    let strideLength = user.strideLength;
    return steps * strideLength / 5280;
  };

  getMinutesActive(date, id) {
    let day = this.data.find((datum) => {
      return dateMath.eq(datum.date, date) && datum.userID === id;
    });
    if (day === undefined) return null;
    return day.minutesActive;
  }

  getAverageActivityOverWeek(weekStart, weekEnd, id) {
    let userData = this.data.filter(datum => {
      let diffFromStart = dateMath.diff(datum.date, weekStart, 'day', false);
      let diffFromEnd = dateMath.diff(datum.date, weekEnd, 'day', false);
      return datum.userID === id &&
             Math.abs(diffFromStart) <= 6 &&
             Math.abs(diffFromEnd) <= 6;
    });
    let totalMinutes = userData.reduce((sumActive, curr, i, arr) => {
      return sumActive + curr.minutesActive;
    }, 0);
    return totalMinutes / userData.length
  }

  metGoal(user, date) {
    let day = this.data.find(datum => {
      return dateMath.eq(datum.date, date) && datum.userID === user.id;
    });
    return (day ? day.numSteps >= user.dailyStepGoal : null);
  }
}

if (typeof(module) !== undefined) {
  module.exports = Activity;
}

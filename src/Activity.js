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

  getMinutesActive(date, user) {
    let day = this.data.find((datum) => {
      return dateMath.eq(datum.date, date) && datum.userID === user.id;
    });
    if (day === undefined) return null;
    return day.minutesActive;
  }

}

if (typeof(module) !== undefined) {
  module.exports = Activity;
}

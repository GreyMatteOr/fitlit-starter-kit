class Activity {
  constructor(data) {
    this.data = data;
  }

  getUserData(id) {
    let userData = this.data.filter((datum) => {
      return datum.userID === id;
    });
    return userData;
  }

  getMilesWalked(date, user) {
    let day = this.data.find((datum) => {
      return datum.date === date && datum.userID === user.id;
    });
    if (day === undefined) return null;
    let steps = day.numSteps;
    let strideLength = user.strideLength;
    return steps * strideLength / 5280;
  }
}

if (typeof(module) !== undefined) {
  module.exports = Activity;
}

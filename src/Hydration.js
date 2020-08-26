class Hydration{
  constructor(data) {
    this.data = data;
  }

  getUserData(id) {
    return this.data.filter((hydrationData) => hydrationData.userID === id);
  };

  calculateAverageHydration(id) {
    let userData = this.getUserData(id);
    if(userData.length === 0) {
      return 0;
    }
    let totalHydration = userData.reduce((totalOunces, day) => {
      return totalOunces + day.numOunces;
    }, 0);
    return totalHydration / userData.length
  }

  findOuncesWaterOfDay(date, id) {
    let dataOnDay = this.data.find(day => day.date === date && day.userID === id);
    return (dataOnDay) ? dataOnDay.numOunces : 0;
  }

  findOuncesWaterOfWeekBefore(dateOfLastDay, id) {
    let userData = this.getUserData(id);
    userData.sort((h1, h2) => {
      let [year1, month1, day1] = h1.date.split('/');
      let [year2, month2, day2] = h2.date.split('/');
      return year1 - year2 || month1 - month2 || day1 - day2;
    })
    let weekEnd = userData.find(day => day.date === dateOfLastDay);
    let weekCutOffIndex = userData.indexOf(weekEnd) + 1;
    let weekBeginIndex = (weekCutOffIndex - 7 >= 0) ? weekCutOffIndex - 7 : 0;
    let lastWeek = userData.slice(weekBeginIndex, weekCutOffIndex)
    let output = lastWeek.map(day => day.numOunces);
    while(output.length < 7) {
      output.unshift(0);
    };
    return output;
  };
};

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}

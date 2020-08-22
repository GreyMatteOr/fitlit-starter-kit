class Hydration{
  constructor(data) {
    data.sort((h1, h2) => {
      let [year1, month1, day1] = h1.date.split('/');
      let [year2, month2, day2] = h2.date.split('/');
      return year1 - year2 || month1 - month2 || day1 - day2;
    })
    this.data = data;
  }

  calculateAverageHydration() {
    if(this.data.length === 0) {
      return 0;
    }
    let totalHydration = this.data.reduce((totalOunces, day) => {
      return totalOunces + day.numOunces;
    }, 0);
    return totalHydration / this.data.length
  }

  findOuncesWaterOfDay(date) {
    let dataOnDay = this.data.find(day => day.date === date);
    return (dataOnDay) ? dataOnDay.numOunces : 0;
  }

  findOuncesWaterOfWeekBefore(dateOfLastDay) {
    let weekEnd = this.data.find(day => day.date === dateOfLastDay);
    let weekCutOffIndex = this.data.indexOf(weekEnd) + 1;
    let weekBeginIndex = (weekCutOffIndex - 7 >= 0) ? weekCutOffIndex - 7 : 0;
    let lastWeek = this.data.slice(weekBeginIndex, weekCutOffIndex)
    return lastWeek.map(day => day.numOunces);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}

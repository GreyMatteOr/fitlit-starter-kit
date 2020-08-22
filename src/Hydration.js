class Hydration{
  constructor(data) {
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
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}

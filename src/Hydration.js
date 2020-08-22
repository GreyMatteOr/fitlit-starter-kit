class Hydration{
  constructor(data) {
    this.data = data;
  }

  calculateAverageHydration() {
    if(this.data.length === 0) {
      return 0;
    }
    let totalHydration = this.data.reduce((totalOunces, user) => {
      return totalOunces + user.numOunces;
    }, 0);
    return totalHydration / this.data.length
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}

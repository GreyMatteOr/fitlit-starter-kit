class User {
  constructor(data, hydration) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.email = data.email;
    this.strideLength = data.strideLength;
    this.dailyStepGoal = data.dailyStepGoal;
    this.friends = data.friends;
    this.hydration = hydration;
  }

  getFirstName() {
    if (typeof(this.name) !== 'string') {
      return '';
    }
    return this.name.split(' ')[0];
  }

  getLastDay() {
  console.log(this.hydration.data);
    return this.hydration.data[this.hydration.data.length - 1].date;
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}

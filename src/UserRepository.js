class UserRepository{
  constructor(userData) {
    this.data = userData
  }
  getUser(id) {
    return this.data.find(user => user.id === id);
  }
  calculateAverageStepGoal() {
    if(this.data.length === 0) {
      return 0;
    }
    let totalStepGoal = this.data.reduce((sumOfSteps, user) => {
      return sumOfSteps + user.dailyStepGoal;
    }, 0);
    return totalStepGoal / this.data.length
  }
}

module.exports = UserRepository;

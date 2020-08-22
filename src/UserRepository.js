class UserRepository{
  constructor(hydration, sleep, activity) {
    this.hydration = hydration;
    this.sleep = sleep;
    this.activity = activity;
  }
}

module.exports = UserRepository;

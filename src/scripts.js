let greeting = document.querySelector('h1');
const users = new UserRepository(userData);
window.onload = onLoad

function onLoad () {
  let randomUser = getRandomUser();
  let userDailyStepGoal = randomUser.dailyStepGoal
  let averageUsersStepGoal = users.calculateAverageStepGoal();
  greeting.innerText = `Hello ${randomUser.getFirstName()}! Your step goal of ${userDailyStepGoal} is ${(userDailyStepGoal > averageUsersStepGoal) ? 'more than' : 'close to'} the average step goal among users of ${averageUsersStepGoal}.`
}

function getRandomUser() {
  let randomIndex = Math.floor(Math.random() * users.data.length)
  return new User(users.data[randomIndex]);
}

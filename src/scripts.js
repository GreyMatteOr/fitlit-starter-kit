let greeting = document.querySelector('h1');
const users = new UserRepository(userData);
window.onload = onLoad

function onLoad () {
  let randomUser = getRandomUser();
  displayStepGoalMessage(randomUser);
  displayHydration(randomUser);
}

function getRandomUser() {
  let randomIndex = Math.floor(Math.random() * users.data.length)
  let hydration = new Hydration(hydrationData.filter(data => data.userID === users.data[randomIndex].id));
  return new User(users.data[randomIndex], hydration);
}

function displayStepGoalMessage(user) {
  let userDailyStepGoal = user.dailyStepGoal
  let averageUsersStepGoal = users.calculateAverageStepGoal();
  greeting.innerText = `Hello ${user.getFirstName()}! Your step goal of ${userDailyStepGoal} is ${(userDailyStepGoal > averageUsersStepGoal) ? 'more than' : 'close to'} the average step goal among users of ${averageUsersStepGoal}.`
}

function displayHydration(user) {
  let lastDay = user.getLastDay();
  let dailyHydration = user.hydration.findOuncesWaterOfDay(lastDay);
  let averageHydrationOverLatestWeek = user.hydration.findOuncesWaterOfWeekBefore(lastDay);
  averageHydrationOverLatestWeek.pop();
  let message = '';
  averageHydrationOverLatestWeek.forEach((ounces, daysAgo) => message = `
    ${6 - daysAgo} days ago you drank ${ounces} ounces of water` + message);
  message = `
    Your hydration for today is ${dailyHydration}.` + message;
  greeting.innerText += message;
};

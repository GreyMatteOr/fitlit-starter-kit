let greeting = document.querySelector('h1');
const users = new UserRepository(userData);
const hydration = new Hydration(hydrationData);
const sleep = new Sleep(sleepData);
window.onload = onLoad

function onLoad () {
  let randomUser = getRandomUser();
  displayStepGoalMessage(randomUser);
  displayHydration(randomUser);
  displaySleep(randomUser);
}

function getRandomUser() {
  let randomIndex = Math.floor(Math.random() * users.data.length);
  return new User(users.data[randomIndex]);
}

function displayStepGoalMessage(user) {
  let userDailyStepGoal = user.dailyStepGoal
  let averageUsersStepGoal = users.calculateAverageStepGoal();
  greeting.innerText = `Hello ${user.getFirstName()}! Your step goal of ${userDailyStepGoal} is ${(userDailyStepGoal > averageUsersStepGoal) ? 'more than' : 'close to'} the average step goal among users of ${averageUsersStepGoal}.`
}

function displayHydration(user) {
  let lastDay = '2019/09/22';
  let dailyHydration = hydration.findOuncesWaterOfDay(lastDay, user.id);
  let averageHydrationOverLatestWeek = hydration.findOuncesWaterOfWeekBefore(lastDay, user.id);
  averageHydrationOverLatestWeek.pop();
  let message = '';
  averageHydrationOverLatestWeek.forEach((ounces, daysAgo) => message = `
    ${6 - daysAgo} days ago you drank ${ounces} ounces of water` + message);
  message = `
    Your hydration for today is ${dailyHydration}.` + message;
  greeting.innerText += message;
};

function displaySleep(user) {
  let lastDay = '2019/09/22';
  let recentSleepHours = sleep.getHoursSleptOnDate(lastDay, user.id);
  let recentSleepQuality = sleep.getQualityOnDate(lastDay, user.id);
  let adjective = (recentSleepQuality >= 4 ? 'very deeply' : (recentSleepQuality >= 3 ? 'deeply' : (recentSleepQuality >= 2 ? 'alright' : 'poorly')));
  greeting.innerText += `\n${user.getFirstName()} slept ${adjective} for ${recentSleepHours} hours`
}

let greeting = document.querySelector('h1');
const users = new UserRepository(userData);
const hydration = new Hydration(hydrationData);
const sleep = new Sleep(sleepData);
const activity = new Activity(activityData);
window.onload = onLoad

function onLoad () {
  let randomUser = getRandomUser();
  displayStepGoalMessage(randomUser);
  displayHydration(randomUser);
  displaySleep(randomUser);
  displayActivity(randomUser);
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
    Your hydration for today, ${lastDay}, is ${dailyHydration} ounces.` + message;
  greeting.innerText += message;
};

function displaySleep(user) {
  let lastDay = '2019/09/22';
  let recentSleepHours = sleep.getHoursOnDate(lastDay, user.id);
  let recentSleepQuality = sleep.getQualityOnDate(lastDay, user.id);
  let adjective = (recentSleepQuality >= 4 ? 'very deeply' : (recentSleepQuality >= 3 ? 'deeply' : (recentSleepQuality >= 2 ? 'alright' : 'poorly')));
  greeting.innerText += `\n${user.getFirstName()} slept ${adjective} for ${recentSleepHours} hours`;
  let latestWeekSleepHours = sleep.getWeeklyQuantity(lastDay, user.id);
  let latestWeekSleepQuality = sleep.getWeeklyQuality(lastDay, user.id);
  latestWeekSleepHours.reverse();
  latestWeekSleepQuality.reverse();
  latestWeekSleepHours.shift();
  latestWeekSleepQuality.shift();
  latestWeekSleepHours.forEach((quantity, day) => {
    const quality = latestWeekSleepQuality[day];
    greeting.innerText += `\n ${day + 1} day(s) ago, ${user.getFirstName()} slept ${quantity} hours at a ${quality} quality.`
  })
  let averageHours = sleep.getAverageHours(user.id);
  let averageQuality = sleep.getAverageQuality(user.id);
  adjective = (averageQuality >= 4 ? 'very deeply' : (averageQuality >= 3 ? 'deeply' : (averageQuality >= 2 ? 'alright' : 'poorly')));
  greeting.innerText += `\n On average, ${user.getFirstName()} slept ${adjective} for ${averageHours} hours. `
}

function displayActivity(user) {
  let lastDay = moment('2019/09/22', 'YYYY/MM/DD');
  let stepsToday = activity.getStepsTaken(lastDay, user.id);
  let avgSteps = activity.getAverageStepsOnDay(lastDay);
  let stepsDiff = stepsToday - avgSteps;
  let minutesToday = activity.getMinutesActive(lastDay, user.id);
  let avgMinutes = activity.getAverageMinutesOnDay(lastDay);
  let minutesDiff = minutesToday - avgMinutes;
  let flightsToday = activity.getFlightsClimbed(lastDay, user.id);
  let avgFlights = activity.getAverageFlightsOnDay(lastDay);
  let flightsDiff = flightsToday - avgFlights;
  greeting.innerText += `\n${user.getFirstName()} took ${stepsToday} steps today.`;
  greeting.innerText += `\n${user.getFirstName()} worked out for ${activity.getMinutesActive(lastDay, user.id)} minutes today!`
  greeting.innerText += `\n${user.getFirstName()} went  ${activity.getMilesWalked(lastDay, user)} mile(s) today!`
  greeting.innerText += `\n${user.getFirstName()} took ${Math.abs(stepsDiff)} ${stepsDiff > 0? 'fewer' : 'more' } step(s) compared to the average user.`
  greeting.innerText += `\n${user.getFirstName()} worked out ${Math.abs(minutesDiff)} minute(s) ${minutesDiff > 0? 'less' : 'longer' } than the average user.`
  greeting.innerText += `\n${user.getFirstName()} climbed ${Math.abs(flightsDiff)} ${flightsDiff > 0? 'fewer' : 'more' } flight(s) of stairs than to the average user.`
  greeting.innerText += `\n${user.getFirstName()} this week, averaged ${activity.getAverageStepsOverWeek(user.id, lastDay)} steps per day! `
  greeting.innerText += `\n${user.getFirstName()} this week, averaged ${activity.getAverageFlightsOverWeek(user.id, lastDay)} flights of stairs per day! `
  greeting.innerText += `\n${user.getFirstName()} this week, averaged ${activity.getAverageActivityOverWeek(user.id, lastDay)} minutes of activity per day! `
}

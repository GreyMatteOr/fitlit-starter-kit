let greeting = document.querySelector('h1');
const users = new UserRepository(userData);
const hydration = new Hydration(hydrationData);
const sleep = new Sleep(sleepData);
const activity = new Activity(activityData);
var activityChart = document.getElementById('activity-chart');
var sleepChart = document.getElementById('sleep-chart');
var hydrationChart = document.getElementById('hydration-chart');
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
  let hydrationWeekData = hydration.findOuncesWaterOfWeekBefore(lastDay, user.id);
  buildChart(hydrationChart, hydrationWeekData, 'Hydration')
};

function displaySleep(user) {
  let lastDay = '2019/09/22';
  let recentSleepHours = sleep.getHoursOnDate(lastDay, user.id);
  let recentSleepQuality = sleep.getQualityOnDate(lastDay, user.id);
  let latestWeekSleepHours = sleep.getWeeklyQuantity(lastDay, user.id);
  let latestWeekSleepQuality = sleep.getWeeklyQuality(lastDay, user.id);
  let averageHours = sleep.getAverageHours(user.id);
  let averageQuality = sleep.getAverageQuality(user.id);
  buildChart(sleepChart, latestWeekSleepHours, 'Sleep');
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
  let weekSteps = activity.getWeekStats(user.id, 'numSteps', lastDay);
  buildChart(activityChart, weekSteps, 'Steps');
}

function buildChart(canvas, data, labelName) {
  var chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{
        label: labelName,
        data: data,
        backgroundColor: [ //colors will dynamically change
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
          'rgba(255, 159, 64)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

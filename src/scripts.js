let greeting = document.querySelector('h1');
const users = new UserRepository(userData);
const hydration = new Hydration(hydrationData);
const sleep = new Sleep(sleepData);
const activity = new Activity(activityData);
var stepsChart = document.querySelector('.steps-activity-chart');
var minutesActiveChart = document.querySelector('.minutesActive-activity-chart');
var milesChart = document.querySelector('.miles-activity-chart');
var sleepChart = document.getElementById('sleep-chart');
var hydrationChart = document.getElementById('hydration-chart');
let activitySection = document.querySelector('.activity');
let currentDay = moment('2019/09/22', 'YYYY/MM/DD');
let currentUser

window.onload = onLoad

activitySection.addEventListener('click', displayCorrectChart);

function onLoad () {
  currentUser = getRandomUser();
  displayStepGoalMessage();
  displayHydration();
  displaySleep();
  displayActivity();
}

function displayCorrectChart(event) {
  if(event.target.closest('button') === document.querySelector('.steps-achieved')) {
    displayStepsChart();
  } else if(event.target.closest('button') === document.querySelector('.minutes-active')) {
    displayMinutesActiveChart();
  } else {
    displayMilesChart();
  }
};

function getRandomUser() {
  let randomIndex = Math.floor(Math.random() * users.data.length);
  return new User(users.data[randomIndex]);
}

function displayStepGoalMessage() {
  let userDailyStepGoal = currentUser.dailyStepGoal
  let averageUsersStepGoal = users.calculateAverageStepGoal();
  greeting.innerText = `Hello ${currentUser.getFirstName()}! Your step goal of ${userDailyStepGoal} is ${(userDailyStepGoal > averageUsersStepGoal) ? 'more than' : 'close to'} the average step goal among users of ${averageUsersStepGoal}.`
}

function displayHydration() {
  let dailyHydration = hydration.findOuncesWaterOfDay(currentDay, currentUser.id);
  let hydrationWeekData = hydration.findOuncesWaterOfWeekBefore(currentDay, currentUser.id);
  let borderPalette = ['#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2'];
  let fillPalette = ['#77afe0', '#77afe0', '#77afe0', '#77afe0', '#77afe0', '#77afe0', '#77afe0'];
  buildChart(hydrationChart, hydrationWeekData, 'Hydration', fillPalette, borderPalette);
};

function displaySleep() {
  let recentSleepHours = sleep.getHoursOnDate(currentDay, currentUser.id);
  let recentSleepQuality = sleep.getQualityOnDate(currentDay, currentUser.id);
  let latestWeekSleepHours = sleep.getWeeklyQuantity(currentDay, currentUser.id);
  let latestWeekSleepQuality = sleep.getWeeklyQuality(currentDay, currentUser.id);
  let averageHours = sleep.getAverageHours(currentUser.id);
  let averageQuality = sleep.getAverageQuality(currentUser.id);
  let fillPalette = latestWeekSleepQuality.map((number) => {
    return setColors(number)
  });
  let borderPalette = ['#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2'];
  buildChart(sleepChart, latestWeekSleepHours, 'Sleep', fillPalette, borderPalette);
};

// add note that color indicates quality of sleep
function setColors(quality) {
  if(quality > 4) return '#710e9e'
  if(quality > 3) return '#8c5fa1'
  if(quality > 2) return '#bd9b82'
  return '#945a41'
};

function displayActivity() {
  let stepsToday = activity.getStepsTaken(currentDay, currentUser.id);
  let avgSteps = activity.getAverageStepsOnDay(currentDay);
  let stepsDiff = stepsToday - avgSteps;
  let minutesToday = activity.getMinutesActive(currentDay, currentUser.id);
  let avgMinutes = activity.getAverageMinutesOnDay(currentDay);
  let minutesDiff = minutesToday - avgMinutes;
  let flightsToday = activity.getFlightsClimbed(currentDay, currentUser.id);
  let avgFlights = activity.getAverageFlightsOnDay(currentDay);
  let flightsDiff = flightsToday - avgFlights;
  let weekSteps = activity.getWeekStats(currentUser.id, 'numSteps', currentDay);
  let weekMiles = weekSteps.map((stepCount) => stepCount * currentUser.strideLength / 5280)
  let fillPalette = ['#e88126', '#e88126', '#e88126', '#e88126', '#e88126', '#e88126', '#e88126'];
  let borderPalette = ['#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2'];
  buildChart(stepsChart, weekSteps, 'Steps', fillPalette, borderPalette);
  fillPalette = ['#f0d630', '#f0d630', '#f0d630', '#f0d630', '#f0d630', '#f0d630', '#f0d630'];
  weekSteps = activity.getWeekStats(currentUser.id, 'minutesActive', currentDay);
  buildChart(minutesActiveChart, weekSteps, 'Minutes Active', fillPalette, borderPalette);
  fillPalette = ['#458511', '#458511', '#458511', '#458511', '#458511', '#458511', '#458511'];
  buildChart(milesChart, weekMiles, 'Miles', fillPalette, borderPalette);
}

function displayStepsChart() {
  stepsChart.classList.remove('hidden');
  minutesActiveChart.classList.add('hidden');
  milesChart.classList.add('hidden')
}

function displayMinutesActiveChart() {
  minutesActiveChart.classList.remove('hidden')
  stepsChart.classList.add('hidden');
  milesChart.classList.add('hidden')
}

function displayMilesChart() {
  milesChart.classList.remove('hidden')
  minutesActiveChart.classList.add('hidden');
  stepsChart.classList.add('hidden')
}

function buildChart(canvas, data, labelName, fillColor, borderColor) {
  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [{
        label: labelName,
        data: data,
        backgroundColor: fillColor,
        borderColor: borderColor,
        borderWidth: 2
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

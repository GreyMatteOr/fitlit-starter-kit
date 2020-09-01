let greeting = document.querySelector('h1');
const dataRepositories = {
  users : new UserRepository(userData),
  hydration : new Hydration(hydrationData),
  sleep : new Sleep(sleepData),
  activity : new Activity(activityData)
}

var stepsChart = document.querySelector('.steps-activity-chart');
var minutesActiveChart = document.querySelector('.minutesActive-activity-chart');
var milesChart = document.querySelector('.miles-activity-chart');
var sleepChart = document.getElementById('sleep-chart');
var hydrationChart = document.getElementById('hydration-chart');
let activitySection = document.querySelector('.activity');
let currentActiveChart = document.querySelector('.activity canvas');
let compareNodes = document.querySelectorAll('.compare>div>div');
let currentDay = moment('2019/09/22', 'YYYY/MM/DD');
let currentUser;

window.onload = loadDefaults;
activitySection.addEventListener('click', displayCorrectChart);

function loadDefaults () {
  currentUser = getRandomUser();
  displayStepGoalMessage();
  displayHydrationChart();
  displaySleepChart();
  displayStepsChart();
  displayComparisons();
}

function getRandomUser() {
  let randomIndex = Math.floor(Math.random() * dataRepositories.users.data.length);
  return new User(dataRepositories.users.data[randomIndex]);
}

function displayCorrectChart(event) {
  if(event.target.closest('button') === document.querySelector('.steps-achieved')) {
    displayStepsChart();
  } else if(event.target.closest('button') === document.querySelector('.minutes-active')) {
    displayMinutesActiveChart();
  } else if(event.target.closest('button') === document.querySelector('.miles')) {
    displayMilesChart();
  }
};

function displayStepGoalMessage() {
  let userDailyStepGoal = currentUser.dailyStepGoal
  let averageUsersStepGoal = dataRepositories.users.calculateAverageStepGoal();
  greeting.innerText = `Hello ${currentUser.getFirstName()}! Your step goal of ${userDailyStepGoal} is ${(userDailyStepGoal > averageUsersStepGoal) ? 'more than' : 'close to'} the average step goal among users of ${averageUsersStepGoal}.`
}

function displayHydrationChart() {
  let dailyHydration = dataRepositories.hydration.findOuncesWaterOfDay(currentDay, currentUser.id);
  let hydrationWeekData = dataRepositories.hydration.findOuncesWaterOfWeekBefore(currentDay, currentUser.id);
  let borderPalette = ['#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2'];
  let fillPalette = ['#77afe0', '#77afe0', '#77afe0', '#77afe0', '#77afe0', '#77afe0', '#77afe0'];
  buildChart(hydrationChart, hydrationWeekData, 'Hydration', fillPalette, borderPalette);
};

function displaySleepChart() {
  let weekHours = dataRepositories.sleep.getWeeklyQuantity(currentDay, currentUser.id);
  let weekQuality = dataRepositories.sleep.getWeeklyQuality(currentDay, currentUser.id);
  let fillPalette = weekQuality.map((number) => getSleepColor(number));
  let borderPalette = ['#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2'];
  buildChart(sleepChart, weekHours, 'Sleep', fillPalette, borderPalette);
};

// add note that color indicates quality of sleep
function getSleepColor(quality) {
  if(quality > 4) return '#710e9e'
  if(quality > 3) return '#8c5fa1'
  if(quality > 2) return '#bd9b82'
  return '#945a41'
};

function displayActivity() {
}

function displayComparisons() {
  compareNodes.forEach(node => {
    let repo = node.dataset.repo;
    let stat = node.dataset.stat;
    let userStat = dataRepositories[repo].getDayStat(currentDay, currentUser.id, stat);
    let globalAverage = dataRepositories[repo].getStatDailyGlobalAvg(currentDay, stat);
    node.children[1].innerText = `You: ${userStat}\nCommunity: ${globalAverage}`
  })
}

function displayStepsChart() {
  currentActiveChart = getNewCanvas();
  let weekSteps = dataRepositories.activity.getWeekStats(currentUser.id, 'numSteps', currentDay);
  let fillPalette = ['#e88126', '#e88126', '#e88126', '#e88126', '#e88126', '#e88126', '#e88126'];
  let borderPalette = ['#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2'];
  buildChart(currentActiveChart, weekSteps, 'Steps', fillPalette, borderPalette);
}

function displayMinutesActiveChart() {
  currentActiveChart = getNewCanvas();
  let weekMinutes = dataRepositories.activity.getWeekStats(currentUser.id, 'minutesActive', currentDay);
  let fillPalette = ['#f0d630', '#f0d630', '#f0d630', '#f0d630', '#f0d630', '#f0d630', '#f0d630'];
  let borderPalette = ['#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2'];
  buildChart(currentActiveChart, weekMinutes, 'Minutes', fillPalette, borderPalette);
}

function displayMilesChart() {
  currentActiveChart = getNewCanvas();
  let weekSteps = dataRepositories.activity.getWeekStats(currentUser.id, 'numSteps', currentDay);
  let weekMiles = weekSteps.map(steps => steps * currentUser.strideLength / 5280);
  let fillPalette = ['#458511', '#458511', '#458511', '#458511', '#458511', '#458511', '#458511'];
  let borderPalette = ['#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2'];
  buildChart(currentActiveChart, weekMiles, 'Miles', fillPalette, borderPalette);
}

function getNewCanvas() {
  currentActiveChart.remove();
  document.querySelector('.activity .underlay').innerHTML += '<canvas class="activity-chart"></canvas>';
  return document.querySelector('.activity canvas');
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

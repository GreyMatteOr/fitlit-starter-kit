let greeting = document.querySelector('h1');
const repos = {
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
let statNodes = document.querySelectorAll('.stat');
let compareNodes = document.querySelectorAll('.compare-stat');
let currentDay = moment('2019/09/22', 'YYYY/MM/DD');
let currentUser;

window.onload = loadDefaults;
activitySection.addEventListener('click', displayCorrectChart);

function loadDefaults () {
  currentUser = getRandomUser();
  displayStepGoalMessage();
  displayStats();
  displayComparisons();
  displayHydrationChart();
  displaySleepChart();
  displayStepsChart();
}

function getRandomUser() {
  let randomIndex = Math.floor(Math.random() * repos.users.data.length);
  return new User(repos.users.data[randomIndex]);
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
  let averageUsersStepGoal = repos.users.calculateAverageStepGoal();
  greeting.innerText = `Hello ${currentUser.getFirstName()}! Your step goal of ${userDailyStepGoal} is ${(userDailyStepGoal > averageUsersStepGoal) ? 'more than' : 'close to'} the average step goal among users of ${averageUsersStepGoal}.`
}

function displayHydrationChart() {
  let dailyHydration = repos.hydration.findOuncesWaterOfDay(currentDay, currentUser.id);
  let hydrationWeekData = repos.hydration.findOuncesWaterOfWeekBefore(currentDay, currentUser.id);
  let borderPalette = ['#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2'];
  let fillPalette = ['#77afe0', '#77afe0', '#77afe0', '#77afe0', '#77afe0', '#77afe0', '#77afe0'];
  let hChart = buildChart(hydrationChart, hydrationWeekData, 'Hydration', fillPalette, borderPalette);
  hChart.maintainAspectRatio = false;
};

function displaySleepChart() {
  let weekHours = repos.sleep.getWeeklyQuantity(currentDay, currentUser.id);
  let weekQuality = repos.sleep.getWeeklyQuality(currentDay, currentUser.id);
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

function displayStats() {
  statNodes.forEach((node, index) => {
    let repo = node.dataset.repo;
    let stat = node.dataset.stat;
    let userStat = repos[repo].getDayStat(currentDay, currentUser.id, stat);
    if(index === 2) {
      userStat = Math.round(10 * userStat * currentUser.strideLength / 5280) / 10;
    }
    node.innerText = `${userStat}`
  })
}

function displayComparisons() {
  compareNodes.forEach(node => {
    let repo = node.dataset.repo;
    let stat = node.dataset.stat;
    let globalAverage = repos[repo].getStatDailyGlobalAvg(currentDay, stat);
    node.innerText = `You: ${node.innerText}\nCommunity: ${globalAverage}`;
  })
}

function displayStepsChart() {
  currentActiveChart = getNewCanvas();
  let weekSteps = repos.activity.getWeekStats(currentUser.id, 'numSteps', currentDay);
  let fillPalette = ['#e88126', '#e88126', '#e88126', '#e88126', '#e88126', '#e88126', '#e88126'];
  let borderPalette = ['#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2'];
  buildChart(currentActiveChart, weekSteps, 'Steps', fillPalette, borderPalette);
}

function displayMinutesActiveChart() {
  currentActiveChart = getNewCanvas();
  let weekMinutes = repos.activity.getWeekStats(currentUser.id, 'minutesActive', currentDay);
  let fillPalette = ['#f0d630', '#f0d630', '#f0d630', '#f0d630', '#f0d630', '#f0d630', '#f0d630'];
  let borderPalette = ['#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2'];
  buildChart(currentActiveChart, weekMinutes, 'Minutes', fillPalette, borderPalette);
}

function displayMilesChart() {
  currentActiveChart = getNewCanvas();
  let weekSteps = repos.activity.getWeekStats(currentUser.id, 'numSteps', currentDay);
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

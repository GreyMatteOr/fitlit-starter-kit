const repos = {
  users : new UserRepository(userData),
  hydration : new Hydration(hydrationData),
  sleep : new Sleep(sleepData),
  activity : new Activity(activityData)
}

let activitySection = document.querySelector('.activity');
let currentDay = repos.activity.lastDay;
let currentUser;

window.onload = () => {
  currentUser = getRandomUser();
  displayStepGoalMessage();
  updatePage();
  displayFriends();
}

activitySection.addEventListener('click', displayCorrectChart);

function updatePage () {
  updateCurrentDate();
  displayStats();
  displayComparisons();
  displayHydrationChart();
  displaySleepChart();
  displayStepsChart();
  createCalendar();
}

function getRandomUser() {
  let randomIndex = Math.floor(Math.random() * repos.users.data.length);
  return new User(repos.users.data[randomIndex]);
}

function createCalendar() {
  let minDate = repos.activity.getEarliestDayString();
  let maxDate = repos.activity.getLastDayString();
  flatpickr('#calendar',
    {
      dateFormat: 'Y-m-d',
      minDate : minDate,
      maxDate: maxDate,
      onChange: changeCurrentDay
    }
  );
}

function displayFriends() {
  let socialNode = document.querySelector('.social-underlay');
  socialNode.innerHTML = '';
  currentUser.friends.forEach(friendID => {
    let pictureFile = `./docs/HS${friendID}.jpeg`;
    let friend = repos.users.getUser(friendID);
    let numSteps = repos.activity.getStepsTaken(currentDay, friendID);
    let percent = Math.floor( 1000 * numSteps / friend.dailyStepGoal) / 10;
    let newFriendHTML = `<div class='friend'>
      <img src="${pictureFile}" alt="${friend.name}">
        <div>
          <h2>${friend.name}</h2>
          <h3=''>Steps</h3>
          <h3>Today: ${numSteps}</h3>
          <h3>Percent of Goal: ${percent}</h3>
        </div>
    </div>`;
    socialNode.innerHTML += newFriendHTML;
  })
}

function updateCurrentDate() {
  let dateNode = document.querySelector('time');
  let date = currentDay._i;
  while(date.includes('/')) date = date.replace('/', '-');
  let show = `${date.split('-')[1]}/${date.split('-')[2]}`;
  dateNode.dateTime = date;
  dateNode.innerText = show;
}

function changeCurrentDay(selectedDates, dateString, thisObj) {
  currentDay = moment(dateString, 'YYYY-MM-DD');
  updatePage();
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
  let profilePic = `./docs/HS${currentUser.id}.jpeg`;
  let newHtml = `<img class='profile-picture' alt='profile-picture' src='${profilePic}'>`;
  document.querySelector('header').innerHTML = newHtml + document.querySelector('header').innerHTML;
  let userStepGoal = currentUser.dailyStepGoal;
  let userSteps = repos.activity.getStepsTaken(currentDay, currentUser.id);
  document.querySelector('h1').innerText = `Hello ${currentUser.getFirstName()}! Today, you have ${(userStepGoal > userSteps ? `${userStepGoal - userSteps} steps to go until you meet` : 'reached')} your step goal of ${userStepGoal} steps.`;
}

function getSleepColor(quality) {
  if(quality > 4) return '#710e9e'
  if(quality > 3) return '#8c5fa1'
  if(quality > 2) return '#bd9b82'
  return '#945a41'
};

function displayStats() {
  document.querySelectorAll('.stat').forEach((node, index) => {
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
   document.querySelectorAll('.compare-stat').forEach(node => {
    let repo = node.dataset.repo;
    let stat = node.dataset.stat;
    let globalAverage = repos[repo].getStatDailyGlobalAvg(currentDay, stat);
    node.innerText = `You: ${node.innerText}\nCommunity: ${globalAverage}`;
  })
}

function displayStepsChart() {
  let weekSteps = repos.activity.getWeekStats(currentUser.id, 'numSteps', currentDay);
  let fillPalette = ['#e88126', '#e88126', '#e88126', '#e88126', '#e88126', '#e88126', '#e88126'];
  let borderPalette = ['#6e3402', '#6e3402', '#6e3402', '#6e3402', '#6e3402', '#6e3402', '#6e3402'];
  buildChart(
    getNewCanvas('.activity .underlay', 'activity-chart'),
    weekSteps,
    'Steps',
    fillPalette,
    borderPalette
  );
}

function displayMinutesActiveChart() {
  let weekMinutes = repos.activity.getWeekStats(currentUser.id, 'minutesActive', currentDay);
  let fillPalette = ['#f0d630', '#f0d630', '#f0d630', '#f0d630', '#f0d630', '#f0d630', '#f0d630'];
  let borderPalette = ['#574b00', '#574b00', '#574b00', '#574b00', '#574b00', '#574b00', '#574b00'];
  buildChart(
    getNewCanvas('.activity .underlay', 'activity-chart'),
    weekMinutes,
    'Minutes',
    fillPalette,
    borderPalette
  );
}

function displayMilesChart() {
  let weekSteps = repos.activity.getWeekStats(currentUser.id, 'numSteps', currentDay);
  let weekMiles = weekSteps.map(steps => steps * currentUser.strideLength / 5280);
  let fillPalette = ['#458511', '#458511', '#458511', '#458511', '#458511', '#458511', '#458511'];
  let borderPalette = ['#132900', '#132900', '#132900', '#132900', '#132900', '#132900', '#132900'];
  buildChart(
    getNewCanvas('.activity .underlay', 'activity-chart'),
    weekMiles,
    'Miles',
    fillPalette,
    borderPalette
  );
}


function displaySleepChart() {
  let weekHours = repos.sleep.getWeeklyQuantity(currentDay, currentUser.id);
  let weekQuality = repos.sleep.getWeeklyQuality(currentDay, currentUser.id);
  let fillPalette = weekQuality.map((number) => getSleepColor(number));
  let borderPalette = ['#000', '#000', '#000', '#000', '#000', '#000', '#000'];
  buildChart(
    getNewCanvas('.sleep .underlay', 'sleep-chart'),
    weekHours,
    'Sleep',
    fillPalette,
    borderPalette
  );
};

function displayHydrationChart() {
  let hydrationWeekData = repos.hydration.findOuncesWaterOfWeekBefore(currentDay, currentUser.id);
  let borderPalette = ['#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2', '#2a6ba2'];
  let fillPalette = ['#77afe0', '#77afe0', '#77afe0', '#77afe0', '#77afe0', '#77afe0', '#77afe0'];
  let hChart = buildChart(
    getNewCanvas('.hydration .underlay', 'hydration-chart'),
    hydrationWeekData,
    'Hydration',
    fillPalette,
    borderPalette
  );
};


function getNewCanvas(parentSelector, selfSelector) {
  document.querySelector(`.${selfSelector}`).remove();
  document.querySelector(parentSelector).innerHTML += `<canvas class="${selfSelector}"></canvas>`;
  return document.querySelector(`.${selfSelector}`);
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

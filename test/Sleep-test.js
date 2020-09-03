const chai = require("chai");
const expect = chai.expect;
const moment = require('moment');

const Sleep = require('../src/Sleep');

describe('Sleep', function() {

  let sleep, sleepUserData;
  beforeEach(function() {
    sleepUserData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 2.2
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "hoursSlept": 7,
        "sleepQuality": 4.7
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "hoursSlept": 10.8,
        "sleepQuality": 4.7
      },
      {
        "userID": 2,
        "date": "2019/06/16",
        "hoursSlept": 5.4,
        "sleepQuality": 3
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "hoursSlept": 4.1,
        "sleepQuality": 3.6
      },
      {
        "userID": 2,
        "date": "2019/06/17",
        "hoursSlept": 9.6,
        "sleepQuality": 2.9
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "hoursSlept": 5.1,
        "sleepQuality": 2.6
      },
      {
        "userID": 2,
        "date": "2019/06/18",
        "hoursSlept": 9.7,
        "sleepQuality": 2.5
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "hoursSlept": 4.8,
        "sleepQuality": 4.9
      },
      {
        "userID": 2,
        "date": "2019/06/19",
        "hoursSlept": 5.4,
        "sleepQuality": 2.4
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "hoursSlept": 5.4,
        "sleepQuality": 3.9
      },
      {
        "userID": 2,
        "date": "2019/06/20",
        "hoursSlept": 5.5,
        "sleepQuality": 4.6
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "hoursSlept": 8.7,
        "sleepQuality": 1.9
      },
      {
        "userID": 2,
        "date": "2019/06/21",
        "hoursSlept": 9.2,
        "sleepQuality": 4.6
      }
    ];
    sleep = new Sleep(sleepUserData);
  });

  describe('Intialization', function() {
    it('should be a function', function() {
      expect(Sleep).to.be.a('function');
    });

    it('should be an instance of Sleep', function() {
      expect(sleep).to.be.an.instanceof(Sleep);
    });

    it('should store an array of sleep objects', function() {
      expect(sleep.data).to.deep.equal(sleepUserData);
    });
  });

  describe('getUserData()', function() {
    it(`should create an Array of only one User's data`, function() {
      let user1Data = [
        {
          "userID": 1,
          "date": moment("2019/06/15", 'YYYY/MM/DD'),
          "hoursSlept": 6.1,
          "sleepQuality": 2.2
        },
        {
          "userID": 1,
          "date": moment("2019/06/16", 'YYYY/MM/DD'),
          "hoursSlept": 10.8,
          "sleepQuality": 4.7
        },
        {
          "userID": 1,
          "date": moment("2019/06/17", 'YYYY/MM/DD'),
          "hoursSlept": 4.1,
          "sleepQuality": 3.6
        },
        {
          "userID": 1,
          "date": moment("2019/06/18", 'YYYY/MM/DD'),
          "hoursSlept": 5.1,
          "sleepQuality": 2.6
        },
        {
          "userID": 1,
          "date": moment("2019/06/19", 'YYYY/MM/DD'),
          "hoursSlept": 4.8,
          "sleepQuality": 4.9
        },
        {
          "userID": 1,
          "date": moment("2019/06/20", 'YYYY/MM/DD'),
          "hoursSlept": 5.4,
          "sleepQuality": 3.9
        },
        {
          "userID": 1,
          "date": moment("2019/06/21", 'YYYY/MM/DD'),
          "hoursSlept": 8.7,
          "sleepQuality": 1.9
        }
      ]
      expect(sleep.getUserData(1)).to.deep.equal(user1Data);
    });
  });

  describe('getAverageHours()', function() {
    it('should calculate the average number of hours a user has slept per day', function() {
      expect(sleep.getAverageHours(1)).to.equal(45 / 7);
    });

    it('should return null if there is no sleep data available', function() {
      expect(sleep.getAverageHours(3)).to.equal(null);
    });
  });

  describe('getAverageQuality()', function() {
    it('should calculate the average sleep quality per day over all time', function() {
      expect(sleep.getAverageQuality(1)).to.be.closeTo((23.8 / 7), .0001);
    });

    it('should return null if there is no sleep data available', function() {
      expect(sleep.getAverageQuality(3)).to.equal(null);
    });
  });

  describe('getHoursOnDate()', function() {
    it('should return the amount of hours slept for a specific date', function() {
      let date = moment("2019/06/17", 'YYYY/MM/DD');
      expect(sleep.getHoursOnDate(date, 1)).to.equal(4.1);
    });

    it('should return null if there is no sleep data available', function() {
      let date = moment("2020/06/17", 'YYYY/MM/DD');
      expect(sleep.getHoursOnDate(date, 1)).to.equal(null);
    });
  });

  describe('getQualityOnDate()', function() {
    it('should return the quality of sleep for a specific date', function() {
      let date = moment("2019/06/17", 'YYYY/MM/DD');
      expect(sleep.getQualityOnDate(date, 1)).to.equal(3.6);
    });

    it('should return null if the date or user is invalid', function() {
      let date = moment("2020/06/17", 'YYYY/MM/DD');
      expect(sleep.getQualityOnDate(date, 1)).to.equal(null);
      date = moment("2019/06/17", 'YYYY/MM/DD');
      expect(sleep.getQualityOnDate(date, 3)).to.equal(null);
    });
  });

  describe('getWeeklyQuantity()', function() {
    it('should return an Array of hoursSlept for a week ending on a given date', function() {
      let weekOfSleepData = [
        6.1,
        10.8,
        4.1,
        5.1,
        4.8,
        5.4,
        8.7
      ];
      let date = moment("2019/06/21", 'YYYY/MM/DD');
      expect(sleep.getWeeklyQuantity(date, 1)).to.deep.equal(weekOfSleepData);
    });

    it(`should not return anything for any date of the week that has no data`, function() {
      let weekOfSleepData = [
        6.1,
        10.8,
        4.1,
        5.1,
        4.8,
        5.4
      ];
      let date = moment("2019/06/20", 'YYYY/MM/DD');
      expect(sleep.getWeeklyQuantity(date, 1)).to.deep.equal(weekOfSleepData);
    });

    it('should return an empty array if the end date is not defined', function () {
      let date = moment("2020/06/21", 'YYYY/MM/DD');
      expect(sleep.getWeeklyQuantity(date)).to.deep.equal([]);
    })
  });

  describe('getWeeklyQuality()', function() {
    it('should return an Array of quality of sleep the week ending on the given date', function() {
      let weekOfSleepData = [
        2.2,
        4.7,
        3.6,
        2.6,
        4.9,
        3.9,
        1.9
      ];
      let date = moment("2019/06/21", 'YYYY/MM/DD');
      expect(sleep.getWeeklyQuality(date, 1)).to.deep.equal(weekOfSleepData);
    });

    it(`should no entry for any date of the week that doesn't have data`, function() {
      let weekOfSleepData = [
        2.2,
        4.7,
        3.6,
        2.6,
        4.9,
        3.9
      ];
      let date = moment("2019/06/20", 'YYYY/MM/DD');
      expect(sleep.getWeeklyQuality(date, 1)).to.deep.equal(weekOfSleepData);
    });

    it('should return an empty array if the end date is not defined', function () {
      let date = moment("2020/06/17", 'YYYY/MM/DD');
      expect(sleep.getWeeklyQuality(date)).to.deep.equal([]);
    })
  });

  describe('getAverageQualityAll()', function() {
    it('should return an array of the average sleep quality for each users', function() {
      let averages = sleep.getAverageQualityAll();
      expect(averages[0]).to.be.closeTo(23.8 / 7, .0001);
      expect(averages[1]).to.be.closeTo(24.7 / 7, .0001);
    });

    it('should return an empty array if there are no users', function() {
      sleep.data = []
      expect(sleep.getAverageQualityAll()).to.deep.equal([]);
    });
  });

  describe('findHighQualityUsers()', function() {
    it('should return an array of userIDs whose corresponding users have an average sleep quality of 3 or higher', function () {
      sleepUserData.push({
        "userID": 3,
        "date": moment("2019/06/21", 'YYYY/MM/DD'),
        "hoursSlept": 7,
        "sleepQuality": 2.9
      });
      sleep = new Sleep(sleepUserData);
      let date = moment("2019/06/21", 'YYYY/MM/DD');
      expect(sleep.findHighQualityUsers(date)).to.deep.equal([1, 2])
    });

    it('should return an empty array if there are no users with an average sleep quality of 3 or higher', function() {
      sleepUserData = sleepUserData.map(data => {
        data.sleepQuality = 2.9
        return data;
      });
      sleep = new Sleep(sleepUserData);
      let date = moment("2019/06/21", 'YYYY/MM/DD');
      expect(sleep.findHighQualityUsers(date)).to.deep.equal([])
    });
  });

  describe('getHighestOnDay()', function() {
    it('should return an array of userIDs whose corresponding users have the maximum sleep quantity on a given date', function () {
      sleepUserData.push({
        "userID": 3,
        "date": "2019/06/21",
        "hoursSlept": 7,
        "sleepQuality": 2.9
      });
      sleep = new Sleep(sleepUserData);
      let date = moment("2019/06/21", 'YYYY/MM/DD');
      expect(sleep.getHighestOnDay(date)).to.deep.equal([2, 9.2]);
    });

    it('should return an null if there are no users', function() {
      sleep.data = [];
      let date = moment("2019/06/21", 'YYYY/MM/DD');
      expect(sleep.getHighestOnDay(date)).to.deep.equal(null);
    });
  });

  describe('getBestSleepDay()', function() {
    it('should return an object with data about the best night sleep ever achieved', function() {
      let data = {
        "userID": 1,
        "date": moment("2019/06/16", 'YYYY/MM/DD'),
        "hoursSlept": 10.8,
        "sleepQuality": 4.7
      }
      expect(sleep.getBestSleepDay()).to.be.deep.equal(data);
    })

    it('should return the first, chronologically, in case of a tie', function() {
      let dataWinTie = {
        "userID": 1,
        "date": moment("2019/06/16", 'YYYY/MM/DD'),
        "hoursSlept": 10.8,
        "sleepQuality": 4.7
      }
      let dataFailTie = {
        "userID": 1,
        "date": moment("2019/06/17", 'YYYY/MM/DD'),
        "hoursSlept": 10.8,
        "sleepQuality": 4.7
      }
      sleepUserData.push(dataFailTie);
      expect(sleep.getBestSleepDay()).to.be.deep.equal(dataWinTie);
    })
  })
});

const chai = require("chai");
const expect = chai.expect;

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
          "date": "2019/06/15",
          "hoursSlept": 6.1,
          "sleepQuality": 2.2
        },
        {
          "userID": 1,
          "date": "2019/06/16",
          "hoursSlept": 10.8,
          "sleepQuality": 4.7
        },
        {
          "userID": 1,
          "date": "2019/06/17",
          "hoursSlept": 4.1,
          "sleepQuality": 3.6
        },
        {
          "userID": 1,
          "date": "2019/06/18",
          "hoursSlept": 5.1,
          "sleepQuality": 2.6
        },
        {
          "userID": 1,
          "date": "2019/06/19",
          "hoursSlept": 4.8,
          "sleepQuality": 4.9
        },
        {
          "userID": 1,
          "date": "2019/06/20",
          "hoursSlept": 5.4,
          "sleepQuality": 3.9
        },
        {
          "userID": 1,
          "date": "2019/06/21",
          "hoursSlept": 8.7,
          "sleepQuality": 1.9
        }
      ]
      expect(sleep.getUserData(1)).to.deep.equal(user1Data);
    });
  });

  describe('calculateAverage()', function() {
    it('should calculate the average number of hours a user has slept per day', function() {
      expect(sleep.calculateAverage(1)).to.equal(45 / 7);
    });

    it('should return 0 if there is no sleep data available', function() {
      sleep = new Sleep([]);
      expect(sleep.calculateAverage(1)).to.equal(0);
    });
  });

  describe('calculateAverageQuality()', function() {
    it('should calculate the average sleep quality per day over all time', function() {
      expect(sleep.calculateAverageQuality(1)).to.be.closeTo((23.8 / 7), .0001);
    });

    it('should return 0 if there is no sleep data available', function() {
      sleep = new Sleep([]);
      expect(sleep.calculateAverageQuality(1)).to.equal(0);
    });
  });

  describe('getHoursSleptOnDate()', function() {
    it('should return the amount of hours slept for a specific date', function() {
      expect(sleep.getHoursSleptOnDate("2019/06/17", 1)).to.equal(4.1);
    });

    it('should return 0 if there is no sleep data available', function() {
      expect(sleep.getHoursSleptOnDate("2189/06/17", 1)).to.equal(0);
    });
  });

  describe('getQualityOnDate()', function() {
    it('should return the quality of sleep for a specific date', function() {
      expect(sleep.getQualityOnDate("2019/06/17", 1)).to.equal(3.6);
    });

    it('should return 0 if there is no sleep data available', function() {
      expect(sleep.getQualityOnDate("2189/06/17", 1)).to.closeTo((0), .0001);
    });
  });

  describe('getWeeklyQuantity()', function() {
    it('should return an Array of hoursSlept for 7 days ending on the date passed in', function() {
      let weekOfSleepData = [
        6.1,
        10.8,
        4.1,
        5.1,
        4.8,
        5.4,
        8.7
      ];
      expect(sleep.getWeeklyQuantity("2019/06/21", 1)).to.deep.equal(weekOfSleepData);
    });

    it(`should return 0's for any date of the week it doesn't find`, function() {
      let weekOfSleepData = [
        0,
        6.1,
        10.8,
        4.1,
        5.1,
        4.8,
        5.4
      ];
      expect(sleep.getWeeklyQuantity("2019/06/20", 1)).to.deep.equal(weekOfSleepData);
    });

    it('should return an array of seven `0`-s if the end date is not defined', function () {
      expect(sleep.getWeeklyQuantity("2020/06/21")).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    })
  });

  describe('getWeeklyQuality()', function() {
    it('should return an Array of quality of sleep for 7 days ending on the date passed in', function() {
      let weekOfSleepData = [
        2.2,
        4.7,
        3.6,
        2.6,
        4.9,
        3.9,
        1.9
      ];
      expect(sleep.getWeeklyQuality("2019/06/21", 1)).to.deep.equal(weekOfSleepData);
    });

    it(`should return 0's for any date of the week it doesn't find`, function() {
      let weekOfSleepData = [
        0,
        2.2,
        4.7,
        3.6,
        2.6,
        4.9,
        3.9
      ];
      expect(sleep.getWeeklyQuality("2019/06/20", 1)).to.deep.equal(weekOfSleepData);
    });

    it('should return an array of seven `0`-s if the end date is not defined', function () {
      expect(sleep.getWeeklyQuality("2020/06/21")).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    })
  });

  describe.only('getAverageQualityAll()', function() {
    it('should return the average sleep quality for all users', function() {
      expect(sleep.getAverageQualityAll()).to.equal(48.5 / 14);
    });

    it('should return 0 if there are no users', function() {
      sleep = new Sleep([]);      expect(sleep.getAverageQualityAll()).to.equal(0);
    });
  });
});

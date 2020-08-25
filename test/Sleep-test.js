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
        "userID": 1,
        "date": "2019/06/16",
        "hoursSlept": 7,
        "sleepQuality": 4.7
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "hoursSlept": 10.8,
        "sleepQuality": 4.7
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "hoursSlept": 5.4,
        "sleepQuality": 3
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "hoursSlept": 4.1,
        "sleepQuality": 3.6
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "hoursSlept": 9.6,
        "sleepQuality": 2.9
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "hoursSlept": 5.1,
        "sleepQuality": 2.6
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

  describe('calculateAverage()', function() {
    it('should calculate the average number of hours a user has slept per day', function() {
      expect(sleep.calculateAverage()).to.equal(48.1 / 7);
    });

    it('should return 0 if there is no sleep data available', function() {
      sleep = new Sleep([]);
      expect(sleep.calculateAverage()).to.equal(0);
    });
  });

  describe('calculateAverageQuality()', function() {
    it('should calculate the average sleep quality per day over all time', function() {
      expect(sleep.calculateAverageQuality()).to.be.closeTo((23.7 / 7), .0001);
    });

    it('should return 0 if there is no sleep data available', function() {
      sleep = new Sleep([]);
      expect(sleep.calculateAverageQuality()).to.equal(0);
    });
  });

  describe('getHoursSleptOnDate()', function() {
    it('should return the amount of hours slept for a specific date', function() {
      expect(sleep.getHoursSleptOnDate("2019/06/17")).to.equal(10.8);
    });

    it('should return 0 if there is no sleep data available', function() {
      expect(sleep.getHoursSleptOnDate("2189/06/17")).to.equal(0);
    });
  });

  describe('getQualityOnDate()', function() {
    it('should return the quality of sleep for a specific date', function() {
      expect(sleep.getQualityOnDate("2019/06/17")).to.equal(4.7);
    });

    it('should return 0 if there is no sleep data available', function() {
      expect(sleep.getQualityOnDate("2189/06/17")).to.closeTo((0), .0001);
    });
  });

  describe('getWeeklySleepQuantity()', function() {
    it('should return an Array of hoursSlept for 7 days ending on the date passed in', function() {
      let weekOfSleepData = [
        6.1,
        7,
        10.8,
        5.4,
        4.1,
        9.6,
        5.1
      ];
      expect(sleep.getWeeklySleepQuantity("2019/06/21")).to.deep.equal(weekOfSleepData);
    });

    it('should return an array of seven `0`-s if the end date is not defined', function () {
      expect(sleep.getWeeklySleepQuantity("2020/06/21")).to.deep.equal([0, 0, 0, 0, 0, 0, 0]);
    })
  });
});

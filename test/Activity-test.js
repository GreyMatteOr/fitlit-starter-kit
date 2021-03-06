const chai = require("chai");
const expect = chai.expect;
const moment = require("moment");


const Activity = require('../src/Activity.js');

describe('Activity', function() {

  let activity, userData, user1, user2;
  beforeEach(function() {
    user1 = {
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        16,
        4,
        8
      ]
    };
    user2 = {
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [
        9,
        18,
        24,
        19
      ]
    };
    userData = [
        {
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numSteps": 4294,
        "minutesActive": 138,
        "flightsOfStairs": 10
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numSteps": 7402,
        "minutesActive": 116,
        "flightsOfStairs": 33
      },
      {
        "userID": 2,
        "date": "2019/06/16",
        "numSteps": 3486,
        "minutesActive": 114,
        "flightsOfStairs": 32
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      },
      {
        "userID": 2,
        "date": "2019/06/17",
        "numSteps": 14810,
        "minutesActive": 287,
        "flightsOfStairs": 18
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "numSteps": 2634,
        "minutesActive": 107,
        "flightsOfStairs": 5
      },
      {
        "userID": 2,
        "date": "2019/06/18",
        "numSteps": 10333,
        "minutesActive": 114,
        "flightsOfStairs": 31
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "numSteps": 6389,
        "minutesActive": 41,
        "flightsOfStairs": 33
      },
      {
        "userID": 2,
        "date": "2019/06/19",
        "numSteps": 8015,
        "minutesActive": 106,
        "flightsOfStairs": 37
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "numSteps": 11652,
        "minutesActive": 20,
        "flightsOfStairs": 24
      },
      {
        "userID": 2,
        "date": "2019/06/20",
        "numSteps": 9256,
        "minutesActive": 108,
        "flightsOfStairs": 2
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "numSteps": 9303,
        "minutesActive": 27,
        "flightsOfStairs": 14
      },
      {
        "userID": 2,
        "date": "2019/06/21",
        "numSteps": 8024,
        "minutesActive": 216,
        "flightsOfStairs": 32
      }
    ];
    date = moment('2019/06/21', 'YYYY/MM/DD');
    activity = new Activity(userData);
  });

  describe('Intialization', function() {

    it('should be a function', function() {
      expect(Activity).to.be.a('function');
    });

    it('should be an instance of Activity', function() {
      expect(activity).to.be.an.instanceof(Activity);
    });

    it('should hold userData', function() {
      expect(activity.data).to.deep.equal(userData);
    });
  });

  describe('getMilesWalked()', function() {
    it('should return the number of miles a user walked on a given day', function() {
      let feetWalked = user1.strideLength * userData[12].numSteps;
      expect(activity.getMilesWalked(date, user1)).to.equal(feetWalked / 5280);
    });

    it(`should return null if the day doesn't exist for the user`, function() {
      expect(activity.getMilesWalked(moment('2020/06/21', 'YYYY/MM/DD'), user1)).to.equal(null);

      let badUser = {userID: 51}
      expect(activity.getMilesWalked(date, badUser)).to.equal(null);
    });
  });

  describe('getMinutesActive()', function() {
    it('should return the minutes active for a specific user for a given day', function() {
      expect(activity.getMinutesActive(date, user1.id)).to.equal(27);
    });

    it(`should return null if the day doesn't exist for the user`, function() {
      expect(activity.getMinutesActive(new Date(2020, 06, 21), user1)).to.equal(null);

      let badUser = {userID: 51}
      expect(activity.getMinutesActive(date, badUser)).to.equal(null)
    });
  });

  describe('getAverageActivityOverWeek()', function() {
    it('should return the average number of minutes of activity', function() {
      weekEnd = moment('2019/06/21', 'YYYY/MM/DD');
      expect(activity.getAverageActivityOverWeek(user1.id, weekEnd)).to.equal(664 / 7);
    });

    it(`should not include in the calculation any days that don't have data`, function() {
      weekEnd = moment('2019/06/20', 'YYYY/MM/DD');
      expect(activity.getAverageActivityOverWeek(user1.id, weekEnd)).to.equal(637 / 6);
    });
  });

  describe('exceededGoal()', function() {
    it('should return true if a given user exceeded their step goal for a given day', function() {
      day = {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      };
      expect(activity.exceededGoal(user1, day)).to.equal(true);
    });

    it(`should return false if a given user didn't exceed their step goal for a given day`, function() {
      day = {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 10000,
        "minutesActive": 213,
        "flightsOfStairs": 13
      };
      expect(activity.exceededGoal(user1, day)).to.equal(false);
    });

    it(`should return null if the user doesn't have any data for the given date`, function() {
      day = undefined;
      expect(activity.exceededGoal(user1, day)).to.equal(null);
    });

    it(`should return null if the user doesn't exist`, function() {
      day = {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      };
      user1 = undefined;
      expect(activity.exceededGoal(user1, day)).to.equal(null);
    });
  });

  describe('getDaysExceeded()', function(){
    it('should return all the days a given user has exceeded their step goal', function() {
      let date1 = {
        "userID": 1,
        "date": moment('2019/06/17', 'YYYY/MM/DD'),
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      };
      let date2 = {
        "userID": 1,
        "date": moment('2019/06/20', 'YYYY/MM/DD'),
        "numSteps": 11652,
        "minutesActive": 20,
        "flightsOfStairs": 24
      };
      expect(activity.getDaysExceeded(user1)).to.deep.equal([date1, date2])
    });

    it('should return an empty array if there are no days that a given user has exceeded their step goal', function() {
      let user1 = {id: 1, dailyStepGoal: 20000}
      expect(activity.getDaysExceeded(user1)).to.deep.equal([])
    });
  })

  describe('getRecordStairs()', function() {
    it('should return the most stairs climbed in a single day for a given user', function() {
      expect(activity.getRecordStairs(user1)).to.equal(33);
      expect(activity.getRecordStairs(user2)).to.equal(37);
    });

    it('should return null if no data is available', function() {
      let user3 = {id: 3};
      expect(activity.getRecordStairs(user3)).to.equal(null);
    });
  });

  describe('getMonthlyActivityChampion()', function() {
    let activity2, june, july;
    beforeEach(function() {
      let month2 = activity.data.map((dataObj) => {
        let newObj = {
          userID: dataObj.userID,
          date: moment(dataObj.date).add(1, 'M'),
          numSteps: dataObj.numSteps + 1,
          minutesActive: dataObj.minutesActive + 1,
          flightsOfStairs: dataObj.flightsOfStairs + 1
        }
        return newObj;
      });
      userData = userData.concat(month2)
      activity2 = new Activity(userData);
      june = moment('2019/06/01', 'YYYY/MM/DD')
      july = moment('2019/07/01', 'YYYY/MM/DD')
      futureJuly = moment('2020/07/21', 'YYYY/MM/DD')
    });
    it('should identify the user day that had the most active for a single day in a given month and return the user id and how many mintues they had', function() {
      expect(activity2.getMonthlyActivityChampion(june)).to.deep.equal({userID: 2, record: 287})
      expect(activity2.getMonthlyActivityChampion(july)).to.deep.equal({userID: 2, record: 288})
    });

    it('should return null if the month contains no data', function() {
      expect(activity2.getMonthlyActivityChampion(futureJuly)).to.deep.equal({userID: null, record: 0})
    });
  })

  describe('getAverageStepsOnDay', function() {
    it('should return the overall average steps for a given day out of all users', function() {
      expect(activity.getAverageStepsOnDay(date)).to.equal(17327 / 2);
    });

    it('should return null if the given day has no data', function() {
      futureJuly = moment('2020/07/21', 'YYYY/MM/DD')
      expect(activity.getAverageStepsOnDay(futureJuly)).to.equal(null);
    });
  });

  describe('getAverageMinutesOnDay', function() {
    it('should return the overall average steps for a given day out of all users', function() {
      expect(activity.getAverageMinutesOnDay(date)).to.equal(243 / 2);
    });

    it('should return null if the given day has no data', function() {
      futureJuly = moment('2020/07/21', 'YYYY/MM/DD')
      expect(activity.getAverageMinutesOnDay(futureJuly)).to.equal(null);
    });
  });

  describe('getAverageFlightsOnDay', function() {
    it('should return the overall average steps for a given day out of all users', function() {
      expect(activity.getAverageFlightsOnDay(date)).to.equal(46 / 2);
    });

    it('should return null if the given day has no data', function() {
      futureJuly = moment('2020/07/21', 'YYYY/MM/DD')
      expect(activity.getAverageFlightsOnDay(futureJuly)).to.equal(null);
    });
  });
});

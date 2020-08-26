const chai = require("chai");
const expect = chai.expect;

const Activity = require('../src/Activity');

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
    date = '2019/06/21';
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
      expect(activity.getMilesWalked('2020/06/21', user1)).to.equal(null);

      let badUser = {userID: 51}
      expect(activity.getMilesWalked(date, badUser)).to.equal(null);
    });
  });
});

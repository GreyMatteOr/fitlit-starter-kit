const chai = require("chai");
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');

describe('UserRepository', function() {

  let hydration, sleep, activity, userRepository;
  beforeEach(function() {
    hydration = {
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    };
    sleep = {
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    };
    activity = {
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3577,
      "minutesActive": 140,
      "flightsOfStairs": 16
    };
    userRepository = new UserRepository([hydration], [sleep], [activity]);
  });

  describe('Intialization', function() {

    it('should be a function', function() {
      expect(UserRepository).to.be.a('function');
    });

    it('should be an instance of UserRepository', function() {
      expect(userRepository).to.be.an.instanceof(UserRepository);
    });

    it('should have a hydration property', function() {
      expect(userRepository).to.have.property('hydration');
    });


    it('should have a hydration property', function() {
      expect(userRepository).to.have.property('sleep');
    });

    it('should have a hydration property', function() {
      expect(userRepository).to.have.property('activity');
    });

    it('should store an array of hydration Objects', function() {
      expect(userRepository.hydration).to.deep.equal([hydration]);
    });

    it('should store an array of sleep Objects', function() {
      expect(userRepository.sleep).to.deep.equal([sleep]);
    });

    it('should store an array of activity Objects', function() {
      expect(userRepository.activity).to.deep.equal([activity]);
    });
  });
});

const chai = require("chai");
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');

describe('UserRepository', function() {

  let userData, userRepository;
  beforeEach(function() {
    userData = [{
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
    },
    {
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
    },
    {
      "id": 3,
      "name": "Herminia Witting",
      "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
      "email": "Elwin.Tromp@yahoo.com",
      "strideLength": 4.4,
      "dailyStepGoal": 5000,
      "friends": [
        19,
        11,
        42,
        33
      ]
    }];
    userRepository = new UserRepository(userData);
  });

  describe('Intialization', function() {
    it('should be a function', function() {
      expect(UserRepository).to.be.a('function');
    });

    it('should be an instance of UserRepository', function() {
      expect(userRepository).to.be.an.instanceof(UserRepository);
    });

    it('should be able to save userData', function() {
      expect(userRepository.data).to.deep.equal(userData);
    });
  });

  describe('getUser()', function() {
    it('should be able to return a user object', function() {
      expect(userRepository.getUser(1)).to.equal(userData[0]);
    });

    it('should not return a user if there is no match', function() {
      expect(userRepository.getUser(4)).to.equal(undefined);
    });
  });

  describe('calculateAverageStepGoal()', function(){
    it('should calculate average daily step goals for all users', function () {
      expect(userRepository.calculateAverageStepGoal()).to.equal(20000 / 3);
    });

    it('should return 0 when there are no users', function() {
      let userRepository1 = new UserRepository([]);

      expect(userRepository1.calculateAverageStepGoal()).to.equal(0);
    });
  });
});

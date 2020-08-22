const chai = require("chai");
const expect = chai.expect;

const User = require('../src/User');

describe('User', function() {

  let user, userData;
  beforeEach(function() {
    userData = {
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
    }
    user = new User(userData);
  });

  describe('Intialization', function() {

    it('should be a function', function() {
      expect(User).to.be.a('function');
    });

    it('should be an instance of User', function() {
      expect(user).to.be.an.instanceof(User);
    });

    it('should be able to hold User ID', function() {
      expect(user.id).to.deep.equal(userData.id);
    });

    it('should be able to hold User name', function() {
      expect(user.name).to.deep.equal(userData.name);
    });

    it('should be able to hold User address', function() {
      expect(user.address).to.deep.equal(userData.address);
    });

    it('should be able to hold User email', function() {
      expect(user.email).to.deep.equal(userData.email);
    });

    it('should be able to hold User strideLength', function() {
      expect(user.strideLength).to.deep.equal(userData.strideLength);
    });

    it('should be able to hold User dailyStepGoal', function() {
      expect(user.dailyStepGoal).to.deep.equal(userData.dailyStepGoal);
    });

    it('should be able to hold User friends', function() {
      expect(user.friends).to.deep.equal(userData.friends);
    });
  });

  describe('getFirstName()', function () {
    it(`should return the user's first name`, function() {
      expect(user.getFirstName()).to.equal('Luisa');
    })

    it(`it should return an empty string when the name doesn't exist or isn't a string`, function () {
      user.name = '';
      expect(user.getFirstName()).to.equal('');
      user.name = 123;
      expect(user.getFirstName()).to.equal('');
    });
  });
});

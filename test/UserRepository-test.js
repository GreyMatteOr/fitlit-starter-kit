const chai = require("chai");
const expect = chai.expect;

const UserRepository = require('../src/UserRepository');

describe('UserRepository', function() {

  let userRepository;
  beforeEach(function() {
    userRepository = new UserRepository();
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
  });
});

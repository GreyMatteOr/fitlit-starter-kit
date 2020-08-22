const chai = require("chai");
const expect = chai.expect;

const Hydration = require('../src/Hydration');

describe('Hydration', function() {

  let hydration;
  beforeEach(function() {
    hydration = new Hydration();
  });

  describe('Intialization', function() {

    it('should be a function', function() {
      expect(Hydration).to.be.a('function');
    });
    it('should be an instance of Hydration', function() {
      expect(hydration).to.be.an.instanceof(Hydration);
    });
  });
});

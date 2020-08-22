const chai = require("chai");
const expect = chai.expect;

const Hydration = require('../src/Hydration');

describe('Hydration', function() {

  let hydrationData, hydration;
  beforeEach(function() {
    hydrationData = [{
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    },
    {
      "userID": 1,
      "date": "2019/06/16",
      "numOunces": 69
    },
    {
      "userID": 1,
      "date": "2019/06/17",
      "numOunces": 96
    },
    {
      "userID": 1,
      "date": "2019/06/18",
      "numOunces": 96
    },
    {
      "userID": 1,
      "date": "2019/06/19",
      "numOunces": 28
    },
    {
      "userID": 1,
      "date": "2019/06/20",
      "numOunces": 82
    },
    {
      "userID": 1,
      "date": "2019/06/21",
      "numOunces": 99
    }]
    hydration = new Hydration(hydrationData);
  });

  describe('Intialization', function() {

    it('should be a function', function() {
      expect(Hydration).to.be.a('function');
    });

    it('should be an instance of Hydration', function() {
      expect(hydration).to.be.an.instanceof(Hydration);
    });

    it('should store an Array of Hydration Objects', function() {
      expect(hydration.data).to.deep.equal(hydrationData);
    });
  });
  describe('calculateAverageHydration', function() {
    it('should return the average daily consumption', function() {
      expect(hydration.calculateAverageHydration()).to.equal(507 / 7);
    });

    it('should return 0 when there is no Hydration data', function() {
      hydration.data = [];

      expect(hydration.calculateAverageHydration()).to.equal(0);
    });
  });
});

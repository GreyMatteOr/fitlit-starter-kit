const chai = require("chai");
const expect = chai.expect;
const moment = require('moment');

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
      "userID": 2,
      "date": "2019/06/15",
      "numOunces": 75
    },
    {
      "userID": 1,
      "date": "2019/06/16",
      "numOunces": 69
    },
    {
      "userID": 2,
      "date": "2019/06/16",
      "numOunces": 91
    },
    {
      "userID": 1,
      "date": "2019/06/17",
      "numOunces": 96
    },
    {
      "userID": 2,
      "date": "2019/06/17",
      "numOunces": 96
    },
    {
      "userID": 1,
      "date": "2019/06/18",
      "numOunces": 96
    },
    {
      "userID": 2,
      "date": "2019/06/18",
      "numOunces": 70
    },
    {
      "userID": 1,
      "date": "2019/06/19",
      "numOunces": 28
    },
    {
      "userID": 2,
      "date": "2019/06/19",
      "numOunces": 76
    },
    {
      "userID": 1,
      "date": "2019/06/20",
      "numOunces": 82
    },
    {
      "userID": 2,
      "date": "2019/06/20",
      "numOunces": 71
    },
    {
      "userID": 1,
      "date": "2019/06/21",
      "numOunces": 99
    },
    {
      "userID": 2,
      "date": "2019/06/21",
      "numOunces": 27
    }
  ]
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
      expect(hydration.calculateAverageHydration(1)).to.equal(507 / 7);
    });

    it('should return 0 when there is no Hydration data', function() {
      hydration.data = [];

      expect(hydration.calculateAverageHydration()).to.equal(0);
    });
  });

  describe('findOuncesWaterOfDay()', function() {
    it('should return the ounces of water drunk for a given date', function() {
      let date1 = moment('2019/06/17', 'YYYY/MM/DD');
      let date2 = moment('2019/06/21', 'YYYY/MM/DD');
      expect(hydration.findOuncesWaterOfDay(date1, 1)).to.equal(96);
      expect(hydration.findOuncesWaterOfDay(date2, 1)).to.equal(99);
    });

    it('should still return the ounces of water drunk for a any user for a specific date', function() {
      let date = moment('2019/06/18', 'YYYY/MM/DD');
      expect(hydration.findOuncesWaterOfDay(date, 1)).to.equal(96);
      expect(hydration.findOuncesWaterOfDay(date, 2)).to.equal(70);
    });

    it(`should return 0 if it can't find the day`, function() {
      let date = moment('2020/06/17', 'YYYY/MM/DD');
      expect(hydration.findOuncesWaterOfDay(date)).to.equal(null);
    });
  });

  describe('findOuncesWaterOfWeekBefore()', function() {
    it('should return an Array the ounces of water drunk for a given date', function() {
      let date = moment('2019/06/21', 'YYYY/MM/DD');
      expect(hydration.findOuncesWaterOfWeekBefore(date, 1)).to.deep.equal([37, 69, 96, 96, 28, 82, 99]);
    });

    it(`shouldn't return an entry in the array if it can't find the day`, function() {
      let date = moment('2019/06/20', 'YYYY/MM/DD');
      expect(hydration.findOuncesWaterOfWeekBefore(date, 1)).to.deep.equal([0, 37, 69, 96, 96, 28, 82]);
    });

    it('should return all 0s if a date is not identified', function() {
      let date = moment('2020/06/21', 'YYYY/MM/DD');
      expect(hydration.findOuncesWaterOfWeekBefore(date, 1)).to.deep.equal([0, 0, 0, 0, 0, 0, 0])
    });
  });
});

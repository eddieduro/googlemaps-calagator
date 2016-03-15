var expect = require('chai').expect;
var Class = require('./../js/class.js').Class;


describe("Alarm", function() {
  it("will return the current time", function() {
    var currentTime = "12:00";
    var setTime = "12:00";
    var testAlarm = new Alarm(currentTime, setTime);
    expect(testAlarm.currentTime).to.equal(currentTime);
  });
  it("will return the current time", function() {
    var currentTime = "12:00";
    var setTime = "12:00";
    var testAlarm = new Alarm(currentTime, setTime);
    expect(testAlarm.setTime).to.equal(setTime);
  });
  it("will trigger a freakish alarm", function() {
    var currentTime = "12:00";
    var setTime = "12:00";
    var testAlarm = new Alarm(currentTime, setTime);
    expect(testAlarm.triggerAlarm(currentTime, setTime)).to.equal(true);
  });
  it("will trigger a freakish alarm", function() {
    var currentTime = "12:00";
    var setTime = "12:05";
    var testAlarm = new Alarm(currentTime, setTime);
    expect(testAlarm.triggerAlarm(currentTime, setTime)).to.equal(false);
  });
});

describe("Temperature", function() {
  it ("will convert Kelvin to Fahrenheit", function(){
    var kTemp = 280.50;
    var setTemp = 45;
    var testTemperature = new Temperature(kTemp, setTemp);
    expect(testTemperature.convertTemp(kTemp)).to.equal("45.23");
  });
  it ("will trigger a freakish alarm", function(){
    var kTemp = 280.50;
    var setTemp = "45.23";
    var testTemperature = new Temperature(kTemp, setTemp);
    var fahr = testTemperature.convertTemp(kTemp);
    expect(testTemperature.tempAlarm(fahr, setTemp)).to.equal(true);
  });
  it ("will trigger a freakish alarm", function(){
    var kTemp = 43.50;
    var setTemp = 46;
    var testTemperature = new Temperature(kTemp, setTemp);
    expect(testTemperature.tempAlarm(kTemp, setTemp)).to.equal(false);
  });

});

const dateformat = function(date) {
  const dateParts = date.split("-");
  const jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return jsDate.toLocaleDateString("en-US", options);
};

const getDate = function(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString("en-US", options);
};

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

const getDatesArr = function(startDate, stopDate) {
  const dateArray = [];
  let currentDate = timezoneOffset(startDate);
  while (currentDate <= timezoneOffset(stopDate)) {
      dateArray.push(new Date (currentDate));
      currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

const timezoneOffset = function(date) {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

module.exports = {dateformat, getDate, getDatesArr, timezoneOffset };
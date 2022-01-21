const dateformat = function(date) {
  const dateParts = date.split("-");
  const jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return jsDate.toLocaleDateString("en-US", options);
};

const getDate = function(date) {
  // const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  // console.log(date.toLocaleDateString("en-US", options));
  return date.toLocaleDateString("en-US", options);
};

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

function getDatesArr(startDate, stopDate) {
  const dateArray = new Array();
  let currentDate = startDate;
  while (currentDate <= stopDate) {
      dateArray.push(new Date (currentDate));
      currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

module.exports = {dateformat, getDate, getDatesArr };
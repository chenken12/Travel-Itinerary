const dateformat = function(date) {
  const dateParts = date.split("-");
  const jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return jsDate.toLocaleDateString("en-US", options);
};

const getDate = function() {
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  console.log(date.toLocaleDateString("en-US", options));
  return date.toLocaleDateString("en-US", options);
};

module.exports = {dateformat, getDate};
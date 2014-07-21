define(["moment", 'cola/adapter/Array'], function(moment, ArrayAdapter) {
  var blankCount, days, daysInMonth, i, month, num, source, year;
  num = moment().startOf('month').day();
  blankCount = num - 1;
  daysInMonth = moment().daysInMonth();
  year = moment().format("YYYY");
  month = moment().format("MM");
  days = [];
  while (blankCount) {
    days.push({
      id: -blankCount,
      day: "-"
    });
    blankCount--;
  }
  i = 1;
  while (i <= daysInMonth) {
    days.push({
      id: moment("" + year + "-" + month + "-" + i, "YYYY-MM-D").unix(),
      day: i
    });
    i++;
  }
  source = new ArrayAdapter(days);
  return source;
});

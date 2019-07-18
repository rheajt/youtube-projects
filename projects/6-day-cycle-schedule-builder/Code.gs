function buildCalendar() {
  var calendarName = '6-Day Cycle Schedule';
  
  var calendars = CalendarApp.getCalendarsByName(calendarName);
  
  if(calendars.length) {
    var calendar = calendars[0];
    
    //create events
    createEvents(calendar);
  } else {
    var calendar = CalendarApp.createCalendar(calendarName);
    
    //create events
    createEvents(calendar);
  }
}

function createEvents(calendar) {
  var days = convertDates();
  
  var calendarColors = [
    CalendarApp.EventColor.PALE_RED,
    CalendarApp.EventColor.BLUE,
    CalendarApp.EventColor.ORANGE,
    CalendarApp.EventColor.GREEN,
    CalendarApp.EventColor.MAUVE,
    CalendarApp.EventColor.CYAN
  ];
  
  for(var i = 0; i < days.length; i++) {
    Utilities.sleep(1000);
    calendar.createAllDayEvent(days[i].cycle, new Date(days[i].year, days[i].month, days[i].day))
      .setColor(calendarColors[i % calendarColors.length]);
  }
}

function convertDates() {
  var month = 6;
  var year = 2017;
  
  var values = SpreadsheetApp.getActiveSheet().getRange('B1:G30').getValues();
  
  var headers = values.shift();
  
  var merged = values.reduce(function(a, b) {
    return a.concat(b);
  }).filter(function(a) {
    return a !== '';
  });
  
  var days = merged.map(function(each, i, arr) {
    month = (arr[i - 1] < arr[i]) ? month : (month < 11) ? month + 1 : 0;
    year = (month === 0 && arr[i - 1] > arr[i]) ? year + 1: year;
    
    return {
      cycle: headers[i % headers.length],
      year: year,
      month: month,
      day: each
    };
  });
  
  return days;
}

function Course(name, students) {
  this.name = name; 
  
  this.setStudents(students);
}

Course.prototype.setStudents = function(students) {
  this.students = students.map(function(student) {
    return [student.profile.name.fullName, student.profile.emailAddress];
  });
}

Course.prototype.createRoster = function() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheet = ss.getSheetByName(this.name) || ss.insertSheet(this.name);
  
  if(this.students.length) {
    var range = sheet.getRange(2, 1, this.students.length, 2);
    
    sheet.clear();
    
    range.setValues(this.students);
  }
};

function getRosters() {
  var courses = Classroom.Courses.list().courses;
  
  for(var i = 0; i < courses.length; i++) {
    var courseName = courses[i].name;
    
    var students = Classroom.Courses.Students.list(courses[i].id).students || [];
    
    var course = new Course(courseName, students);
    
    course.createRoster();
  }
}
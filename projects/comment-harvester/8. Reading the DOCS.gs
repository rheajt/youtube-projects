/**
 * Create a spreadsheet with a name containing the date
 */
function createSheet() {
  //create a new sheet with a specific name
  return SpreadsheetApp
    .getActiveSpreadsheet()
    .insertSheet()
    .setName('Comments ' + new Date().toLocaleString());
}

function listClassrooms() {
  //get a list of all the classrooms that you are an instructor for
  
  //need to get the teacher id from somewhere
  var me = Classroom.UserProfiles.get('me');
  
  var list = Classroom.Courses.list({teacherId: me.id});
  
  return list.courses;
}
function test() {
  Logger.log(listClassrooms());
}

//old
//function getCourseWork(courseId) {
//  //get the coursework 
//  //need to get the courseId from the list courses function
//  var courseWork = Classroom.Courses.CourseWork.list(courseId)
//  
//  //need the id of each courseWork in the array to get student submissions
//  
//  return courseWork.courseWork;
//}

function getStudentSubmissions(courseId, courseWorkId) {
  //get and student submissions for the course
  var submissions = Classroom.Courses.CourseWork.StudentSubmissions
    .list(courseId, courseWorkId)
  
  return submissions.studentSubmissions;
}

function getComments(fileId) {
  //get the drive files and comments
  var comments = Drive.Comments.list(fileId);
  
  return comments.items;
}





function loadComments() {
  var courseId = PropertiesService.getDocumentProperties().getProperty('CLASSROOM_ID');
  var courseWork = getCourseWork(courseId);
  var fileIds = [];
  
  for(var i = 0; i < courseWork.length; i++) {
    var shareMode = courseWork[i].materials[0].driveFile.shareMode;
    
    if(shareMode === 'EDIT') {
      //push the file id into the fileIds array
      var fileId = courseWork[i].materials[0].driveFile.driveFile.id;
      
      fileIds.push(fileId);
    } else {
      //get each submission and loop over them and save those file ids to the array
      var studentSubmissions = Classroom.Courses.CourseWork.StudentSubmissions.list(courseId, '-').studentSubmissions;
      
      var submissionIds = getSubmissionIds(studentSubmissions);
      
      fileIds = fileIds.concat(submissionIds);   
    }
  }
  
  return fileIds;
}

function getCourseWork(courseId) {
  var courseWork = Classroom.Courses.CourseWork.list(courseId);
  
  return courseWork.courseWork;
}

function getSubmissionIds(studentSubmissions) {
  var fileIds = [];
  
  for(var i = 0; i < studentSubmissions.length; i++) {
    if(studentSubmissions[i].assignmentSubmission.hasOwnProperty('attachments')) {
      fileIds.push(studentSubmissions[i].assignmentSubmission.attachments[0].driveFile.id);
    }
  }
  
  return fileIds;
}
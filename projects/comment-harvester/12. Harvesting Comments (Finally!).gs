function harvestComments(fileIds) {
  try {
    //1. create a new sheet in our spreadsheet
    var commentsSheet = createSheet();
    
    for(var i = 0; i < fileIds.length; i++) {
      var id = fileIds[i];
      var file = DriveApp.getFileById(id);
      var comments = getFileComments(id);
      
      //2. append each filename to a row
      commentsSheet.appendRow([
        file.getName(),
        file.getUrl()
      ]);
      
      //3. append all comments and replies to the rows after
      appendComments(commentsSheet, comments);
    }
    
    return 'SUCCESS';
  } catch(error) {
    toast('Something went wrong! ' + error.message);
  }
}

function getFileComments(id) {
  return Drive.Comments.list(id).items
    .map(function(comment) {
      return {
        author: comment.author.displayName,
        picture: comment.author.picture.url,
        content: comment.content,
        replies: comment.replies.map(function(reply) {
          return {
            author: reply.author.displayName,
            picture: reply.author.picture.url,
            content: reply.content
          }
        })
      }
    });
}
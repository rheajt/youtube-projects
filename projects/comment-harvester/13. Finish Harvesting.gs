function appendComments(commentsSheet, comments) {
  for(var i = 0; i < comments.length; i++) {
    var comment = comments[i];
    
    commentsSheet.appendRow([
      '=IMAGE("https:' + comment.picture + '", 1)',
      comment.author + ' commented ' + comment.content
    ]);
    
    if(comment.replies.length) {
      appendReplies(commentsSheet, comment.replies);
    }
    
  }
}

function appendReplies(commentsSheet, replies) {
  for(var i = 0; i < replies.length; i++) {
    var reply = replies[i];
    
    commentsSheet.appendRow([
      '=IMAGE("https:' + reply.picture + '", 1)',
      reply.author + ' replied ' + reply.content
    ]); 
  }
}
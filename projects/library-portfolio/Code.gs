function doGet(e) {
  return HtmlService.createTemplateFromFile('view').evaluate().setTitle('Library Portfolio');
}

function changeRoute(route) {
  return HtmlService.createTemplateFromFile(route).evaluate().getContent();
}

function newPortfolio() {
  var id = DriveApp.createFolder('Library Project for ' + Session.getActiveUser().getEmail()).getId();
  DriveApp.getFileById('1ZOkrYXJJ1llGb_TvY-oB3I5CfBiMNn118cVk1TYGwGA').makeCopy(Session.getActiveUser().getEmail(), DriveApp.getFolderById(id));
  var portfolio = {
    email: Session.getActiveUser().getEmail(),
    id: id
  };
  
  return PropertiesService.getUserProperties().setProperties(portfolio).getProperties();
}

function getPortfolio() {
  var portfolio = PropertiesService.getUserProperties().getProperties();
  
  if(!Object.getOwnPropertyNames(portfolio).length) {
    portfolio = newPortfolio();
  }
  
  var files = DriveApp.getFolderById(portfolio.id).getFilesByType(MimeType.GOOGLE_DOCS);
  
  portfolio.projects = [];
  
  portfolio.folderURL = DriveApp.getFolderById(portfolio.id).getUrl();
  
  while(files.hasNext()) {
    var file = files.next();
    
    portfolio.projects.push({
      name: file.getName(),
      isStarred: file.isStarred(),
      link: file.getUrl(),
    });
  }
  var pic = DriveApp.getFolderById(portfolio.id).getFilesByType(MimeType.GOOGLE_DRAWINGS);
  
  if(pic.hasNext()) {
    var image = pic.next();
    portfolio.userName = image.getName();
    portfolio.email = Session.getActiveUser().getEmail();
    portfolio.avatar = image.getUrl();
  } else {
    portfolio.userName = Session.getActiveUser().getEmail();
    portfolio.email = Session.getActiveUser().getEmail();
    portfolio.email = '';
  }
  
  return portfolio;
  
}


function getJSON() {
  //This gets the information for the books in the genre quiz
  var response = UrlFetchApp.fetch('https://script.google.com/macros/s/AKfycbwXh92zAf5Ur9kIh39VhHCtcX4LRPvrUfAUhDp0XKC8j4E9FAg/exec');
  return response.getContentText();
}



////////////////////////////////PROJECT START/////////////////////////////////////
function startBook(book) {
  
  //get the project templates
  var files = DriveApp.getFolderById('0Byvt4e0JQrRANG1uazBXUzl5U0U').getFilesByType(MimeType.GOOGLE_DOCS);
  var templates = [];
  while(files.hasNext()) {
    templates.push(files.next().getId());
  }
  var random = Math.floor(Math.random() * (templates.length - 1));
  var templateId = templates[random];


  //copy template into user folder
  var props = PropertiesService.getUserProperties().getProperties();
  if(!Object.getOwnPropertyNames(props).length) {
    props = newPortfolio();
  }
  var file = DriveApp.getFileById(templateId).makeCopy(book.title + ' by ' + book.author, DriveApp.getFolderById(props.id));
  
  
  var doc = DocumentApp.openById(file.getId()).getBody();
  
  var cover = UrlFetchApp.fetch(book.coverLink).getBlob();
  
  doc.getTables()[0].getCell(0, 0).insertImage(0, cover).setHeight(140).setWidth(100);
  
  var docTitle = doc.replaceText('<< BOOK TITLE >>', book.title);
  var docAuthor = doc.replaceText('<< BOOK AUTHOR >>', book.author);
  if(book.blurb) {
    var link = doc.replaceText('<< BOOK BLURB >>', book.blurb);
  } else {
    doc.replaceText('<< BOOK BLURB >>', '');
  }
  
  doc.getTables()[0].setLinkUrl(book.bookLink);
  
  return file.getUrl();
}

//////////////////////////BOOK SEARCH//////////////////////////
function searchBooks(search) {

  var payload = {
    "q": search,
    "key": '8ge6l7EXvLgEKPjEMwLxnw'
  };
  
  var params = {
    "method": "GET",
    "payload": payload
  };
  
  var response = UrlFetchApp.fetch('https://www.goodreads.com/search/index.xml', params).getContentText();
  var xml = XmlService.parse(response);
  var works = xml.getRootElement().getChildren('search')[0].getChild('results').getChildren();
  
  var bookResponse = [];
  for(var i = 0; i < works.length; i++) {
    var books = works[i].getChildren('best_book');
    for(var j = 0; j < books.length; j++) {
      var title = books[j].getChild('title').getText(),
          author = books[j].getChild('author').getChild('name').getText(),
          imageURL = books[j].getChild('image_url').getText();
          
      bookResponse.push([title, author, imageURL]);
    }
  }
  
  return bookResponse;
}
/**
# This is the Caption Creator for Google Drive App
## Find out more about creating accessibility in the classroom at:
### [http://www.createaccessibility.com/](http://www.createaccessibility.com/)

### Check out the working app at: [Caption Creator for Google Drive](http://bit.ly/captioncreatorforgoogledrive)

### Project idea [@maoliver17](https://twitter.com/maoliver17)
### Coded by [@rheajt](https://twitter.com/rheajt)

Open an MP4 file from your google drive and create an SRT file while watching the video. Option to download the srt as a text file or save to drive.

### TODO:
1. Why are some video types not playing in the <video> tag?
2. Create keyboard shortcuts for starting/stopping video and changing the time signatures of the SRT
*/
function doGet(e) {
  
  if(e.parameter.vidId) {
    var html = HtmlService.createTemplateFromFile('Caption');
    
    html.vidId = e.parameter.vidId;
    html.title = e.parameter.title;
    
    return html.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } else {
    return HtmlService.createTemplateFromFile('Picker').evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
  }

}

function getOAuthToken() {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}

function saveToDrive(srt, title) {
  var doc = DocumentApp.create(title + '.srt');
  var body = doc.getBody();
  
  body.appendParagraph(srt);
  
  return doc.getUrl();
}
function getSettings() {
  return PropertiesService.getDocumentProperties().getProperty('CLASSROOM_ID');
}

function saveSettings(classroomId) {
  PropertiesService.getDocumentProperties().setProperty('CLASSROOM_ID', classroomId);
  return 'success';
}
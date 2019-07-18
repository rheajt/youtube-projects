const degit = require('degit');

const repos = [
  'clasp-with-pug',  //removed
  'comment-harvester',  //removed
  'star-wars-crawl',  //removed
  'google-classroom-roster-maker',  //removed
  'monster-math-with-equatio',  //removed
  'holiday-gift-exchange',  //removed
  'color-theme-properties-service',  //removed
  '6-day-cycle-schedule-builder',  //removed
  'insert-from-drawings',  //removed
  'stranger-things-alphabet-wall',  //removed
  'digital-app-dice',  //removed
  'classroom-twitter',  //removed
  'summer-vacation-display',  //removed
  'wonder-wall-display',  //removed
  'email-summarizer',  //removed
  'library-genre-quiz-app',  //removed
  'easy-grader',  //removed
  'ubd-unit-planner',  //removed
  'caption-creator-for-google-drive',  //removed
  'slides2drive',  //removed
  'library-portfolio',  //removed
];

repos.forEach(repo => {
  const emitter = degit(`rheajt/${repo}`, {
    force: true,
  });

  emitter.on('info', info => {
    console.log(info.message);
  });

  emitter.clone(`./projects/${repo}`).then(() => {
    console.log('done');
  });
});

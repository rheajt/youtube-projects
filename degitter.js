const degit = require('degit');

const repos = [
  'clasp-with-pug',
  'comment-harvester',
  'star-wars-crawl',
  'google-classroom-roster-maker',
  'monster-math-with-equatio',
  'holiday-gift-exchange',
  'color-theme-properties-service',
  '6-day-cycle-schedule-builder',
  'insert-from-drawings',
  'stranger-things-alphabet-wall',
  'digital-app-dice',
  'classroom-twitter',
  'summer-vacation-display',
  'wonder-wall-display',
  'email-summarizer',
  'library-genre-quiz-app',
  'easy-grader',
  'ubd-unit-planner',
  'caption-creator-for-google-drive',
  'slides2drive',
  'library-portfolio',
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

function firstFunction() {
  var name = 'jordan rhea';
  var age = 35;
  var jobs = [
    'teacher',
    'traveller',
    'programmer',
    100,
    ['first', 'second', 'third']
  ];
  var details = {
    name: name,
    age: 35,
    jobs: ['teacher', 'traveller', 'programmer'],
    levelUp: function() {
      this.age = this.age + 1;
    }
  };
  
  return details.name;
}

function combineNames(names) {
  var row = names[0];
  
  return row[1][0].toLowerCase() + row[0].toLowerCase() + '@myschool.k12.us';
}

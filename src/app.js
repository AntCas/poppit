var UI = require('ui');
var Accel = require('ui/accel');

var target = get_rand_button();
var score = 0;

Accel.init();

// Title Screen
var main = new UI.Card({
  title: 'oppit!',
  icon: 'images/menu_icon.png',
  subtitle: 'Let\'s go!',
  body: target + '\nscore:' + score,
});

main.show();

// Get any Taps
Accel.on('tap', function(e) {
  console.log('axis:' + e.axis + 'dir:' + e.direction);
  update('tap');
  
});

main.on('click', 'up', function(e) {
  console.log('button: UP');
  update('up');
});

main.on('click', 'down', function(e) {
  console.log('button: DOWN');
  update('down');
});

main.on('click', 'select', function(e) {
  console.log('button: SELECT');
  update('select');
});

// Update title screen
function update(action) {
   if (target == action) {
    score++;
  }
  target = get_rand_button();
  main.body(target + '\nscore:' + score);
}

// Get Target
function get_rand_button() {
  var button_array = ['up', 'down', 'select', 'tap'];
  var rand_num = Math.floor((Math.random() * 4)); 
  return button_array[rand_num];
}
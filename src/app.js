var UI = require('ui');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');

var target = get_rand_button();
var start_time = time_now();

var score = 0;

var BONUS_TIME = 3; // Seconds awarded for success
var TIME_OUT = 10; // Seconds that warrant punishment

Accel.init();

// Title Screen
var main = new UI.Card({
  title: 'oppit!',
  icon: 'images/menu_icon.png',
  subtitle: 'Let\'s go!',
  body: target + '\nscore: ' + score,
});


// Summary Screen
var summary = new UI.Card({
  title: 'oppit!',
  icon: 'images/menu_icon.png',
  subtitle: 'Too Slow, Game Over!',
  body: 'Final Score: ' + score,
});

main.show();

// Get any Taps
Accel.on('tap', function(e) {
  console.log('axis:' + e.axis + 'dir:' + e.direction);
  update('tap');
});

// Get Button-Clicks
//UP
main.on('click', 'up', function(e) {
  console.log('button: UP');
  update('up');
});

//DOWN
main.on('click', 'down', function(e) {
  console.log('button: DOWN');
  update('down');
});

//SELECT
main.on('click', 'select', function(e) {
  console.log('button: SELECT');
  update('select');
});

// Update title screen
function update(action) {
  if (time_now() - start_time > TIME_OUT) {
    Vibe.vibrate('short');
    Vibe.vibrate('short');
    summary.show();
    main.hide();
  }
  else if (target != action) {
    score--;
    Vibe.vibrate('long');
  }
  else { // (target == action)
    score++;
    start_time += BONUS_TIME;
    main.subtitle('Let\'s go!');
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

// Get Current Time (Seconds since epoch)
function time_now(){
  return new Date().getTime() / 1000;
}
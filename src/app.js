var UI = require('ui');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');

var target = get_rand_button();
var start_time = time_now();

var score = 0; // # correct taps - # incorrect taps
var bonus_time = 3; // Seconds awarded for success
var seconds = 25; // Seconds before punishment
var bonus_penalty = 0.2; // A higher # makes the game get harder faster

Accel.init();

// Title Screen
var main = new UI.Card({
  title: 'oppit!',
  icon: 'images/menu_icon.png',
  subtitle: 'Let\'s go!',
  body: target + '\nscore: ' + score + 
        '\n' + line_time()//'|' * time_remaining(),
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
  if (time_remaining() <= 0) {
    Vibe.vibrate('short');
    Vibe.vibrate('short');
    summary.body('Final Score: ' + score);
    summary.show();
    main.hide();
  }
  else if (target != action) {
    score--;
    Vibe.vibrate('long');
  }
  else { // (target == action)
    score++;
    seconds += bonus_time;
    if (bonus_time > 0.5) { // Faster!
      bonus_time -= bonus_penalty;
    }
    main.subtitle('Let\'s go!');
  }
  target = get_rand_button();
  main.body(target + '\nscore: ' + 
            score  + '\n' + line_time());// '|' * time_remaining());
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

// Get Time remaining
function time_remaining() {
  return Math.round(seconds - (time_now() - start_time));
}

// Returns string of lines representing time left
function line_time() {
  var output = "";
  for (var i = 0; i < time_remaining(); i++){
    output += '|';
  }
  return output;
}

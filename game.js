var sprites = {
 ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
 missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
 enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
 enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
 enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
 enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 },
 enemy_boss1: { sx: 191, sy: 0, w: 42, h: 43, frames: 1 },    
 explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
 enemy_missile: { sx: 9, sy: 42, w: 3, h: 20, frame: 1, }
};

var enemies = {
  straight: { x: 0,   y: -50, sprite: 'enemy_ship', health: 10, 
              E: 100 },
  ltr:      { x: 0,   y: -100, sprite: 'enemy_purple', health: 10, 
              B: 75, C: 1, E: 100, missiles: 2, points: 150  },
  circle:   { x: 250,   y: -50, sprite: 'enemy_circle', health: 10, 
              A: 0,  B: -100, C: 1, E: 20, F: 100, G: 1, H: Math.PI/2, points: 125 },
  wiggle:   { x: 100, y: -50, sprite: 'enemy_bee', health: 20, 
              B: 50, C: 4, E: 100, firePercentage: 0.001, missiles: 2, points: 200 },
  step:     { x: 0,   y: -50, sprite: 'enemy_circle', health: 10,
              B: 150, C: 1.2, E: 75, points: 125 },
  boss1circle:   { x: 250,   y: -50, sprite: 'enemy_boss1', health: 70, 
              A: 0,  B: -100, C: 1, E: 20, F: 100, G: 1, H: Math.PI/2, firePercentage: 0.001, missiles: 2, points: 500 },
  boss1step:     { x: 0,   y: -50, sprite: 'enemy_boss1', health: 70,
              B: 150, C: 2, E: 20, points: 500 },
};

var OBJECT_PLAYER = 1,
    OBJECT_PLAYER_PROJECTILE = 2,
    OBJECT_ENEMY = 4,
    OBJECT_ENEMY_PROJECTILE = 8,
    OBJECT_POWERUP = 16;

var startGame = function() {
  var ua = navigator.userAgent.toLowerCase();

  // Only 1 row of stars
  if(ua.match(/android/)) {
    Game.setBoard(0,new Starfield(50,0.6,100,true));
  } else {
    Game.setBoard(0,new Starfield(20,0.4,100,true));
    Game.setBoard(1,new Starfield(50,0.6,100));
    Game.setBoard(2,new Starfield(100,1.0,50));
  }  
  Game.setBoard(3,new TitleScreen("Galaxy Wars", 
                                  "Press fire to begin playing!",
                                  "",
                                  playGame));
};

//*****************************************************
// LEVELS
//*****************************************************

var level1 = [
 // Start,   End, Gap,  Type,   Override
  [ 0,      4000,  500, 'circle' ],
  [ 6000,   13000, 800, 'ltr' ],
  [ 10000,  16000, 400, 'circle' ],
  [ 17800,  20000, 500, 'straight', { x: 50 } ],
  [ 18200,  20000, 500, 'straight', { x: 90 } ],
  [ 18200,  20000, 500, 'straight', { x: 10 } ],
  [ 22000,  25000, 400, 'wiggle', { x: 150 }],
  [ 22000,  25000, 400, 'wiggle', { x: 100 }]
];

var level2 = [
 // Start,   End, Gap,  Type,   Override
  [ 0,      4000,  500, 'straight', { x: 100 } ],
  [ 6000,   13000, 800, 'ltr' ],
  [ 10000,  16000, 400, 'step' ],
  [ 17800,  20000, 500, 'straight', { x: 350 } ],
  [ 17800,  20000,  500, 'circle' ],
  [ 18200,  20000, 500, 'straight', { x: 240 } ],
  [ 18200,  20000,  500, 'circle' ],
  [ 18200,  20000, 500, 'straight', { x: 100 } ],
  [ 22000,  25000, 400, 'wiggle', { x: 150 }],
  [ 22000,  25000, 400, 'step' ]
];

var level3 = [
 // Start,   End, Gap,  Type,   Override
  [ 0,       4000, 500, 'wiggle', { x: 127 } ],
  [ 6000,   13000, 800, 'straight', { x: 270 } ],
  [ 10000,  16000, 400, 'step' ],
  [ 12000,  16000, 500, 'wiggle', { x: 75 }],    
  [ 17800,  20000, 500, 'straight', { x: 350 } ],
  [ 17800,  20000, 500, 'circle' ],
  [ 18200,  20000, 800, 'straight', { x: 240 } ],
  [ 18200,  20000, 500, 'circle' ],
  [ 18200,  20000, 500, 'straight', { x: 100 } ],
  [ 22000,  25000, 700, 'wiggle', { x: 230 }],
  [ 22000,  25000, 400, 'step' ]
];

var level4 = [
 // Start,   End, Gap,  Type,   Override
  [ 0,       4000, 500, 'wiggle', { x: 270 } ],
  [ 0,       4000, 500, 'wiggle', { x: 15 } ],
  [ 6000,   13000, 800, 'straight', { x: 230 } ],
  [ 8000,   12000, 500, 'circle' ],
  [ 10000,  16000, 400, 'step' ],
  [ 12000,  16000, 500, 'wiggle', { x: 95 }],    
  [ 17800,  20000, 500, 'straight', { x: 310 } ],
  [ 17800,  20000, 500, 'circle' ],
  [ 18200,  20000, 800, 'straight', { x: 240 } ],
  [ 18200,  20000, 500, 'step' ],
  [ 18200,  20000, 500, 'straight', { x: 100 } ],
  [ 19000,  23000, 500, 'circle' ],
  [ 22000,  25000, 700, 'wiggle', { x: 230 }],
  [ 22000,  25000, 400, 'straight', { x: 125 } ],
  [ 22000,  25000, 400, 'straight', { x: 64 } ],
  [ 22000,  25000, 400, 'straight', { x: 295 } ]
];

var level5 = [
 // Start,   End, Gap,  Type,   Override
  [ 0,       4000, 500, 'circle', { x: 270 } ],
  [ 0,       4000, 500, 'ltr', { x: 55 } ],
  [ 1800,    5000, 500, 'wiggle', { x: 125 } ],
  [ 6000,   13000, 800, 'straight', { x: 200 } ],
  [ 8000,   12000, 500, 'circle' ],
  [ 10000,  16000, 400, 'step' ],
  [ 12000,  16000, 500, 'wiggle', { x: 120 }],    
  [ 17800,  20000, 500, 'straight', { x: 155 } ],
  [ 17800,  20000, 500, 'circle' ],
  [ 18200,  20000, 800, 'straight', { x: 240 } ],
  [ 18200,  20000, 500, 'step' ],
  [ 18200,  20000, 500, 'straight', { x: 100 } ],
  [ 19000,  23000, 500, 'circle' ],
  [ 22000,  25000, 700, 'wiggle', { x: 50 }],
  [ 22000,  25000, 400, 'straight', { x: 240 } ],
  [ 22000,  25000, 400, 'straight', { x: 100 } ]
];

var level5boss = [
 // Start,   End, Gap,  Type,   Override
  [ 0,       4000,2000, 'boss1circle', { x: 230 } ],
  [ 0,       4000,2000, 'boss1step', { x: 15 } ],
  [ 0,       4000,2000, 'boss1step', { x: 65 } ],
  [ 10000,  12000,1000, 'boss1circle' ],
  [ 18800,  20800,1000, 'boss1step', { x: 10 } ],
  [ 22000,  24000,2000, 'boss1step', { x: 45 } ],
];


//*****************************************************
// ACTUAL RUNNING OF THE GAME
//*****************************************************


// TITLE SCREEN/FIRST LEVEL
var playGame = function() {
  var board = new GameBoard();
  board.add(new PlayerShip());
  board.add(new Level(level1,beatLevel1));
  Game.setBoard(3,board);
  Game.setBoard(5,new GamePoints(0));
};


// SECOND LEVEL
var playGame2 = function() {
  var board = new GameBoard();
  board.add(new PlayerShip());
  board.add(new Level(level2,beatLevel2));
  Game.setBoard(3,board);
};

// THIRD LEVEL
var playGame3 = function() {
  var board = new GameBoard();
  board.add(new PlayerShip());
  board.add(new Level(level3,beatLevel3));
  Game.setBoard(3,board);
};

// FOURTH LEVEL
var playGame4 = function() {
  var board = new GameBoard();
  board.add(new PlayerShip());
  board.add(new Level(level4,beatLevel4));
  Game.setBoard(3,board);
};

// FIFTH LEVEL PART 1
var playGame5 = function() {
  var board = new GameBoard();
  board.add(new PlayerShip());
  board.add(new Level(level5,beatLevel5));
  Game.setBoard(3,board);
};

// FIFTH LEVEL PART 2(BOSS)
var playGame5boss = function() {
  var board = new GameBoard();
  board.add(new PlayerShip());
  board.add(new Level(level5boss,winGame));
  Game.setBoard(3,board);
};

// SIXTH LEVEL

//*****************************************************
// TRANSITION/LOADING SCREENS
//*****************************************************

// Level 1 Complete Screen
var beatLevel1 = function() {
  Game.setBoard(3,new TitleScreen("Misson Complete!",
                                  "1 out of 5 Missions Complete!",
                                  "Press fire to begin the next mission!",
                                  playGame2));
};


// Level 2 Complete Screen
var beatLevel2 = function() {
  Game.setBoard(3,new TitleScreen("Misson Complete!",
                                  "2 out of 5 Missions Complete!",
                                  "Press fire to begin the next mission!",
                                  playGame3));
};

// Level 3 Complete Screen
var beatLevel3 = function() {
  Game.setBoard(3,new TitleScreen("Misson Complete!",
                                  "3 out of 5 Missions Complete!",
                                  "Press fire to begin the next mission!",
                                  playGame4));
};

// Level 4 Complete Screen
var beatLevel4 = function() {
  Game.setBoard(3,new TitleScreen("Misson Complete!",
                                  "4 out of 5 Missions Complete!",
                                  "Press fire to begin the next mission!",
                                  playGame5));
};

// Level 5 Part 1 Complete Screen
var beatLevel5 = function() {
  Game.setBoard(3,new TitleScreen("WARNING! WANRING!",
                                  "GOLDEN GUARD APPROACHING!",
                                  "Press fire to egnage!",
                                  playGame5boss));
};

// Level 5 Boss Complete Screen
var beatLevel5boss = function() {
  Game.setBoard(3,new TitleScreen("Misson Complete!",
                                  "5 out of 10 Missions Complete!",
                                  "Press fire to begin the next mission!",
                                  playGame6));
};


// Beat Game Screen
var winGame = function() {
  Game.setBoard(3,new TitleScreen("You Saved the Galaxy!", 
                                  "5 out of 5 Missions Complete!",
                                  "Press fire to play again",
                                  playGame));
};

// Lose Game Screen
var loseGame = function() {
  Game.setBoard(3,new TitleScreen("Game Over!", 
                                  "You failed to save the Galaxy!",
                                  "Press fire to play again",
                                  playGame));
};

var Starfield = function(speed,opacity,numStars,clear) {

  // Set up the offscreen canvas
  var stars = document.createElement("canvas");
  stars.width = Game.width; 
  stars.height = Game.height;
  var starCtx = stars.getContext("2d");

  var offset = 0;

  // If the clear option is set, 
  // make the background black instead of transparent
  if(clear) {
    starCtx.fillStyle = "#000";
    starCtx.fillRect(0,0,stars.width,stars.height);
  }

  // Now draw a bunch of random 2 pixel
  // rectangles onto the offscreen canvas
  starCtx.fillStyle = "#FFF";
  starCtx.globalAlpha = opacity;
  for(var i=0;i<numStars;i++) {
    starCtx.fillRect(Math.floor(Math.random()*stars.width),
                     Math.floor(Math.random()*stars.height),
                     2,
                     2);
  }

  // This method is called every frame
  // to draw the starfield onto the canvas
  this.draw = function(ctx) {
    var intOffset = Math.floor(offset);
    var remaining = stars.height - intOffset;

    // Draw the top half of the starfield
    if(intOffset > 0) {
      ctx.drawImage(stars,
                0, remaining,
                stars.width, intOffset,
                0, 0,
                stars.width, intOffset);
    }

    // Draw the bottom half of the starfield
    if(remaining > 0) {
      ctx.drawImage(stars,
              0, 0,
              stars.width, remaining,
              0, intOffset,
              stars.width, remaining);
    }
  };

  // This method is called to update
  // the starfield
  this.step = function(dt) {
    offset += dt * speed;
    offset = offset % stars.height;
  };
};

var PlayerShip = function() { 
  this.setup('ship', { vx: 0, reloadTime: 0.25, maxVel: 200 });

  this.reload = this.reloadTime;
  this.x = Game.width/2 - this.w / 2;
  this.y = Game.height - Game.playerOffset - this.h;

  this.step = function(dt) {
    if(Game.keys['left']) { this.vx = -this.maxVel; }
    else if(Game.keys['right']) { this.vx = this.maxVel; }
    else { this.vx = 0; }

    this.x += this.vx * dt;

    if(this.x < 0) { this.x = 0; }
    else if(this.x > Game.width - this.w) { 
      this.x = Game.width - this.w;
    }

    this.reload-=dt;
    if(Game.keys['fire'] && this.reload < 0) {
      Game.keys['fire'] = false;
      this.reload = this.reloadTime;

      this.board.add(new PlayerMissile(this.x,this.y+this.h/2));
      this.board.add(new PlayerMissile(this.x+this.w,this.y+this.h/2));
    }
  };
};

PlayerShip.prototype = new Sprite();
PlayerShip.prototype.type = OBJECT_PLAYER;

PlayerShip.prototype.hit = function(damage) {
  if(this.board.remove(this)) {
    loseGame();
  }
};


var PlayerMissile = function(x,y) {
  this.setup('missile',{ vy: -700, damage: 10 });
  this.x = x - this.w/2;
  this.y = y - this.h; 
};

PlayerMissile.prototype = new Sprite();
PlayerMissile.prototype.type = OBJECT_PLAYER_PROJECTILE;

PlayerMissile.prototype.step = function(dt)  {
  this.y += this.vy * dt;
  var collision = this.board.collide(this,OBJECT_ENEMY);
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.y < -this.h) { 
      this.board.remove(this); 
  }
};


var Enemy = function(blueprint,override) {
  this.merge(this.baseParameters);
  this.setup(blueprint.sprite,blueprint);
  this.merge(override);
};

Enemy.prototype = new Sprite();
Enemy.prototype.type = OBJECT_ENEMY;

Enemy.prototype.baseParameters = { A: 0, B: 0, C: 0, D: 0, 
                                   E: 0, F: 0, G: 0, H: 0,
                                   t: 0, reloadTime: 0.75, 
                                   reload: 0 };

Enemy.prototype.step = function(dt) {
  this.t += dt;

  this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
  this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

  this.x += this.vx * dt;
  this.y += this.vy * dt;

  var collision = this.board.collide(this,OBJECT_PLAYER);
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  }

  if(Math.random() < 0.01 && this.reload <= 0) {
    this.reload = this.reloadTime;
    if(this.missiles == 2) {
      this.board.add(new EnemyMissile(this.x+this.w-2,this.y+this.h));
      this.board.add(new EnemyMissile(this.x+2,this.y+this.h));
    } else {
      this.board.add(new EnemyMissile(this.x+this.w/2,this.y+this.h));
    }

  }
  this.reload-=dt;

  if(this.y > Game.height ||
     this.x < -this.w ||
     this.x > Game.width) {
       this.board.remove(this);
  }
};

Enemy.prototype.hit = function(damage) {
  this.health -= damage;
  if(this.health <=0) {
    if(this.board.remove(this)) {
      Game.points += this.points || 100;
      this.board.add(new Explosion(this.x + this.w/2, 
                                   this.y + this.h/2));
    }
  }
};

var EnemyMissile = function(x,y) {
  this.setup('enemy_missile',{ vy: 200, damage: 10 });
  this.x = x - this.w/2;
  this.y = y;
};

EnemyMissile.prototype = new Sprite();
EnemyMissile.prototype.type = OBJECT_ENEMY_PROJECTILE;

EnemyMissile.prototype.step = function(dt)  {
  this.y += this.vy * dt;
  var collision = this.board.collide(this,OBJECT_PLAYER)
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.y > Game.height) {
      this.board.remove(this); 
  }
};



var Explosion = function(centerX,centerY) {
  this.setup('explosion', { frame: 0 });
  this.x = centerX - this.w/2;
  this.y = centerY - this.h/2;
};

Explosion.prototype = new Sprite();

Explosion.prototype.step = function(dt) {
  this.frame++;
  if(this.frame >= 12) {
    this.board.remove(this);
  }
};

window.addEventListener("load", function() {
  Game.initialize("game",sprites,startGame);
});

















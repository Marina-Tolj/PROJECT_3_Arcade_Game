// Starting positions for Enemies on y axis
var enemyPosition = [70, 150, 230];

// Enemy bugs in different color
var enemySprite = ['images/enemy-bug.png', 'images/enemy-bug2.png'];

// At the start of the game player has 3 lives
var pLives = 3;

// Positions on x and y for gems, to be chosen from randomly
// when gems appear
var gemPositionX = [0, 100, 200, 300, 400];
var gemPositionY = [70, 150, 180, 230, 280, 310];
// Gems in different color
var gemSprite = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];

// At the start of the game player has score equal to 0
var score = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // Modified to randomly select between two different colors
    // of Enemy bugs
    this.sprite = enemySprite[Math.floor(Math.random() * enemySprite.length)];

    // So that Enemy bugs appear to be entering the canvas
    this.x = -100;
    // Random starting positions for Enemies on y axis
    this.y = enemyPosition[Math.floor(Math.random() * enemyPosition.length)];
    // Random speed for Enemies
    this.speed = Math.floor((Math.random() * 200) + 50);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed *dt);
    
    // When Enemy bug exits the canvas it gets reset to a random y
    // start position and random speed
    if (this.x > 505) {
       this.x = -100;
       this.y = enemyPosition[Math.floor(Math.random() * enemyPosition.length)];
       this.speed = Math.floor((Math.random() * 200) + 50);
    }

    // Measuring the distance between center of the player in
    // the “box” (player’s .png is larger than the actual player)
    // and center of the bug in the bug “box”
    this.bugPlayerDistance = Math.pow(Math.pow(player.x+50-(this.x+50),2)+Math.pow(player.y+100-(this.y+110),2),0.5);

    // When the distance (from center of the player to center
    // of the bug) is less than or equal to 70 px,  player and
    // Enemy bug have collided so we should reset the player
    // to its original position and subtract a life from the
    // lives count
    if(this.bugPlayerDistance <= 70) {
        // Subtracting one life
        pLives -= 1;

        // If the number of lives reaches 0 the game is over,
        // bugs won, and we reload the game to start over
        if (pLives === 0) {
            alert('Bugs win! Try again?');
            location.reload();
        }
        // If player collides with a bug, and still has some
        // lives left, it gets reset to original position on the canvas
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Gems our player must collect to get a key and finish the game
var Gem = function() {
    // Variables applied to each of our instances go here

    // The image/sprite for our gems, this uses
    // a helper to easily load images
    // Modified to randomly select between three different colors
    // of gems
    this.sprite = gemSprite[Math.floor(Math.random() * gemSprite.length)];

    // So that gems appear randomly on the canvas using Arrays
    // defined at the start of the code
    this.x = gemPositionX[Math.floor(Math.random() * gemPositionX.length)];
    this.y = gemPositionY[Math.floor(Math.random() * gemPositionY.length)];
};

// Update the gems position
Gem.prototype.update = function() {

    // Measuring the distance between center of the player in 
    // the “box” (player’s .png is larger than the actual player)
    // and center of the gem in the gem “box”
    this.gemPlayerDistance = Math.pow(Math.pow(player.x+50-(this.x+50),2)+Math.pow(player.y+100-(this.y+110),2),0.5);

    if (score < 100) {
    // Function to check if Gem and player have collided
    
        // When the distance (from center of the player to center
        // of the gem) is less than or equal to 65 px,  player and
        // gem have collided so we should add ten points to our score
        if(this.gemPlayerDistance <= 65) {
            // Adding 10 points for each gem collected
            score += 10;

            // Collected gem reappearing on the canvas
            this.sprite = gemSprite[Math.floor(Math.random() * gemSprite.length)];
            this.x = gemPositionX[Math.floor(Math.random() * gemPositionX.length)];
            this.y = gemPositionY[Math.floor(Math.random() * gemPositionY.length)];
        }
    }

    // For gems to stop appearing on the canvas after
    // the score reaches 100
    if (score >= 100) {
        for(gem in allGems) {
            allGems[gem].x = 1000;
             allGems[gem].y = 1000;
        }
    }   
};

// Draw the gem on the screen, required method for game
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Key that player must collect to finish the game
var Key = function() {
    this.x = 300;
    this.y = 10;
    this.sprite = 'images/Key.png';
};

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Key.prototype.update = function() {

    // Measuring the distance between center of the player in
    // the “box” (player’s .png is larger than the actual player)
    // and center of the key in the key “box”.
    this.keyPlayerDistance = Math.pow(Math.pow(player.x+50-(this.x+52),2)+Math.pow(player.y+100-(this.y+116),2),0.5);

    // When the distance (from center of the player to center
    // of the key) is less than or equal to 40 px,  player and
    // key have collided and player wins over bugs
    if(this.keyPlayerDistance <= 40 && score >= 100) {
        alert('You win, bugs lose!!');
        location.reload();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    // Variables applied to each of our player instances go here
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(x) {
    
    //Here we are defining the movement of the Player

    // If the left arrow key is being pressed, Player moves
    // to the left in increments of 40px
    if (x === "left") {
        this.x -= 40;
        // When Player reaches the left end of the level (canvas)
        // Player stops
        if (this.x < 0) {
            this.x = 0;
        }
    }
    
    if (x === "right") {
        this.x += 40;
        if (this.x > 404) {
            this.x = 404;
        }
    }

    if (x === "up") {
        this.y -= 40;
        if (this.y <= 7) {
            this.y = 7;
            score += 5;
            // If you would like to win the game just by reaching the
            // water, comment out the lines above, and uncomment
            // two lines bellow this comment:
            // alert('You win, bugs lose!!');
            // location.reload();  
        }
    }

    if (x === "down") {
        this.y += 40;
        if (this.y > 430) {
            this.y = 430;
        }
    }
};

Player.prototype.reset = function() {
    // Returns Player to the start position
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allGems = [];
for (var i=0; i<3; ++i) {
    allGems[i] = new Gem();
}

var allEnemies = [];
for (var i=0; i<3; ++i) {
    allEnemies[i] = new Enemy(); 
}

var player = new Player(200, 400);

var unlock = new Key();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});







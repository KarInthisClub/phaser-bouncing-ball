// Add JavaScript code for your web site here and call it from index.html.
let WIDTH = 600;
let HEIGHT = 500;

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let ball;
let yspeed = 0.5;
let xspeed = 1;
let ballsize = 80;
let lives = 10;
let liveText;
let gameOverText;

function preload() {
    // Load assets here
    this.load.image("ball", "assets/ball.png"); //load my image to the page
}

function create() {
    // Initialize game objects here
    ball = this.add.sprite(WIDTH/2,HEIGHT/2,"ball"); //x, y coordinates, where is your image
    ball.setDisplaySize(ballsize,ballsize); //width and height of the ball
    
    ball.setInteractive();
    ball.on('pointerdown', function(){
    console.log("Ball Clicked!");
    yspeed *= 1.1;
    xspeed *= 1.1;
    ballsize *= 0.99;
    ball.setDisplaySize(ballsize,ballsize)
    
        lives += 1;
        liveText.setText(`Lives: ${lives}`);
})

    liveText = this.add.text(10,10, `Lives: ${lives}`,{
        fontSize: '24px',
        fill: '#808080'
    })
    // display game over text
    gameOverText = this.add.text(WIDTH/2,HEIGHT/2, 'GAME OVER',{
        fontSize: '64px',
        fill: '#ff0000'
    });
    gameOverText.setOrigin(0.5); //Center the text
    gameOverText.setVisible(false); //set it to non visible when game start
    
}

function update() {
    // Game logic here
    ball.y += yspeed; //adding yspeed to the ball -> fall down
    ball.x += xspeed;
    if (ball.x >= (WIDTH - ballsize/2) || ball.x <= (ballsize/2)){
    xspeed *= -1;
    lives -= 1;
    liveText.setText(`Lives: ${lives}`);
    checkGameOver();
}
    if (ball.y >= (HEIGHT - ballsize/2) || ball.y <= (ballsize/2)){
    yspeed *= -1;
    lives -= 1;
    liveText.setText(`Lives: ${lives}`);
    checkGameOver();
}

function checkGameOver(){
    if (lives<=0) {
        lives = 0;
        liveText.setText(`Lives: 0`);
        gameOverText.setVisible(true);
        ball.setVisible(false);
    }
} 


    
    
}
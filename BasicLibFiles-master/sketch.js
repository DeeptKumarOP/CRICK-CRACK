var gamestate;
var playerScore=0;



function preload() {}


function setup() {
  createCanvas(800,600);
var colors= createColors();
  gamestate="playing";
  paddle = new Paddle();
  ball = new Ball(paddle);
  bricks= createBricks(colors);
  
}
function createColors(){
const colors = [];
colors.push(color(265,165,0));
colors.push(color(135,206,250));
colors.push(color(147,112,290));

for (var i=0 ; i<10 ; i++){
  colors.push(color(random(0,265), random(0,265), random(0,265)));
}

return colors;

}

function createBricks(colors){
  const bricks= [];
  const rows= 10;
  const bricksPerRow= 10;
  const brickWidth= width/bricksPerRow;
  for (var row=0 ; row<rows ; row++){
  for (var i=0 ; i<bricksPerRow ; i++){
   brick=new Brick(createVector(brickWidth*i, 25*row), brickWidth, 25, colors [floor(random(0,colors.length))]);
   bricks.push(brick);
   }
  }
  return bricks;
}

function draw() {
  if(gamestate=="playing"){
  background("black");

  ball.bouncePaddle();
  ball.bounceEdge();

  ball.update();
if(keyIsDown(LEFT_ARROW)){
paddle.move('left');
}
else if(keyIsDown(RIGHT_ARROW)){
  paddle.move('right');
}
  for(var i=bricks.length-1 ; i>=0 ; i--){
const brick = bricks[i];
if (brick.isColliding(ball)){
  ball.reverse('-y');
  bricks.splice(i,1);
  playerScore+=brick.points;
}
  
  else {

brick.display();
}
}
  paddle.display();
  ball.display();

textSize(32)
 fill(255);
 text(`Score:${playerScore}`, width - 150, 50);

if(ball.belowBottom()){
  gamestate="lose";
}
if (bricks.length===0){
  gamestate= "win"
}
  
}
else {textSize=100
gamestate==='lose'? fill(255,0,255): fill(255)};
text(`You ${gamestate}!!!`, width / 2 - 220, height / 2);
 }
  

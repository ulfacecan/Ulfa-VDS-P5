let player;
let walkers = [];

function setup() {
  createCanvas(800, 600);
  player = new Player(width / 2, height / 2);
  for (let i = 0; i < 1000; i++) {
    let x = random(width);
    let y = random(height);
    walkers.push(new Walker(x, y));
  }
}

function draw() {
  background(255,204,153);
  player.update();
  player.display();
  
  for (let walker of walkers) {
    walker.chase(player);
    walker.update();
    walker.display();
  }
}

class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.size = 20;
    this.color = color(0, 255, 0);
  }
  
  update() {
    this.pos.x = mouseX;
    this.pos.y = mouseY;
  }
  
  display() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}

class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.acc = createVector();
    this.size = 20;
    this.color = color(51,51,51);
  }
  
  chase(target) {
    let dir = p5.Vector.sub(target.pos, this.pos);
    dir.normalize();
    dir.mult(0.5);
    this.acc = dir;
  }
  
  update() {
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.checkEdges();
  }
  
  checkEdges() {
    if (this.pos.x < 0) {
      this.pos.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
  
  display() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}
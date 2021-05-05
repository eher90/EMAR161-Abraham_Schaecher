let mySimulation, mySimulation2, mySimulation3

let z = 1

let points = []
let points2 = []
let points3 = []

let amp;

function preload() {
  soundfile = loadSound('Song.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB)
  frameRate(20)

  mySimulation = new Simulation(0.001, 0, 0.1, 25, 0.208186, 0.09)
  mySimulation2 = new diffSimulation(-0.001, 0, -0.1, 0.208186, 0.09)
  mySimulation3 = new changeSimulation(0.01, 0, 0, 10, 28, 8.0 / 3.0, 0.01)

  soundfile.loop()
  amp = new p5.Amplitude();
  amp.setInput(soundfile)

  var vol = amp.getLevel()
  let size = map(vol, 0, 1, 0.8, 5);
}

function draw() {
  background(0)
  let level = amp.getLevel();

  if (soundfile.currentTime() >= 0 && soundfile.currentTime() < 26.5) {
    mySimulation.display()
  } else if (soundfile.currentTime() >= 26.5 && soundfile.currentTime() < 38) {
    rotateY(millis() / 2000)
    mySimulation.display()
  } else if (soundfile.currentTime() >= 38 && soundfile.currentTime() < 62) {
    mySimulation.display()
    mySimulation2.display()
  } else if (soundfile.currentTime() >= 62 && soundfile.currentTime() < 74) {
    rotateX(millis() / 2000)
    mySimulation.display()
    mySimulation2.display()
  } else if (soundfile.currentTime() >= 74 && soundfile.currentTime() < 90) {
    mySimulation.display()
    mySimulation2.display()
    mySimulation3.display()
  } else if (soundfile.currentTime() >= 90 && soundfile.currentTime() < 113) {
    rotateZ(millis() / 2000)
    rotateX(millis() / 2000)
    mySimulation.display()
    mySimulation2.display()
    mySimulation3.display()
  } else if (soundfile.currentTime() >= 113 && soundfile.currentTime() < 137) {
    scale(z)
    mySimulation.display()
    mySimulation2.display()
    mySimulation3.display()
    z += 0.01
  } else if (soundfile.currentTime() >= 137 && soundfile.currentTime() < 161) {
    rotateY(millis() / 2000)
    mySimulation.display()
    mySimulation2.display()
    mySimulation3.display()
  } else if (soundfile.currentTime() >= 161 && soundfile.currentTime() < 188) {
    mySimulation.display()
    mySimulation2.display()
    mySimulation3.display()
  } else if (soundfile.currentTime() >= 188 && soundfile.currentTime() < 216) {
    scale(z)
    mySimulation.display()
    mySimulation2.display()
    mySimulation3.display()
    z -= 0.1
  } else if (soundfile.currentTime() >= 216) {
    noLoop()
  }

  // console.log(soundfile.currentTime())
}

class Simulation {
  constructor(x, y, z, stroke, beta, dt) {
    this.x = x
    this.y = y
    this.z = z
    this.stroke = stroke
    this.beta = beta
    this.dt = dt
  }

  display() {
    let dx = (sin(this.y) - (this.beta * this.x)) * this.dt
    let dy = (sin(this.z) - (this.beta * this.y)) * this.dt
    let dz = (sin(this.x) - (this.beta * this.z)) * this.dt

    this.x = this.x + dx;
    this.y = this.y + dy;
    this.z = this.z + dz;

    amp.setInput(soundfile)

    var vol = amp.getLevel()
    let size = map(vol, 0, 1, 1, 10);

    noFill()
         
    // points.push(new p5.Vector(this.x, this.y, this.z, size));
    points.push( [this.x, this.y, this.z, size] );

    translate(0, 0, -80);
    scale(45);
    stroke(25)

    let hu = 0;


    beginShape();
    
    for (let a of points) {
      strokeWeight(a[3])
      stroke(0, 100, 100);

      // point(a.x, a.y, a.z)
      point(a[0], a[1], a[2]);


      hu += 1;
      if (hu > 255) {
        hu = 0;
      }
    }
    endShape();

  }
}

class diffSimulation {
  constructor(x, y, z, beta, dt) {
    this.x = x
    this.y = y
    this.z = z
    this.beta = beta
    this.dt = dt
  }

  display() {
    let dx = (sin(this.y) - (this.beta * this.x)) * this.dt
    let dy = (sin(this.z) - (this.beta * this.y)) * this.dt
    let dz = (sin(this.x) - (this.beta * this.z)) * this.dt

    this.x = this.x + dx;
    this.y = this.y + dy;
    this.z = this.z + dz;

    amp.setInput(soundfile)

    var vol = amp.getLevel()
    let size = map(vol, 0, 1, 1, 10)

    noFill()

    //points2.push(new p5.Vector(this.x, this.y, this.z));
    points2.push( [this.x, this.y, this.z, size] );
    
    stroke(255)

    let hu = 0;

    beginShape();
    for (let b of points2) {
      stroke(290, 100, 100);
      strokeWeight(b[3])
      //stroke(290, 100, 100);

      //point(b.x, b.y, b.z)
      point(b[0], b[1], b[2]);

      hu += 1;
      if (hu > 255) {
        hu = 0;
      }
    }
    endShape();

  }
}

class changeSimulation {
  constructor(x, y, z, a, b, c, dt) {
    this.x = x
    this.y = y
    this.z = z
    this.a = a
    this.b = b
    this.c = c
    this.dt = dt
  }

  display() {
    let dx = (this.a * (this.y - this.x)) * this.dt;
    let dy = (this.x * (this.b - this.z) - this.y) * this.dt;
    let dz = (this.x * this.y - this.c * this.z) * this.dt;

    this.x = this.x + dx;
    this.y = this.y + dy;
    this.z = this.z + dz;

    noFill()

    points3.push(new p5.Vector(this.x, this.y, this.z));

    scale(1 / 3);
    stroke(255)

    let hu = 0;

    beginShape();
    for (let c of points3) {
      strokeWeight(1)
      stroke(hu, 255, 255);
      vertex(c.x, c.y, c.z);

      hu += 1;
      if (hu > 255) {
        hu = 0;
      }
    }
    endShape();

  }
}

/*
References: 
https://www.youtube.com/watch?v=f0lkz2gSsIk (Lorenz Attractor Basic Code)

https://en.wikipedia.org/wiki/Thomas%27_cyclically_symmetric_attractor (Inspiration for Thomas cyclically symmetric attractor)

https://en.wikipedia.org/wiki/Lorenz_system (Inspiration for Lorenz System)

Song: Tom Odell--Cant Pretend
*/
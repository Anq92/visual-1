const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  //
  animate: true
};

const sketch = ({ context, width, height }) => {

  const agents = [];
  
  for (let i = 0; i < 70; i++) {

    const x = random.range(0, width);
    const y = random.range(0, height);
    agents.push(new Agent(x,y));
  }
  
  return ({ context, width, height }) => {
    context.fillStyle = 'rgba(3, 15, 64)';
    context.fillRect(0, 0, width, height);
    
      

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      const dist_data = [];
      const position = [];

      for (let j = 0; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

          dist_data.push(dist);
          position.push(other);

          if (dist > 220 && dist < 280) {
            
            context.lineWidth = math.mapRange(dist, 251, 299, 4, 1);
            context.strokeStyle = 'rgba(247, 30, 30,0.4)';
            context.beginPath();
            context.moveTo(agent.pos.x, agent.pos.y);
            context.lineTo(other.pos.x, other.pos.y);
            context.stroke();

          }
        
      }

      const zero = dist_data.indexOf(0);

      if (zero > -1) {

        dist_data.splice(zero,1);
        position.splice(zero,1);

      }


      const smallest = Math.min(...dist_data);
      const minId = dist_data.indexOf(smallest);
      const nearest = position[minId];
      const range = agent.pos.getDistance(nearest.pos);
      
      context.lineWidth = math.mapRange(range, 0, 200, 7, 4);


      if (range < 200 && range >=50) {

        var a = 247;
        var b = math.mapRange(range, 50, 199, 247, 87);
        var c = 87;
        var r = math.mapRange(range, 50, 199, 10, 5);

      }

      if (range < 50 && range > 10)  {

          var a = 247;
          var b = 247;
          var c = math.mapRange(range, 11, 49, 247, 5);
          var r = math.mapRange(range, 10, 49, 15, 10);

      }

      if (range < 10) {

        var a = 255;
        var b = 255;
        var c = 255;
        var r = math.mapRange(range, 0, 9, 55, 12);

      }
        
      if (range >200 && range < 250) {

        var a = 247;
        var b = 87;
        var c = 87;
        var r = 8;

      }


      context.strokeStyle = 'rgba('+ a +', '+ b +', '+ c+',0.5)';
      context.beginPath();
      context.moveTo(agent.pos.x, agent.pos.y);
      context.lineTo(nearest.pos.x, nearest.pos.y);
      context.stroke();
      context.lineWidth = 1;
      context.fillStyle = 'rgba('+ a +', '+ b +', '+ c+')';
      context.beginPath();
      context.arc(agent.pos.x, agent.pos.y, r, 0, Math.PI*2);
      context.fill();
  
      }   

    agents.forEach(agent => {

      agent.update();
      agent.wrap(width, height);
    });

  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    
  }

getDistance(v) {
  const dx = this.x - v.x;
  const dy = this.y - v.y;
  return Math.sqrt(dx * dx + dy * dy);
}
}

class Agent {

  constructor(x,y) {
    this.pos = new Vector(x,y);
    this.vel = new Vector(random.range(-1,8), 2);
    this.radius = 5;
  }

  wrap(width,height) {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
}

  
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
 
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 4;
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI*2);
    context.fill();
    context.restore();

 }
}
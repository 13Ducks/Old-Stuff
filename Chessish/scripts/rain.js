class Rain {
  constructor(x, wid, hei, acc) {
    this.x = x;
    this.y = ORIGIN - (SDIM * 2);
    this.width = wid;
    this.height = hei;
    this.speed = 0;
    this.acc = acc;
    this.color = Math.random() > 0.5 ? '#3481db' : '#1a547a';
  }

  update() {
    this.speed += this.acc;
    this.y += this.speed;
  }

  draw() {
    if (this.x > OUTGIN - 4 * SDIM - (SDIM / 6) && this.x < OUTGIN - (SDIM / 6) && this.y + this.height > OUTGIN && this.y < SIDE) {
      fill(0,0,0,0)
    } else {
      fill(this.color);
    }
    rect(this.x, this.y, this.width, this.height);
  }
}
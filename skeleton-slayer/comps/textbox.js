class TextBox {
  constructor(x,y,width,height,text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }
  draw() {
    noStroke();
    fill(191, 128, 64, 190);
    rect(this.x, this.y, this.width, this.height, 20);
    fill(255);
    textAlign(CENTER, CENTER);
    //brute forced values can someone get an algoritm
    if (this.text.length < 60) 
      textSize(60);
    else if (this.text.length < 100)
      textSize(36);
    else if (this.text.length < 190) 
      textSize(24);
    else
      textSize(12);
  
    text(this.text, this.x, this.y, this.width, this.height);
  }
  updateText(newText) {
    this.text = newText;
  }
} 
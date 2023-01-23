class Tux {
  constructor(image, x, y) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.points = 0;
    this.itemsCaught = 0;
    this.windowsCaught = 0;
    this.itemsMissed = 0;
    this.radius = image.width / 10;
    print(this.radius);
  }

  makeImage() {
    imageMode(CENTER); 
    image(this.image, this.x, this.y, this.image.width / 5, this.image.height / 5);
  }

  updateY(y) {
    this.y = y;
  }
}
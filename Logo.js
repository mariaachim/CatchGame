class Logo {
  constructor(radius, image) {
    // width, height, point, frequency can all be obtained using a switch case of the type
    this.radius = radius; // tmp, might be merged into switch-case
    this.image = image; // if type is switched to number based system this needs to be modified and moved into the switch-case
    this.x = random(width);
    this.y = -50;
    //this.radius = this.image.width  / 2;
    switch (image) {
      case arch || gentoo || openbsd:
        this.points = 3;
        this.frequency = 0.05
        this.velocity = 90;
        break;
      case fedora || redhat:
        this.points = 2;
        this.frequency = 0.4;
        this.velocity = 50;
        break;
      case ubuntu || opensuse:
        this.points = 1;
        this.frequency = 0.55;
        this.velocity = 30;
        break;
      case windows:
        this.points = -1;
        this.velocity = 40;
        break;
    }
  }

  fall() {
    imageMode(CENTER); 
    image(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
  }
}
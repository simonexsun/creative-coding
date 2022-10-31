class UI {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.thickness = 0.5;
  }

  interact() {
    push();
    // shift canvas
    translate(-width / 2, -height / 2);

    if (dist(mouseX, mouseY, this.x, this.y) <= this.h / 2 - this.w / 2) {
      // highlight on hover
      fill(255, 255, 255, 20);
      noStroke();
      ellipse(this.x, this.y, this.h);
      // interaction on mouse pressed
      if (mouseIsPressed) {
        // thicken ellipse stroke
        this.thickness = 3;
        // mouse press action (to be overridden)
        this.mousePressAction();
      } else {
        // reverse ellipse stroke
        this.thickness = 0.5;
      }
    } else {
      // reverse ellipse stroke
      this.thickness = 0.5;
    }
    pop();
  }

  mousePressAction() {
    console.log("ERR: parent class mousePressAction called");
  }
}

class BouncingBallUI extends UI {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.ellipseY = y;
    this.color = color(215, 190, 105);
  }

  mousePressAction() {
    // move ellipse based on mouse positions
    this.ellipseY = mouseY;
  }

  display() {
    push();
    // shift canvas
    translate(-width / 2, -height / 2);

    // display ellipse
    noFill();
    strokeWeight(this.thickness);
    stroke(this.color);
    ellipse(this.x, this.ellipseY, this.w);
    // display track
    strokeWeight(0.5);
    line(this.x, this.y - this.h / 2, this.x, this.y + this.h / 2);
    pop();
  }
}

class LineUI extends UI {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.lineY = y - h * 0.35;
    this.color = color(235, 131, 131); // red
  }

  mousePressAction() {
    // change line length based on mouse positions
    this.lineY = mouseY;
  }

  display() {
    push();
    // shift canvas
    translate(-width / 2, -height / 2);
    // display line
    noFill();
    strokeWeight(this.thickness);
    stroke(this.color);
    line(this.x, this.lineY, this.x, this.y + this.h / 2 - this.w / 2);
    // display track outline
    strokeWeight(0.5);
    // left outline
    line(
      this.x - this.w / 2,
      this.y - (this.h / 2 - this.w / 2),
      this.x - this.w / 2,
      this.y + (this.h / 2 - this.w / 2)
    );
    // right outline
    line(
      this.x + this.w / 2,
      this.y - (this.h / 2 - this.w / 2),
      this.x + this.w / 2,
      this.y + (this.h / 2 - this.w / 2)
    );
    // top arc
    arc(this.x, this.y - (this.h / 2 - this.w / 2), this.w, this.w, PI, TWO_PI);
    // bottom arc
    arc(this.x, this.y + (this.h / 2 - this.w / 2), this.w, this.w, TWO_PI, PI);
    pop();
  }
}

class CirclingBallUI extends UI {
  constructor(x, y, R, r) {
    const w = 0;
    const h = (R + r) * 2;
    super(x, y, w, h);

    this.R = R;
    this.r = r;
    this.ellipseY = y + R * 0.8;
    this.ellipseX =
      this.x + sqrt(sq(this.R + this.r) - sq(this.y - this.ellipseY));
    this.color = color(169, 215, 105); // green
  }

  mousePressAction() {
    // move ellipse based on mouse positions
    this.ellipseX = this.x + sqrt(sq(this.R + this.r) - sq(this.y - mouseY));
    this.ellipseY = mouseY;
  }

  display() {
    push();
    // shift canvas
    translate(-width / 2, -height / 2);

    // display ellipse
    fill(this.color);
    strokeWeight(this.thickness);
    stroke(this.color);
    ellipse(this.ellipseX, this.ellipseY, this.r * 2);
    // display indicator
    noFill();
    line(
      this.x - this.r,
      this.ellipseY + this.r / 2,
      this.x + this.r,
      this.ellipseY + this.r / 2
    );
    line(
      this.x - this.r,
      this.ellipseY - this.r / 2,
      this.x + this.r,
      this.ellipseY - this.r / 2
    );

    // display track
    strokeWeight(0.5);
    ellipse(this.x, this.y, this.R * 2);
    pop();
  }
}

class BoxUI extends UI {
  constructor(x, y, boxWidth, r) {
    const w = 0;
    const h = boxWidth * 1.5;
    super(x, y, w, h);
    this.theta = radians(30);
    this.movement = 0;
    this.r = r; // indicator line length
    this.color = color(105, 204, 215); // blue
  }

  mousePressAction() {
    // enlarge or smallen ellipse based on mouse positions
    this.theta = radians(map(mouseY, 473, 623, 60, 0));
    // move indicator up or down based on mouse positions
    this.movement = map(
      mouseY,
      473,
      623,
      -this.h / 2 + this.r,
      this.h / 2 - this.r
    );
  }

  display() {
    push();
    // shift canvas
    translate(-width / 2, -height / 2);
    translate(this.x, this.y);
    rotateX(radians(0));
    rotateY(radians(-30));

    // display box (static)
    fill(105, 204, 215, 50);
    strokeWeight(0.5);
    stroke(this.color);
    box(this.h / 4);

    // display tracks around the box (animated)
    noFill();
    strokeWeight(this.thickness);
    let ellipseW = this.h;
    // ellipse "\"
    push();
    rotateX(radians(80));
    rotateY(this.theta);
    ellipse(0, 0, ellipseW);
    pop();
    // ellipse "/"
    push();
    rotateX(radians(80));
    rotateY(-this.theta);
    ellipse(0, 0, ellipseW);
    pop();

    // display indicator (animated)
    // undo rotation
    rotateY(radians(30));
    translate(0, this.movement);
    line(-this.r, this.r / 2, this.r, this.r / 2);
    line(-this.r, -this.r / 2, this.r, -this.r / 2);

    pop();
  }
}

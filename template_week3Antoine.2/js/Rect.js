class Rect {
  constructor(w, h, ctx) {
    (this.x = window.innerWidth / 2),
      (this.y = window.innerHeight / 2),
      (this.w = w);
    this.h = h;
    this.speedX = 0;
    this.speedY = 0;
    //initialisation de la couleur
    this.color = "black";
    //random ID
    this.ID = Math.random() * 10;
    this.ctx = ctx;
    // initiliasation de l'evenement click directement dans le constructeur
    document.addEventListener("click", this.send.bind(this));
    //appel de la fonction send pour chaque object Rect crée | bind permet de récuperer le constructeur Rect plutôt que le constructeur par defaut du EventListener
  }
  move() {
    if( this.x >= window.innerWidth || this.x <= 0){
      this.speedX = -this.speedX;
    }
    if( this.y >= window.innerHeight || this.y <= 0){
      this.speedY= -this.speedY;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }
  show() {
    // console.log("inside show")
    this.ctx.fillStyle = this.color;
    this.ctx.rect(this.x, this.y, this.w, this.h);
    this.ctx.fill();
  }

  send() {
    //   console.log("inside send");
    //envoie d'un message dans la partie COLOR C lors du click
    SEND_MESSAGE("COLOR_C", {
      //couleur random tiré du prof
      color: `rgb(${Math.round(Math.random() * 255)},0,${Math.round(
        Math.random() * 255
      )})`,
      // x: Math.random() * 250,
      // y: Math.random() * 250,
      speedX: Math.random() * (-10 - 10)  +10,
      speedY: Math.random() * (-10 - 10)  +10,
      // l'ID définit le player originaire du click
      id: this.ID
    });
  }
  changeColor(data) {
    //this.ID != data.id permet d'identifier le receveur du changement
    if (this.ID != data.id) {
      this.color = data.color;
      this.speedX = data.speedX;
      this.speedY = data.speedY;
      // this.x = data.x;
      // this.y = data.y;
      // console.log(this.x);
    }
  }
}

console.log("ok");
class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.w = window.innerWidth;
    this.canvas.height = this.h = window.innerHeight;
    this.setup();
  }

  setup() {
    this.rect = new Rect(30, 40, this.ctx);
    // document.addEventListener("click", this.onClick.bind(this));
    this.appHasStarted = false;

    DATABASE.ref("COLOR_C").on("value", snapshot => {
      //appel de la database à chaque chargement de page
      if (!this.appHasStarted) {
        this.rect.changeColor(snapshot.val());
        this.draw();
        this.appHasStarted = true;
      } else {
        //appel uniquement de l'element color dès lors que le rectangle est déjà affiché | peut être pour éviter de reinitialiser la page à chaque fois JE SUIS PAS CERTAINS
        const value = snapshot.val();
        this.rect.changeColor(value);
      }
    });
    // DATABASE.ref("COLOR").on(
    //   "value",
    //   this.onValueChanged.bind(this)
    // );
    // this.draw();
  }
  draw() {
    // this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgb(200,200,200)";
    this.ctx.globalAlpha=0.1;
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    
    this.rect.move();
    this.rect.show();
    ///////////////////////////////////////////
    requestAnimationFrame(this.draw.bind(this));
  }
  //ON UTILISE PLUS LE ONCLICK DANS APP MAIS DIRECTEMENT DANS LA CLASS 
  //TU PEUX SUPPRIMER
  // onClick(e) {
  //   // const data = {
  //   //   color: "blue",
  //   //   id: this.ID
  //   // };
  //   // SEND_MESSAGE("CCAS/COLOR", data);
  // }
}

window.onload = () => {
  new App();
};

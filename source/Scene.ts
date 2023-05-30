// Classe  S c e n e //-----------------------------------------------------------------------------
class Scene extends Sprite {
 //----------------------------------------------------------------------------------------Attributs
 /* Attributs de la scene. */

 public lab_ : Array<Array<number>>;
 public pas_ : number;
 public perso_ : Perso;
 public actionClavier_ : any;
 public chance_ : number;
 public timer_ : number;
 public win_ : boolean;

 // score
 public score_ : Sprite;
 public scoreNb_ : number;
 public scoreAddVals_ : number[];

 // assets
 public murs_ : Array<Array<Sprite>>;
 public pastilles_ : Array<Array<Sprite>>;
 public nbPastille_ : number;
 public items_ : Array<Array<Sprite>>;
 public nbItems_ : number;

 // ennemis
 public mechants_ : Array<Array<Mechant>>;
 public nbMechants_ : number;

 // invincibilité
 public timerInv_ : number;
 public inv_ : string;

 // bg color
 public red_ : number;
 public green_ : number;
 public blue_ : number;
 public addRed_ : boolean;
 public addGreen_ : boolean;
 public addBlue_ : boolean;
 public redVals_ : number[];
 public greenVals_ : number[];
 public blueVals_ : number[];
 public timerColor_ : number;

 // maths var
 public variance_ : number;

 //-------------------------------------------------------------------------------------Constructeur
 public constructor(balise : HTMLElement) {
  super(balise);
  this.setDimension(320,320);
  this.setX((window.innerWidth - this.getLargeur()) / 2);
  this.setY((window.innerHeight - this.getHauteur()) / 2);
  this.chance_ = 0.3;
  // Détermination du nb d'items entre 2 et 5
  this.nbItems_ =  2 + this.uniforme(4);
  // Détermination du nb d'ennemis entre 2 et 3
  this.nbMechants_ = 2 + this.uniforme(2);
  // init data
  this.inv_ = '';
  this.scoreAddVals_ = [];
  //colors
  this.red_ = 0;
  this.green_ = 157;
  this.blue_ = 255;
  this.addRed_ = true;
  this.addGreen_ = true;
  this.addBlue_ = true;
  this.blueVals_ = [];
  this.redVals_ = [];
  this.greenVals_ = [];
  //timer
  this.timer_ = 0;
  // win?
  this.win_ = false;
 }

//----------------------------------------------------------------------------------------- Méthodes
// ~~~~~~~~~~~Lois mathématiques

// bernoulli
public bernoulli(level : number){
  let rand : number = Math.random();
  if(rand < level){
      return true;
  }else{
      return false;
  }
}

// Loi uniforme (continue) : retourne un entier entre 0 et max : determine le nb d'item
public uniforme(max : number){
  return Math.floor(Math.random() * max);
}

// Loi Beta : retourne valeur entre 0 et 1
public loiBeta(a : number, b : number){
  let u = Math.random();
  let v = Math.random();
  while(Math.pow(u, 1/a), Math.pow(v, 1/b) > 1){
    u = Math.random();
    v = Math.random();
  }
  let res = (Math.pow(u, 1/a))/(Math.pow(u, 1/a) + Math.pow(v, 1/b));
  return res;
}

// Loi binomiale
public binomiale(times : number, chances : number, nbToWin : number){
  let count = 0;
  for(let i = 0 ; i < times ; i++){
      if (this.bernoulli(chances)){(count++)};
  }
  if(count >= nbToWin){return true;}else{return false;};
}

// Loi géométrique
public loiGeometrique(p : number) {
  if (p <= 0 || p >= 1) {
    return "Probability (p) must be greater than 0 and less than 1.";
  }
  let count = 1;
  while (this.bernoulli(p)) {
    count++;
  }
  return count;
}

// Loi exponentielle
public loiExpo(lambda : number) {
  return -Math.log(1 - Math.random()) / lambda;
}

// Loi Poisson
public loiPoisson(lambda : number) {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

// ~~~~~~~~~~~ Calculs mathématiques

// Moyenne
public moyenne(valeurs : number[]){
  let somme = 0;
  valeurs.forEach((valeur) => {
    somme += valeur;
  })
  return Math.floor((somme/valeurs.length) * 10)/10;
}

// Variance
public variance(valeurs : number[]){
  let nbElts = valeurs.length;
  if(nbElts > 0){
    let varianceTab : number[] = [];
    let moyenne = this.moyenne(valeurs);
    for(let i = 0 ; i < nbElts ; i++){
      varianceTab.push((valeurs[i] - moyenne)**2);
    }
    return this.moyenne(varianceTab);
  }else{
    return 0;
  }

}

//-----------------------------------------------------------------------------------------demarrer
 public demarrer() {
  document.getElementById("play").style.display = "none";
  document.getElementById("scene").style.display = "block";
  document.getElementById("end-screen").style.display = "none";

  this.startTimer();

  this.lab_ = new Array<Array<number>>();

  // 0 = void | 1 = mur | 2 = pastilles | 3 = items | 8 = pacman | 10 = méchant 
  this.lab_[0] = new Array<number>(1,1,1,1,1,1,1,1,1,1);
  this.lab_[1] = new Array<number>(1,2,8,2,1,1,2,2,10,1);
  this.lab_[2] = new Array<number>(1,2,1,2,2,1,2,1,3,1);
  this.lab_[3] = new Array<number>(1,2,1,2,1,1,3,2,2,1);
  this.lab_[4] = new Array<number>(1,2,1,2,2,2,2,1,2,2);
  this.lab_[5] = new Array<number>(1,2,1,2,1,3,2,1,2,1);
  this.lab_[6] = new Array<number>(1,2,2,2,1,1,2,2,2,1);
  this.lab_[7] = new Array<number>(1,2,1,2,10,1,1,2,1,1);
  this.lab_[8] = new Array<number>(1,3,1,1,2,2,3,10,2,1);
  this.lab_[9] = new Array<number>(1,1,1,1,1,1,1,1,1,1);
  
  //tableau des pastilles
  this.pastilles_ = new Array<Array<Sprite>>();
  this.pastilles_[0] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.pastilles_[1] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.pastilles_[2] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.pastilles_[3] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.pastilles_[4] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.pastilles_[5] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.pastilles_[6] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.pastilles_[7] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.pastilles_[8] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.pastilles_[9] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);

  this.pas_ = 32;
  this.scoreNb_=0;
  this.nbPastille_ = 0;

  //Tableau des méchants pour permettre leur suppression dans arreter()
  this.mechants_ = new Array<Array<Mechant>>();
  this.mechants_[0] = new Array<Mechant>(null,null,null,null,null,null,null,null,null,null);
  this.mechants_[1] = new Array<Mechant>(null,null,null,null,null,null,null,null,null,null);
  this.mechants_[2] = new Array<Mechant>(null,null,null,null,null,null,null,null,null,null);
  this.mechants_[3] = new Array<Mechant>(null,null,null,null,null,null,null,null,null,null);
  this.mechants_[4] = new Array<Mechant>(null,null,null,null,null,null,null,null,null,null);
  this.mechants_[5] = new Array<Mechant>(null,null,null,null,null,null,null,null,null,null);
  this.mechants_[6] = new Array<Mechant>(null,null,null,null,null,null,null,null,null,null);
  this.mechants_[7] = new Array<Mechant>(null,null,null,null,null,null,null,null,null,null);
  this.mechants_[8] = new Array<Mechant>(null,null,null,null,null,null,null,null,null,null);
  this.mechants_[9] = new Array<Mechant>(null,null,null,null,null,null,null,null,null,null);

  //Tableau des murs pour permettre leur suppression dans arreter()
  this.murs_ = new Array<Array<Sprite>>();
  this.murs_[0] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.murs_[1] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.murs_[2] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.murs_[3] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.murs_[4] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.murs_[5] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.murs_[6] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.murs_[7] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.murs_[8] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.murs_[9] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);

  //Tableau des items
  this.items_ = new Array<Array<Sprite>>();
  this.items_[0] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.items_[1] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.items_[2] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.items_[3] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.items_[4] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.items_[5] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.items_[6] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.items_[7] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.items_[8] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);
  this.items_[9] = new Array<Sprite>(null,null,null,null,null,null,null,null,null,null);

  let cptMechant = 0;

  let tempNbItems = this.nbItems_;

  //Parcours du tableau de mise en place
  for(let i : number = 0; i<this.lab_.length;i++){
      for(let j:number = 0;j<this.lab_[i].length;j++){
        
          //Mise en place du mur
          if(this.lab_[i][j]==1){
            let m : Sprite = new Sprite(document.createElement("img"));
            m.setImage("../www/assets/img/brick.png",this.pas_+1,this.pas_+1)
            this.murs_[i][j]=m;
            this.ajouter(m);
            m.setXY(j*this.pas_,i*this.pas_);

          //Mise en place du perso
          }else if(this.lab_[i][j]==8){
            this.perso_ = new Perso(document.createElement("img"), this, i, j);
            this.perso_.setImage("../www/assets/img/perso.png",this.pas_+1,this.pas_+1);
            this.perso_.getBalise().style.zIndex="1";
            this.perso_.setXY(j*this.pas_,i*this.pas_);
            this.ajouter(this.perso_); 

          //Mise en place des pastilles
          }else if(this.lab_[i][j]==2){
            let p : Sprite = new Sprite(document.createElement("img"));
            p.setImage("../www/assets/img/pastille.png",this.pas_+1,this.pas_+1)
            p.setXY(j*this.pas_,i*this.pas_);
            p.getBalise().style.zIndex="0";
            this.ajouter(p);
            this.nbPastille_++;
            this.pastilles_[i][j]=p;

          //Mise en place des items
          }else if(this.lab_[i][j]==3){
            if(this.nbItems_ > 0){
              let w : Sprite = new Sprite(document.createElement("img"));
              w.setImage("../www/assets/img/item.png",this.pas_+1,this.pas_+1)
              w.setXY(j*this.pas_,i*this.pas_);
              this.ajouter(w);
              this.items_[i][j]=w;
              tempNbItems--;
            }
            else if(this.nbItems_ == 0){// pas d'item
              this.lab_[i][j]=0;
              // this.items_[i][j]=null;
            }
          // Mise en place des méchants
          }else if(this.lab_[i][j]==10){
            if(cptMechant < this.nbMechants_){
              cptMechant++;
              let m : Mechant = new Mechant(document.createElement("img"),this,i,j, cptMechant);
              m.setImage("../www/assets/img/mechant.png",this.pas_+1,this.pas_+1)
              m.setXY(j*this.pas_,i*this.pas_);
              m.getBalise().style.zIndex="1";
              this.ajouter(m);
              //ajout dans le tableau méchant
              this.mechants_[i][j]=m;
              //Appel de l'action bouger et tuer 5 fois par seconde et stockage de l'id de l'intervalle
              m.timerBouger_= setInterval(() => {m.bouger();},1000/3);
              m.timerTuer_ = setInterval(() => {m.tuer();},1000/3);
            }else{
              this.lab_[i][j]=0;
            }
          }
      }
  }

  // ~~~~~~~~~~~~~~~~~~~ loops

  // ~~~~~~~~ background color

  // var pour bg color
  let minRed : number;
  let maxRed : number;
  let maxBlue : number;
  let maxGreen : number;

  this.timerColor_ = setInterval(() => {

    // couleur tend vers le rouge moins il reste de pastilles
    if(this.nbPastille_ >= 15){
      minRed = 10;
      maxRed = 150;
      maxBlue = 250;
      maxGreen = 250;
    }else if(this.nbPastille_ < 15 && this.nbPastille_ > 7){
      minRed = 125;
      maxRed = 250;
      maxBlue = 150;
      maxGreen = 150;
    }else if(this.nbPastille_ <= 7){
      minRed = 230;
      maxBlue = 50;
      maxGreen = 50;
    }

    if(this.red_ > maxRed) this.addRed_ = false;
    else if(this.red_ < minRed) this.addRed_ = true;
    if(this.blue_ > maxBlue) this.addBlue_ = false;
    else if(this.blue_ <10) this.addBlue_ = true;
    if(this.green_ > maxGreen) this.addGreen_ = false;
    else if(this.green_ <10) this.addGreen_ = true;

    // valeur R, G, B s'incrémente ou se décremente d'une valeur aléatoire à chaque passage
    if(this.addRed_ == true) this.red_ +=this.loiPoisson(2.5);
    else this.red_ -=this.loiPoisson(2.5);
    if(this.addBlue_ == true) this.blue_ +=this.loiPoisson(2.5) 
    else this.blue_ -=this.loiPoisson(2.5);
    if(this.addGreen_ == true) this.green_ +=this.loiPoisson(2.5);
    else this.green_ -=this.loiPoisson(2.5);

    // sauv des valeurs de couleurs pour données finales
    this.redVals_.push(this.red_);
    this.greenVals_.push(this.green_);
    this.blueVals_.push(this.blue_);

    //création de la couleur rgb et application pour background
    let color = 'rgb(' + this.red_ + ',' + this.green_ + ',' + this.blue_ + ')';
    document.documentElement.style.setProperty('--color', color);
  },500);

  //réactions au touches directionnelles du clavier pour déplacer le personnage

  this.actionClavier_ = (e: KeyboardEvent) => {
    //vérification que perso n'est ni à l'arrivée ni mort
    if(!this.perso_.estArrive() && !this.perso_.mort_){
      //cas flèche gauche
      if(e.key=="ArrowLeft"){
          this.perso_.setImage('../www/assets/img/persog' + this.inv_ + '.png', this.pas_+1,this.pas_+1);
          this.perso_.gauche();  
      }
      //cas flèche droite
      else if(e.key=="ArrowRight"){
        this.perso_.setImage('../www/assets/img/persod' + this.inv_ + '.png', this.pas_+1,this.pas_+1);
        this.perso_.droite();
      }
      //cas flèche haut
      else if(e.key=="ArrowUp"){
        this.perso_.setImage('../www/assets/img/persoh' + this.inv_ + '.png', this.pas_+1,this.pas_+1);
        this.perso_.haut();
      }
      //cas flèche bas
      else if(e.key=="ArrowDown"){
        this.perso_.setImage('../www/assets/img/persob' + this.inv_ + '.png', this.pas_+1,this.pas_+1);
        this.perso_.bas();
      }
    }
    //On regarde si perso est à l'arrivée et a mangé toutes les pastilles
    if(this.perso_.estArrive() && this.nbPastille_==0){
      this.win_ = true;
      this.arreter();
    }else if(this.perso_.estArrive())  {
      if(e.key=="ArrowLeft"){
        this.perso_.setImage('../www/assets/img/persog' + this.inv_ + '.png', this.pas_+1,this.pas_+1);
        this.perso_.gauche();  
      }
    }
  }

  //surveillance de l'évènement appui d'une touche du clavier
  window.addEventListener("keydown",this.actionClavier_);

  //affichage du score
  this.score_ = new Sprite(document.createElement("div"));
  this.score_.getBalise().innerHTML = "Score = "+this.scoreNb_;
  this.score_.getBalise().id="score";
  this.ajouter(this.score_);
  this.score_.setXY(0,-40);

 }

  //-----------------------------------------------------------------------------------------méthodes
  
  public detruirePastille(i: number, j : number){
   this.retirer(this.pastilles_[i][j]);
   this.pastilles_[i][j]=null;
   this.nbPastille_--;
   // score, par pastille = 1 + X (loi expo) / temps de jeu
   let timeParam = 1;
   if(Math.floor(Date.now() - this.timer_) / 1000 >= 1){
    timeParam = Math.floor(Date.now() - this.timer_) / 1000;
   }
   let scoreAdd = this.loiExpo(0.6);
   this.scoreAddVals_.push(scoreAdd);
   this.scoreNb_+= 1 + scoreAdd / timeParam;
   this.scoreNb_ = Math.floor(this.scoreNb_ * 10)/10;
   this.score_.getBalise().innerHTML = "Score = "+this.scoreNb_;
  }

  public detruireItem(i: number, j : number){
    this.retirer(this.items_[i][j]);
    this.items_[i][j]=null;
    this.perso_.invincible(this.loiBeta(6, 12) * 8000 + 2000);
  }

  public startTimer(){
    this.timer_ = Date.now();
  }

  public stopTimer(){
    this.timer_ = Math.floor(Date.now() - this.timer_) / 1000;
  }

 //------------------------------------------------------------------------------------------arreter
 public arreter() {

  this.stopTimer();

  this.retirer(this.score_);
   //suppression des méchants, intervales et pastilles
  for(let i : number = 0; i<this.mechants_.length;i++){
    for(let j : number = 0; j<this.mechants_.length;j++){
      //cas case méchant
      if(this.lab_[i][j]==10){
        //arrêt de l'appel régulier des actions bouger et tuer
        clearInterval(this.mechants_[i][j].timerBouger_);
        clearInterval(this.mechants_[i][j].timerTuer_);
        //suppression du sprite méchant
        this.retirer(this.mechants_[i][j]);
        this.mechants_[i][j]=null;
        //cas case pastille
      }else if (this.lab_[i][j]==2){
        //suppression du sprite pastille
        this.retirer(this.pastilles_[i][j]);
        this.pastilles_[i][j]=null;
      }else if (this.lab_[i][j]==1){
        //suppression du mur
        this.retirer(this.murs_[i][j]);
        this.murs_[i][j]=null;
      }else if (this.lab_[i][j]==3){
        //suppression des items
        this.retirer(this.items_[i][j]);
        this.items_[i][j]=null;
      }
    }
  }

  //suppression du perso
  this.retirer(this.perso_);
  
  // cache scene, affiche bouton play
  document.getElementById("scene").style.display = "none";
  document.getElementById("play").style.display = "block";
  document.getElementById("play").style.top = "80%";

  //suppression de l'event listener 
  window.removeEventListener("keydown",this.actionClavier_);

  //clear intervalle invincible et couleurs background 
  clearInterval(this.timerInv_);
  clearInterval(this.timerColor_);

  // affichage data de fin de partie
  this.endScreen();
 }

 public endScreen(){
  document.getElementById("end-screen").style.display = "block";

  let msg : string;
  if(this.win_) msg = 'Gagné !';
  else msg = 'Perdu';

  // win or lose msg
  document.getElementById("end-msg").innerHTML = msg;

  // end score
  document.getElementById("score-final").innerHTML = this.scoreNb_.toString();

  // timer
  document.getElementById("timer").innerHTML = this.timer_.toString();

  // color
  let redMoy = this.moyenne(this.redVals_);
  let greenMoy = this.moyenne(this.greenVals_);
  let blueMoy = this.moyenne(this.blueVals_);
  let color = 'rgb(' + redMoy + ',' + greenMoy + ',' + blueMoy + ')';
  document.getElementById("col-moy-box").style.backgroundColor = color.toString();
  document.getElementById("col-moy-text").innerHTML = color.toString();

  // variance
  document.getElementById("variance").innerHTML = this.variance(this.scoreAddVals_).toString();

 }


}

// Fin //-------------------------------------------------------------------------------------------

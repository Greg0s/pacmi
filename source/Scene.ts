//==================================================================================================
// ANIMATION AVEC TYPESCRIPT                                                               Scene.ts
//==================================================================================================

// Classe  S c e n e //-----------------------------------------------------------------------------
class Scene extends Sprite {
 //----------------------------------------------------------------------------------------Attributs
 /* Attributs de la scene. */
 public lab_ : Array<Array<number>>;
 public pas_ : number;
 public perso_ : Perso;
 public actionClavier_ : any;
 public pastilles_ : Array<Array<Sprite>>;
 public nbPastille_ : number;
 public score_ : Sprite;
 public mechants_ : Array<Array<Mechant>>;
 public murs_ : Array<Array<Sprite>>;

 //-------------------------------------------------------------------------------------Constructeur
 public constructor(balise : HTMLElement) {
  super(balise);
  this.setDimension(320,320);
  this.setX((window.innerWidth - this.getLargeur()) / 2);
  this.setY((window.innerHeight - this.getHauteur()) / 2);
 }

 //-----------------------------------------------------------------------------------------demarrer
 public demarrer() {
  /* Code qui demarre la scene. */
  //Question 1a - Tableau présentant la future architecture de la carte du jeu
  this.lab_ = new Array<Array<number>>();

  this.lab_[0] = new Array<number>(1,1,1,1,1,1,1,1,1,1);
  this.lab_[1] = new Array<number>(1,2,8,0,1,1,1,2,0,1);
  this.lab_[2] = new Array<number>(1,0,1,0,9,1,1,1,0,1);
  this.lab_[3] = new Array<number>(1,0,1,0,1,1,0,0,0,1);
  this.lab_[4] = new Array<number>(1,0,1,0,0,0,0,1,0,0);
  this.lab_[5] = new Array<number>(1,0,1,0,1,0,0,1,0,1);
  this.lab_[6] = new Array<number>(1,2,0,0,1,1,0,0,0,1);
  this.lab_[7] = new Array<number>(1,0,1,0,0,1,1,0,1,1);
  this.lab_[8] = new Array<number>(1,0,1,1,2,0,0,10,9,1);
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

  //Question 1b
  this.pas_ = 32;
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


  //Parcours du tableau de mise en place
  for(let i : number = 0; i<this.lab_.length;i++){
      for(let j:number = 0;j<this.lab_[i].length;j++){
        
          //Mise en place du mur
          if(this.lab_[i][j]==1){
            let m : Sprite = new Sprite(document.createElement("img"));
            m.setImage("mur.png",this.pas_+1,this.pas_+1)
            this.murs_[i][j]=m;
            this.ajouter(m);
            m.setXY(j*this.pas_,i*this.pas_);

          //Mise en place du perso
          }else if(this.lab_[i][j]==8){
            this.perso_ = new Perso(document.createElement("img"), this, i, j);
            this.perso_.setImage("perso.png",this.pas_,this.pas_);
            this.perso_.getBalise().style.zIndex="1";
            this.perso_.setXY(j*this.pas_,i*this.pas_);
            this.ajouter(this.perso_); 

          //Mise en place des pastilles
          }else if(this.lab_[i][j]==2){
            let p : Sprite = new Sprite(document.createElement("img"));
            p.setImage("pastille.png",this.pas_+1,this.pas_+1)
            p.setXY(j*this.pas_,i*this.pas_);
            p.getBalise().style.zIndex="0";
            this.ajouter(p);
            this.nbPastille_++;
            this.pastilles_[i][j]=p;

          //Mise en place des méchants
          }else if(this.lab_[i][j]==10){
            let m : Mechant = new Mechant(document.createElement("img"),this,i,j);
            m.setImage("mechant.png",this.pas_+1,this.pas_+1)
            m.setXY(j*this.pas_,i*this.pas_);
            this.ajouter(m);
            //ajout dans le tableau méchant
            this.mechants_[i][j]=m;
            //Appel de l'action bouger et tuer 5 fois par seconde et stockage de l'id de l'intervalle
            m.timerBouger_= setInterval(() => {m.bouger();},1000/5);
            m.timerTuer_ = setInterval(() => {m.tuer();},1000/5);
          }
      }
  }

  //réactions au touches directionnelles du clavier pour déplacer le personnage

  this.actionClavier_ = (e: KeyboardEvent) => {
    //vérification que perso n'est ni à l'arrivée ni mort
    if(!this.perso_.estArrive() && !this.perso_.mort_){
      //cas flèche gauche
      if(e.key=="ArrowLeft"){
          this.perso_.setImage('persog.png', this.pas_+1,this.pas_+1);
          this.perso_.gauche();  
      }
      //cas flèche droite
      else if(e.key=="ArrowRight"){
        this.perso_.setImage('persod.png', this.pas_+1,this.pas_+1);
        this.perso_.droite();
      }
      //cas flèche haut
      else if(e.key=="ArrowUp"){
        this.perso_.setImage('persoh.png', this.pas_+1,this.pas_+1);
        this.perso_.haut();
      }
      //cas flèche bas
      else if(e.key=="ArrowDown"){
        this.perso_.setImage('persob.png', this.pas_+1,this.pas_+1);
        this.perso_.bas();
      }
    }
    //On regarde si perso est à l'arrivée et a mangé toutes les pastilles
    if(this.perso_.estArrive() && this.nbPastille_==0){
      this.arreter();
    }  
  }

  //surveillance de l'évènement appui d'une touche du clavier
  window.addEventListener("keydown",this.actionClavier_);


  //affichage du score
  
  this.score_ = new Sprite(document.createElement("div"));
  this.score_.getBalise().innerHTML = "Score = "+this.nbPastille_;
  this.score_.getBalise().id="score";
  this.ajouter(this.score_);
  this.score_.setXY(0,-40);

  
 }

  //-----------------------------------------------------------------------------------------méthodes

  //méthode quand une pastille est mangée
  
  public detruirePastille(i: number, j : number){
   this.retirer(this.pastilles_[i][j]);
   this.pastilles_[i][j]=null;
   this.nbPastille_--;
   this.score_.getBalise().innerHTML = "Score = "+this.nbPastille_;
  }

 //------------------------------------------------------------------------------------------arreter
 //on prend en paramètre les tableau des id d'intervalle et des méchants
 public arreter() {
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
      }
    }
  }

  //suppression du perso
  this.retirer(this.perso_);
  //Message de fin et relance du jeu
  alert("Redémarrer ?");

  //suppression de l'event listener 
  window.removeEventListener("keydown",this.actionClavier_);
  //redémarrage
  this.demarrer();
 }
}

// Fin //-------------------------------------------------------------------------------------------

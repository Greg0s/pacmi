class Mechant extends Perso{

      public timerBouger_ : number;
      public timerTuer_ : number;
      public id_ : number;

    public constructor (balise : HTMLElement, scene : Scene, ligne : number, colonne : number, id : number){
        super(balise, scene, ligne, colonne);
        this.id_ = id;
    }

   //méthode manger héritée de la classe perso
   public manger(){
   }

   public versJoueur(){
         let directionsPossibles : string = this.directionsPossibles();

         if(this.scene_.perso_.colonne_<this.colonne_ && directionsPossibles.includes('g')){
            this.gauche();
            this.setImage("../www/assets/img/mechantg.png", this.scene_.pas_+1, this.scene_.pas_+1)
         }
         else if(this.scene_.perso_.colonne_>this.colonne_  && directionsPossibles.includes('d')){
            this.droite();
            this.setImage("../www/assets/img/mechantd.png", this.scene_.pas_+1, this.scene_.pas_+1)
         }
         else if(this.scene_.perso_.ligne_<this.ligne_  && directionsPossibles.includes('h')){
            this.haut();
            this.setImage("../www/assets/img/mechanth.png", this.scene_.pas_+1, this.scene_.pas_+1)
         }
         else if(this.scene_.perso_.ligne_>this.ligne_  && directionsPossibles.includes('b')){
            this.bas();
            this.setImage("../www/assets/img/mechantb.png", this.scene_.pas_+1, this.scene_.pas_+1)
         }else{
            this.versRandom();
         }
   }

   public directionsPossibles(){
      let directionsPossibles : string = '';
      if(this.scene_.lab_[this.ligne_ + 1][this.colonne_] != 1){
         directionsPossibles += 'b';
      }
      if(this.scene_.lab_[this.ligne_ - 1][this.colonne_] != 1){
         directionsPossibles +='h';
      }
      if(this.scene_.lab_[this.ligne_][this.colonne_ + 1] != 1 && this.colonne_ + 1 < 9){
         directionsPossibles +='d';
      }
      if(this.scene_.lab_[this.ligne_][this.colonne_ - 1] != 1){
         directionsPossibles  +='g';
      }
      return directionsPossibles;
   }

   public versRandom(){
      let directionsPossibles : string = this.directionsPossibles();
      let dir = directionsPossibles[this.scene_.uniforme(directionsPossibles.length)];
      if(dir == 'd'){
         this.setImage("../www/assets/img/mechantd.png", this.scene_.pas_+1, this.scene_.pas_+1)
         this.droite();
      }else if(dir == 'g'){
         this.setImage("../www/assets/img/mechantg.png", this.scene_.pas_+1, this.scene_.pas_+1)
         this.gauche();
      }else if(dir == 'h'){
         this.setImage("../www/assets/img/mechanth.png", this.scene_.pas_+1, this.scene_.pas_+1)
         this.haut();
      }else if(dir == 'b'){
         this.setImage("../www/assets/img/mechantb.png", this.scene_.pas_+1, this.scene_.pas_+1)
         this.bas();
      }
   }

   //méthode de déplacement automatique du méchant avec sélection de la bonne image en fonction du déplacement
   public bouger(){
      let n : number = Math.random();

      //augmentation de la difficulté au fur et à mesure du jeu en fonction du score
      if(this.scene_.scoreNb_>10){
         this.scene_.chance_+=0.05;
      }
     
      //cas où méchant se dirige vers perso
      if(this.scene_.bernoulli(this.scene_.chance_)){
         this.versJoueur();
      }
      else if(this.id_ % 2 == 0){
         if(this.scene_.binomiale(4, 0.17, 1)) this.versJoueur();
         else this.versRandom();
      }else {
         if(this.scene_.loiGeometrique(0.6)) this.versJoueur();
         else this.versRandom();
      }
   }

   // public printArray(ar : string[]){
   //    let res : string;
   //    ar.forEach(element => {
   //       res += '|', element;
   //    });
   //    console.log(res);
   // }

   //méthode pour tuer perso en cas de collision avec méchant
   public tuer(){
      //vérification de la collision entre méchant et perso et si perso n'est pas déjà mort
      if(Sprite.collision(this.getCercle(), this.scene_.perso_.getCercle()) && !this.scene_.perso_.mort_ && !this.scene_.perso_.invincible_){
         this.scene_.perso_.mort_=true;
         this.scene_.arreter();
      }
   }
}
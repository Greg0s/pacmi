class Mechant extends Perso{

      public timerBouger_ : number;
      public timerTuer_ : number;

    public constructor (balise : HTMLElement, scene : Scene, ligne : number, colonne : number){
        super(balise, scene, ligne, colonne);
    }

   public bernouilli(level : number){
      let rand : number = Math.random();
      if(rand < level){
          return true;
      }else{
          return false;
      }
   }

   public binomiale(times : number, chances : number, nbToWin : number){
      let count = 0;
      for(let i = 0 ; i < times ; i++){
          if (this.bernouilli(chances)){(count++)};
      }
      if(count >= nbToWin){return true;}else{return false;};
   }

   public loiBeta(a, b){
      let u = Math.random();
      let v = Math.random();
      while(Math.pow(u, 1/a), Math.pow(v, 1/b) > 1){
         u = Math.random();
         v = Math.random();
      }
      let res = (Math.pow(u, 1/a))/(Math.pow(u, 1/a) + Math.pow(v, 1/b));
      return res;
   }

    //méthode manger héritée de la classe perso
    public manger(){
    }

    //méthode de déplacement automatique du méchant avec sélection de la bonne image en fonction du déplacement
    public bouger(){
        let n : number = Math.random();

         //augmentation de la difficulté au fur et à mesure du jeu en fonction du score
         if(this.scene_.scoreNb_>10){
            this.scene_.chance_+=0.05;
         }
        
        //cas où méchant se dirige vers perso
         if(this.bernouilli(this.scene_.chance_)){
            if(this.scene_.perso_.colonne_<this.colonne_){
               this.gauche();
               this.setImage("mechantg.png", this.scene_.pas_+1, this.scene_.pas_+1)
            }
            else if(this.scene_.perso_.colonne_>this.colonne_){
               this.droite();
               this.setImage("mechantd.png", this.scene_.pas_+1, this.scene_.pas_+1)
            }
            else if(this.scene_.perso_.ligne_<this.ligne_){
               this.haut();
               this.setImage("mechanth.png", this.scene_.pas_+1, this.scene_.pas_+1)
            }
            else if(this.scene_.perso_.ligne_>this.ligne_){
               this.bas();
               this.setImage("mechantb.png", this.scene_.pas_+1, this.scene_.pas_+1)
            }
         }
         //cas où méchant fait déplacement aléatoire
         else if(n<0.7){
            this.setImage("mechantg.png", this.scene_.pas_+1, this.scene_.pas_+1)
            this.gauche();
         }
         else if(n<0.8){
            this.setImage("mechantd.png", this.scene_.pas_+1, this.scene_.pas_+1)
            this.droite();
         }
         else if(n<0.9){
            this.setImage("mechanth.png", this.scene_.pas_+1, this.scene_.pas_+1)
            this.haut();
         }
         else if(n<1){
            this.setImage("mechantb.png", this.scene_.pas_+1, this.scene_.pas_+1)
            this.bas();
         }
    }

    //méthode pour tuer perso en cas de collision avec méchant
    public tuer(){
        //vérification de la collision entre méchant et perso et si perso n'est pas déjà mort
        if(Sprite.collision(this.getCercle(), this.scene_.perso_.getCercle()) && !this.scene_.perso_.mort_){
            this.scene_.perso_.mort_=true;
            console.log("mechant.ts");
            this.scene_.arreter();
        }
    }
}
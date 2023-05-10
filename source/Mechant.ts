class Mechant extends Perso{

      public timerBouger_ : number;
      public timerTuer_ : number;

    public constructor (balise : HTMLElement, scene : Scene, ligne : number, colonne : number){
        super(balise, scene, ligne, colonne);
    }

    //méthode manger héritée de la classe perso
    public manger(){
    }

    //méthode de déplacement automatique du méchant avec sélection de la bonne image en fonction du déplacement
    public bouger(){
        let n : number = Math.random();
        //cas 1/3 du temps où méchant se dirige vers perso
         if(n<0.3){
            if(this.scene_.perso_.colonne_<this.colonne_){
               this.gauche();
               this.setImage("mechantg.png", this.scene_.pas_+1, this.scene_.pas_+1)
            }
            else if(this.scene_.perso_.colonne_>this.colonne_){
               this.droite();
               this.setImage("mechantd.png", this.scene_.pas_+1, this.scene_.pas_+1)
            }
         }
         //reste du temps où méchant fait déplacement aléatoire
         
         else if(n<0.6){
            if(this.scene_.perso_.ligne_<this.ligne_){
               this.haut();
               this.setImage("mechanth.png", this.scene_.pas_+1, this.scene_.pas_+1)
            }
            else if(this.scene_.perso_.ligne_>this.ligne_){
               this.bas();
               this.setImage("mechantb.png", this.scene_.pas_+1, this.scene_.pas_+1)
            }
         }
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
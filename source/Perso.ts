class Perso extends Sprite {

    public scene_ : Scene;
    public ligne_ : number;
    public colonne_ : number;
    public mort_ : boolean;
    public invincible_ : boolean;

    public constructor(balise : HTMLElement, scene : Scene, ligne : number, colonne : number){
        super(balise);
        this.scene_= scene;
        this.ligne_ = ligne;
        this.colonne_ = colonne;
        this.mort_ = false;
        this.invincible_ = false;
    }


    //méthode des déplacements possibles par perso
    //appel systématique de la méthode manger

    public gauche(){
        if(this.scene_.lab_[this.ligne_][this.colonne_-1]!=1){
            //this.scene_.lab_[this.ligne_][this.colonne_] = 0;
            //this.scene_.lab_[this.ligne_][this.colonne_-1] = 8;
            this.colonne_ -= 1;
            this.setX(this.getX()-this.scene_.pas_);
        }
        this.manger();
    }

    public droite(){
        if(this.scene_.lab_[this.ligne_][this.colonne_+1]!=1){
            this.colonne_ += 1;
            this.setX(this.getX()+this.scene_.pas_);
        }
        this.manger();
    }

    public haut(){
        if(this.scene_.lab_[this.ligne_-1][this.colonne_]!=1){
            this.ligne_ -= 1;
            this.setY(this.getY()-this.scene_.pas_);
        }
        this.manger();
    }

    public bas(){
        if(this.scene_.lab_[this.ligne_+1][this.colonne_]!=1){
            this.ligne_ += 1;
            this.setY(this.getY()+this.scene_.pas_);
        }
        this.manger();
    }


    //regarde si perso est à l'arrivée
    public estArrive() : boolean{
        return (this.ligne_==4 && this.colonne_==9);
    }

    //mange pastille ou item s'il y en a
    
    public manger(){
        if(this.scene_.pastilles_[this.ligne_][this.colonne_] != null){
            this.scene_.detruirePastille(this.ligne_, this.colonne_);
        }
        if(this.scene_.items_[this.ligne_][this.colonne_] != null){
            this.scene_.detruireItem(this.ligne_, this.colonne_);
        }
    }

    public invincible(duree : number){
        this.invincible_ = true;
        setTimeout(() => {this.invincible_ = false;}, duree);
    }
    
}
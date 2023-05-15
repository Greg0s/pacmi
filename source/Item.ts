class Item extends Sprite {

    public scene_ : Scene;
    public ligne_ : number;
    public colonne_ : number;
    public used_ : boolean;

    public constructor(balise : HTMLElement, scene : Scene, ligne : number, colonne : number){
        super(balise);
        this.scene_= scene;
        this.ligne_ = ligne;
        this.colonne_ = colonne;
        this.used_=true;
    }
    
}
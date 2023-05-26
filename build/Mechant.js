"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Mechant = (function (_super) {
    __extends(Mechant, _super);
    function Mechant(balise, scene, ligne, colonne) {
        return _super.call(this, balise, scene, ligne, colonne) || this;
    }
    Mechant.prototype.manger = function () {
    };
    Mechant.prototype.bouger = function () {
        var n = Math.random();
        if (n < 0.3) {
            if (this.scene_.perso_.colonne_ < this.colonne_) {
                this.gauche();
                this.setImage("mechantg.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
            }
            else if (this.scene_.perso_.colonne_ > this.colonne_) {
                this.droite();
                this.setImage("mechantd.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
            }
        }
        else if (n < 0.6) {
            if (this.scene_.perso_.ligne_ < this.ligne_) {
                this.haut();
                this.setImage("mechanth.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
            }
            else if (this.scene_.perso_.ligne_ > this.ligne_) {
                this.bas();
                this.setImage("mechantb.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
            }
        }
        else if (n < 0.7) {
            this.setImage("mechantg.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
            this.gauche();
        }
        else if (n < 0.8) {
            this.setImage("mechantd.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
            this.droite();
        }
        else if (n < 0.9) {
            this.setImage("mechanth.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
            this.haut();
        }
        else if (n < 1) {
            this.setImage("mechantb.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
            this.bas();
        }
    };
    Mechant.prototype.tuer = function () {
        if (Sprite.collision(this.getCercle(), this.scene_.perso_.getCercle()) && !this.scene_.perso_.mort_) {
            this.scene_.perso_.mort_ = true;
            console.log("mechant.ts");
            this.scene_.arreter();
        }
    };
    return Mechant;
}(Perso));

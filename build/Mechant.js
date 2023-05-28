"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Mechant = (function (_super) {
    __extends(Mechant, _super);
    function Mechant(balise, scene, ligne, colonne, id) {
        var _this = _super.call(this, balise, scene, ligne, colonne) || this;
        _this.id_ = id;
        return _this;
    }
    Mechant.prototype.manger = function () {
    };
    Mechant.prototype.versJoueur = function () {
        var directionsPossibles = this.directionsPossibles();
        if (this.scene_.perso_.colonne_ < this.colonne_ && directionsPossibles.includes('g')) {
            this.gauche();
            this.setImage("../www/assets/img/mechantg.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
        }
        else if (this.scene_.perso_.colonne_ > this.colonne_ && directionsPossibles.includes('d')) {
            this.droite();
            this.setImage("../www/assets/img/mechantd.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
        }
        else if (this.scene_.perso_.ligne_ < this.ligne_ && directionsPossibles.includes('h')) {
            this.haut();
            this.setImage("../www/assets/img/mechanth.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
        }
        else if (this.scene_.perso_.ligne_ > this.ligne_ && directionsPossibles.includes('b')) {
            this.bas();
            this.setImage("../www/assets/img/mechantb.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
        }
        else {
            this.versRandom();
        }
    };
    Mechant.prototype.directionsPossibles = function () {
        var directionsPossibles = '';
        if (this.scene_.lab_[this.ligne_ + 1][this.colonne_] != 1) {
            directionsPossibles += 'b';
        }
        if (this.scene_.lab_[this.ligne_ - 1][this.colonne_] != 1) {
            directionsPossibles += 'h';
        }
        if (this.scene_.lab_[this.ligne_][this.colonne_ + 1] != 1 && this.colonne_ + 1 < 9) {
            directionsPossibles += 'd';
        }
        if (this.scene_.lab_[this.ligne_][this.colonne_ - 1] != 1) {
            directionsPossibles += 'g';
        }
        return directionsPossibles;
    };
    Mechant.prototype.versRandom = function () {
        var directionsPossibles = this.directionsPossibles();
        var dir = directionsPossibles[this.scene_.uniforme(directionsPossibles.length)];
        if (dir == 'd') {
            this.setImage("../www/assets/img/mechantd.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
            this.droite();
        }
        else if (dir == 'g') {
            this.setImage("../www/assets/img/mechantg.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
            this.gauche();
        }
        else if (dir == 'h') {
            this.setImage("../www/assets/img/mechanth.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
            this.haut();
        }
        else if (dir == 'b') {
            this.setImage("../www/assets/img/mechantb.png", this.scene_.pas_ + 1, this.scene_.pas_ + 1);
            this.bas();
        }
    };
    Mechant.prototype.bouger = function () {
        var n = Math.random();
        if (this.scene_.scoreNb_ > 10) {
            this.scene_.chance_ += 0.05;
        }
        if (this.scene_.bernoulli(this.scene_.chance_)) {
            this.versJoueur();
        }
        else if (this.id_ % 2 == 0) {
            if (this.scene_.binomiale(4, 0.17, 1))
                this.versJoueur();
            else
                this.versRandom();
        }
        else {
            if (this.scene_.loiGeometrique(0.6))
                this.versJoueur();
            else
                this.versRandom();
        }
    };
    Mechant.prototype.tuer = function () {
        if (Sprite.collision(this.getCercle(), this.scene_.perso_.getCercle()) && !this.scene_.perso_.mort_ && !this.scene_.perso_.invincible_) {
            this.scene_.perso_.mort_ = true;
            this.scene_.arreter();
        }
    };
    return Mechant;
}(Perso));

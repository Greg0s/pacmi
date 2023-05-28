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
var Perso = (function (_super) {
    __extends(Perso, _super);
    function Perso(balise, scene, ligne, colonne) {
        var _this = _super.call(this, balise) || this;
        _this.scene_ = scene;
        _this.ligne_ = ligne;
        _this.colonne_ = colonne;
        _this.mort_ = false;
        _this.invincible_ = false;
        return _this;
    }
    Perso.prototype.gauche = function () {
        if (this.scene_.lab_[this.ligne_][this.colonne_ - 1] != 1) {
            this.colonne_ -= 1;
            this.setX(this.getX() - this.scene_.pas_);
        }
        this.manger();
    };
    Perso.prototype.droite = function () {
        if (this.scene_.lab_[this.ligne_][this.colonne_ + 1] != 1) {
            this.colonne_ += 1;
            this.setX(this.getX() + this.scene_.pas_);
        }
        this.manger();
    };
    Perso.prototype.haut = function () {
        if (this.scene_.lab_[this.ligne_ - 1][this.colonne_] != 1) {
            this.ligne_ -= 1;
            this.setY(this.getY() - this.scene_.pas_);
        }
        this.manger();
    };
    Perso.prototype.bas = function () {
        if (this.scene_.lab_[this.ligne_ + 1][this.colonne_] != 1) {
            this.ligne_ += 1;
            this.setY(this.getY() + this.scene_.pas_);
        }
        this.manger();
    };
    Perso.prototype.estArrive = function () {
        return (this.ligne_ == 4 && this.colonne_ == 9);
    };
    Perso.prototype.manger = function () {
        if (this.scene_.pastilles_[this.ligne_][this.colonne_] != null) {
            this.scene_.detruirePastille(this.ligne_, this.colonne_);
        }
        if (this.scene_.items_[this.ligne_][this.colonne_] != null) {
            this.scene_.detruireItem(this.ligne_, this.colonne_);
        }
    };
    Perso.prototype.invincible = function (duree) {
        var _this = this;
        this.invincible_ = true;
        setTimeout(function () { _this.invincible_ = false; }, duree);
    };
    return Perso;
}(Sprite));

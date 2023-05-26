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
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(balise) {
        var _this = _super.call(this, balise) || this;
        _this.setDimension(320, 320);
        _this.setX((window.innerWidth - _this.getLargeur()) / 2);
        _this.setY((window.innerHeight - _this.getHauteur()) / 2);
        return _this;
    }
    Scene.prototype.demarrer = function () {
        var _this = this;
        this.lab_ = new Array();
        this.lab_[0] = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        this.lab_[1] = new Array(1, 2, 8, 0, 1, 1, 1, 2, 0, 1);
        this.lab_[2] = new Array(1, 0, 1, 0, 9, 1, 1, 1, 0, 1);
        this.lab_[3] = new Array(1, 0, 1, 0, 1, 1, 0, 0, 0, 1);
        this.lab_[4] = new Array(1, 0, 1, 0, 0, 0, 0, 1, 0, 0);
        this.lab_[5] = new Array(1, 0, 1, 0, 1, 0, 0, 1, 0, 1);
        this.lab_[6] = new Array(1, 2, 0, 0, 1, 1, 0, 0, 0, 1);
        this.lab_[7] = new Array(1, 0, 1, 0, 0, 1, 1, 0, 1, 1);
        this.lab_[8] = new Array(1, 0, 1, 1, 2, 0, 0, 10, 9, 1);
        this.lab_[9] = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        this.pastilles_ = new Array();
        this.pastilles_[0] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.pastilles_[1] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.pastilles_[2] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.pastilles_[3] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.pastilles_[4] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.pastilles_[5] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.pastilles_[6] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.pastilles_[7] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.pastilles_[8] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.pastilles_[9] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.pas_ = 32;
        this.nbPastille_ = 0;
        this.mechants_ = new Array();
        this.mechants_[0] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.mechants_[1] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.mechants_[2] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.mechants_[3] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.mechants_[4] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.mechants_[5] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.mechants_[6] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.mechants_[7] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.mechants_[8] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.mechants_[9] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.murs_ = new Array();
        this.murs_[0] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.murs_[1] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.murs_[2] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.murs_[3] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.murs_[4] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.murs_[5] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.murs_[6] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.murs_[7] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.murs_[8] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.murs_[9] = new Array(null, null, null, null, null, null, null, null, null, null);
        for (var i = 0; i < this.lab_.length; i++) {
            var _loop_1 = function (j) {
                if (this_1.lab_[i][j] == 1) {
                    var m = new Sprite(document.createElement("img"));
                    m.setImage("mur.png", this_1.pas_ + 1, this_1.pas_ + 1);
                    this_1.murs_[i][j] = m;
                    this_1.ajouter(m);
                    m.setXY(j * this_1.pas_, i * this_1.pas_);
                }
                else if (this_1.lab_[i][j] == 8) {
                    this_1.perso_ = new Perso(document.createElement("img"), this_1, i, j);
                    this_1.perso_.setImage("perso.png", this_1.pas_, this_1.pas_);
                    this_1.perso_.getBalise().style.zIndex = "1";
                    this_1.perso_.setXY(j * this_1.pas_, i * this_1.pas_);
                    this_1.ajouter(this_1.perso_);
                }
                else if (this_1.lab_[i][j] == 2) {
                    var p = new Sprite(document.createElement("img"));
                    p.setImage("pastille.png", this_1.pas_ + 1, this_1.pas_ + 1);
                    p.setXY(j * this_1.pas_, i * this_1.pas_);
                    p.getBalise().style.zIndex = "0";
                    this_1.ajouter(p);
                    this_1.nbPastille_++;
                    this_1.pastilles_[i][j] = p;
                }
                else if (this_1.lab_[i][j] == 10) {
                    var m_1 = new Mechant(document.createElement("img"), this_1, i, j);
                    m_1.setImage("mechant.png", this_1.pas_ + 1, this_1.pas_ + 1);
                    m_1.setXY(j * this_1.pas_, i * this_1.pas_);
                    this_1.ajouter(m_1);
                    this_1.mechants_[i][j] = m_1;
                    m_1.timerBouger_ = setInterval(function () { m_1.bouger(); }, 1000 / 5);
                    m_1.timerTuer_ = setInterval(function () { m_1.tuer(); }, 1000 / 5);
                }
            };
            var this_1 = this;
            for (var j = 0; j < this.lab_[i].length; j++) {
                _loop_1(j);
            }
        }
        this.actionClavier_ = function (e) {
            if (!_this.perso_.estArrive() && !_this.perso_.mort_) {
                if (e.key == "ArrowLeft") {
                    _this.perso_.setImage('persog.png', _this.pas_ + 1, _this.pas_ + 1);
                    _this.perso_.gauche();
                }
                else if (e.key == "ArrowRight") {
                    _this.perso_.setImage('persod.png', _this.pas_ + 1, _this.pas_ + 1);
                    _this.perso_.droite();
                }
                else if (e.key == "ArrowUp") {
                    _this.perso_.setImage('persoh.png', _this.pas_ + 1, _this.pas_ + 1);
                    _this.perso_.haut();
                }
                else if (e.key == "ArrowDown") {
                    _this.perso_.setImage('persob.png', _this.pas_ + 1, _this.pas_ + 1);
                    _this.perso_.bas();
                }
            }
            if (_this.perso_.estArrive() && _this.nbPastille_ == 0) {
                _this.arreter();
            }
        };
        window.addEventListener("keydown", this.actionClavier_);
        this.score_ = new Sprite(document.createElement("div"));
        this.score_.getBalise().innerHTML = "Score = " + this.nbPastille_;
        this.score_.getBalise().id = "score";
        this.ajouter(this.score_);
        this.score_.setXY(0, -40);
    };
    Scene.prototype.detruirePastille = function (i, j) {
        this.retirer(this.pastilles_[i][j]);
        this.pastilles_[i][j] = null;
        this.nbPastille_--;
        this.score_.getBalise().innerHTML = "Score = " + this.nbPastille_;
    };
    Scene.prototype.arreter = function () {
        for (var i = 0; i < this.mechants_.length; i++) {
            for (var j = 0; j < this.mechants_.length; j++) {
                if (this.lab_[i][j] == 10) {
                    clearInterval(this.mechants_[i][j].timerBouger_);
                    clearInterval(this.mechants_[i][j].timerTuer_);
                    this.retirer(this.mechants_[i][j]);
                    this.mechants_[i][j] = null;
                }
                else if (this.lab_[i][j] == 2) {
                    this.retirer(this.pastilles_[i][j]);
                    this.pastilles_[i][j] = null;
                }
                else if (this.lab_[i][j] == 1) {
                    this.retirer(this.murs_[i][j]);
                    this.murs_[i][j] = null;
                }
            }
        }
        this.retirer(this.perso_);
        alert("Redémarrer ?");
        window.removeEventListener("keydown", this.actionClavier_);
        this.demarrer();
    };
    return Scene;
}(Sprite));

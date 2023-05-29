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
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(balise) {
        var _this = _super.call(this, balise) || this;
        _this.setDimension(320, 320);
        _this.setX((window.innerWidth - _this.getLargeur()) / 2);
        _this.setY((window.innerHeight - _this.getHauteur()) / 2);
        _this.chance_ = 0.3;
        _this.nbItems_ = 2 + _this.uniforme(4);
        _this.nbMechants_ = 2 + _this.uniforme(2);
        _this.inv_ = '';
        _this.scoreAddVals_ = [];
        _this.red_ = 0;
        _this.green_ = 157;
        _this.blue_ = 255;
        _this.addRed_ = true;
        _this.addGreen_ = true;
        _this.addBlue_ = true;
        _this.blueVals_ = [];
        _this.redVals_ = [];
        _this.greenVals_ = [];
        _this.timer_ = 0;
        _this.win_ = false;
        return _this;
    }
    Scene.prototype.bernoulli = function (level) {
        var rand = Math.random();
        if (rand < level) {
            return true;
        }
        else {
            return false;
        }
    };
    Scene.prototype.uniforme = function (max) {
        return Math.floor(Math.random() * max);
    };
    Scene.prototype.loiBeta = function (a, b) {
        var u = Math.random();
        var v = Math.random();
        while (Math.pow(u, 1 / a), Math.pow(v, 1 / b) > 1) {
            u = Math.random();
            v = Math.random();
        }
        var res = (Math.pow(u, 1 / a)) / (Math.pow(u, 1 / a) + Math.pow(v, 1 / b));
        return res;
    };
    Scene.prototype.binomiale = function (times, chances, nbToWin) {
        var count = 0;
        for (var i = 0; i < times; i++) {
            if (this.bernoulli(chances)) {
                (count++);
            }
            ;
        }
        if (count >= nbToWin) {
            return true;
        }
        else {
            return false;
        }
        ;
    };
    Scene.prototype.loiGeometrique = function (p) {
        if (p <= 0 || p >= 1) {
            return "Probability (p) must be greater than 0 and less than 1.";
        }
        var count = 1;
        while (this.bernoulli(p)) {
            count++;
        }
        return count;
    };
    Scene.prototype.loiExpo = function (lambda) {
        return -Math.log(1 - Math.random()) / lambda;
    };
    Scene.prototype.loiPoisson = function (lambda) {
        var L = Math.exp(-lambda);
        var k = 0;
        var p = 1;
        do {
            k++;
            p *= Math.random();
        } while (p > L);
        return k - 1;
    };
    Scene.prototype.moyenne = function (valeurs) {
        var somme = 0;
        valeurs.forEach(function (valeur) {
            somme += valeur;
        });
        return Math.floor((somme / valeurs.length) * 10) / 10;
    };
    Scene.prototype.variance = function (valeurs) {
        var nbElts = valeurs.length;
        if (nbElts > 0) {
            var varianceTab = [];
            var moyenne = this.moyenne(valeurs);
            for (var i = 0; i < nbElts; i++) {
                varianceTab.push(Math.pow((valeurs[i] - moyenne), 2));
            }
            return this.moyenne(varianceTab);
        }
        else {
            return 0;
        }
    };
    Scene.prototype.demarrer = function () {
        var _this = this;
        document.getElementById("play").style.display = "none";
        document.getElementById("scene").style.display = "block";
        document.getElementById("end-screen").style.display = "none";
        this.startTimer();
        this.lab_ = new Array();
        this.lab_[0] = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        this.lab_[1] = new Array(1, 2, 8, 2, 1, 1, 2, 2, 10, 1);
        this.lab_[2] = new Array(1, 2, 1, 2, 2, 1, 2, 1, 3, 1);
        this.lab_[3] = new Array(1, 2, 1, 2, 1, 1, 3, 2, 2, 1);
        this.lab_[4] = new Array(1, 2, 1, 2, 2, 2, 2, 1, 2, 2);
        this.lab_[5] = new Array(1, 2, 1, 2, 1, 3, 2, 1, 2, 1);
        this.lab_[6] = new Array(1, 2, 2, 2, 1, 1, 2, 2, 2, 1);
        this.lab_[7] = new Array(1, 2, 1, 2, 10, 1, 1, 2, 1, 1);
        this.lab_[8] = new Array(1, 3, 1, 1, 2, 2, 3, 10, 2, 1);
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
        this.scoreNb_ = 0;
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
        this.items_ = new Array();
        this.items_[0] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.items_[1] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.items_[2] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.items_[3] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.items_[4] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.items_[5] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.items_[6] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.items_[7] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.items_[8] = new Array(null, null, null, null, null, null, null, null, null, null);
        this.items_[9] = new Array(null, null, null, null, null, null, null, null, null, null);
        var cptMechant = 0;
        var tempNbItems = this.nbItems_;
        for (var i = 0; i < this.lab_.length; i++) {
            var _loop_1 = function (j) {
                if (this_1.lab_[i][j] == 1) {
                    var m = new Sprite(document.createElement("img"));
                    m.setImage("../www/assets/img/brick.png", this_1.pas_ + 1, this_1.pas_ + 1);
                    this_1.murs_[i][j] = m;
                    this_1.ajouter(m);
                    m.setXY(j * this_1.pas_, i * this_1.pas_);
                }
                else if (this_1.lab_[i][j] == 8) {
                    this_1.perso_ = new Perso(document.createElement("img"), this_1, i, j);
                    this_1.perso_.setImage("../www/assets/img/perso.png", this_1.pas_ + 1, this_1.pas_ + 1);
                    this_1.perso_.getBalise().style.zIndex = "1";
                    this_1.perso_.setXY(j * this_1.pas_, i * this_1.pas_);
                    this_1.ajouter(this_1.perso_);
                }
                else if (this_1.lab_[i][j] == 2) {
                    var p = new Sprite(document.createElement("img"));
                    p.setImage("../www/assets/img/pastille.png", this_1.pas_ + 1, this_1.pas_ + 1);
                    p.setXY(j * this_1.pas_, i * this_1.pas_);
                    p.getBalise().style.zIndex = "0";
                    this_1.ajouter(p);
                    this_1.nbPastille_++;
                    this_1.pastilles_[i][j] = p;
                }
                else if (this_1.lab_[i][j] == 3) {
                    if (this_1.nbItems_ > 0) {
                        var w = new Sprite(document.createElement("img"));
                        w.setImage("../www/assets/img/item.png", this_1.pas_ + 1, this_1.pas_ + 1);
                        w.setXY(j * this_1.pas_, i * this_1.pas_);
                        this_1.ajouter(w);
                        this_1.items_[i][j] = w;
                        tempNbItems--;
                    }
                    else if (this_1.nbItems_ == 0) {
                        this_1.lab_[i][j] = 0;
                    }
                }
                else if (this_1.lab_[i][j] == 10) {
                    if (cptMechant < this_1.nbMechants_) {
                        cptMechant++;
                        var m_1 = new Mechant(document.createElement("img"), this_1, i, j, cptMechant);
                        m_1.setImage("../www/assets/img/mechant.png", this_1.pas_ + 1, this_1.pas_ + 1);
                        m_1.setXY(j * this_1.pas_, i * this_1.pas_);
                        m_1.getBalise().style.zIndex = "1";
                        this_1.ajouter(m_1);
                        this_1.mechants_[i][j] = m_1;
                        m_1.timerBouger_ = setInterval(function () { m_1.bouger(); }, 1000 / 3);
                        m_1.timerTuer_ = setInterval(function () { m_1.tuer(); }, 1000 / 3);
                    }
                    else {
                        this_1.lab_[i][j] = 0;
                    }
                }
            };
            var this_1 = this;
            for (var j = 0; j < this.lab_[i].length; j++) {
                _loop_1(j);
            }
        }
        this.timerInv_ = setInterval(function () {
            if (_this.perso_.invincible_ == true) {
                _this.inv_ = 'i';
            }
        }, 1000 / 5);
        var minRed;
        var maxRed;
        var maxBlue;
        var maxGreen;
        this.timerColor_ = setInterval(function () {
            if (_this.nbPastille_ >= 15) {
                minRed = 10;
                maxRed = 150;
                maxBlue = 250;
                maxGreen = 250;
            }
            else if (_this.nbPastille_ < 15 && _this.nbPastille_ > 7) {
                minRed = 125;
                maxRed = 250;
                maxBlue = 150;
                maxGreen = 150;
            }
            else if (_this.nbPastille_ <= 7) {
                minRed = 230;
                maxBlue = 50;
                maxGreen = 50;
            }
            if (_this.red_ > maxRed)
                _this.addRed_ = false;
            else if (_this.red_ < minRed)
                _this.addRed_ = true;
            if (_this.blue_ > maxBlue)
                _this.addBlue_ = false;
            else if (_this.blue_ < 10)
                _this.addBlue_ = true;
            if (_this.green_ > maxGreen)
                _this.addGreen_ = false;
            else if (_this.green_ < 10)
                _this.addGreen_ = true;
            if (_this.addRed_ == true)
                _this.red_ += _this.loiPoisson(2.5);
            else
                _this.red_ -= _this.loiPoisson(2.5);
            if (_this.addBlue_ == true)
                _this.blue_ += _this.loiPoisson(2.5);
            else
                _this.blue_ -= _this.loiPoisson(2.5);
            if (_this.addGreen_ == true)
                _this.green_ += _this.loiPoisson(2.5);
            else
                _this.green_ -= _this.loiPoisson(2.5);
            _this.redVals_.push(_this.red_);
            _this.greenVals_.push(_this.green_);
            _this.blueVals_.push(_this.blue_);
            var color = 'rgb(' + _this.red_ + ',' + _this.green_ + ',' + _this.blue_ + ')';
            document.documentElement.style.setProperty('--color', color);
        }, 500);
        this.actionClavier_ = function (e) {
            if (!_this.perso_.estArrive() && !_this.perso_.mort_) {
                if (e.key == "ArrowLeft") {
                    _this.perso_.setImage('../www/assets/img/persog' + _this.inv_ + '.png', _this.pas_ + 1, _this.pas_ + 1);
                    _this.perso_.gauche();
                }
                else if (e.key == "ArrowRight") {
                    _this.perso_.setImage('../www/assets/img/persod' + _this.inv_ + '.png', _this.pas_ + 1, _this.pas_ + 1);
                    _this.perso_.droite();
                }
                else if (e.key == "ArrowUp") {
                    _this.perso_.setImage('../www/assets/img/persoh' + _this.inv_ + '.png', _this.pas_ + 1, _this.pas_ + 1);
                    _this.perso_.haut();
                }
                else if (e.key == "ArrowDown") {
                    _this.perso_.setImage('../www/assets/img/persob' + _this.inv_ + '.png', _this.pas_ + 1, _this.pas_ + 1);
                    _this.perso_.bas();
                }
            }
            if (_this.perso_.estArrive() && _this.nbPastille_ == 0) {
                _this.win_ = true;
                _this.arreter();
            }
            else if (_this.perso_.estArrive()) {
                if (e.key == "ArrowLeft") {
                    _this.perso_.setImage('../www/assets/img/persog' + _this.inv_ + '.png', _this.pas_ + 1, _this.pas_ + 1);
                    _this.perso_.gauche();
                }
            }
        };
        window.addEventListener("keydown", this.actionClavier_);
        this.score_ = new Sprite(document.createElement("div"));
        this.score_.getBalise().innerHTML = "Score = " + this.scoreNb_;
        this.score_.getBalise().id = "score";
        this.ajouter(this.score_);
        this.score_.setXY(0, -40);
    };
    Scene.prototype.detruirePastille = function (i, j) {
        this.retirer(this.pastilles_[i][j]);
        this.pastilles_[i][j] = null;
        this.nbPastille_--;
        var timeParam = 1;
        if (Math.floor(Date.now() - this.timer_) / 1000 >= 1) {
            timeParam = Math.floor(Date.now() - this.timer_) / 1000;
        }
        var scoreAdd = this.loiExpo(0.4);
        this.scoreAddVals_.push(scoreAdd);
        this.scoreNb_ += 1 + scoreAdd / timeParam;
        this.scoreNb_ = Math.floor(this.scoreNb_ * 10) / 10;
        this.score_.getBalise().innerHTML = "Score = " + this.scoreNb_;
    };
    Scene.prototype.detruireItem = function (i, j) {
        this.retirer(this.items_[i][j]);
        this.items_[i][j] = null;
        this.perso_.invincible(this.loiBeta(6, 12) * 8000 + 2000);
    };
    Scene.prototype.startTimer = function () {
        this.timer_ = Date.now();
    };
    Scene.prototype.stopTimer = function () {
        this.timer_ = Math.floor(Date.now() - this.timer_) / 1000;
    };
    Scene.prototype.arreter = function () {
        this.stopTimer();
        this.retirer(this.score_);
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
                else if (this.lab_[i][j] == 3) {
                    this.retirer(this.items_[i][j]);
                    this.items_[i][j] = null;
                }
            }
        }
        this.retirer(this.perso_);
        document.getElementById("scene").style.display = "none";
        document.getElementById("play").style.display = "block";
        document.getElementById("play").style.top = "80%";
        window.removeEventListener("keydown", this.actionClavier_);
        clearInterval(this.timerInv_);
        clearInterval(this.timerColor_);
        this.endScreen();
    };
    Scene.prototype.endScreen = function () {
        document.getElementById("end-screen").style.display = "block";
        var msg;
        if (this.win_)
            msg = 'Gagné !';
        else
            msg = 'Perdu';
        document.getElementById("end-msg").innerHTML = msg;
        document.getElementById("score-final").innerHTML = this.scoreNb_.toString();
        document.getElementById("timer").innerHTML = this.timer_.toString();
        var redMoy = this.moyenne(this.redVals_);
        var greenMoy = this.moyenne(this.greenVals_);
        var blueMoy = this.moyenne(this.blueVals_);
        var color = 'rgb(' + redMoy + ',' + greenMoy + ',' + blueMoy + ')';
        document.getElementById("col-moy-box").style.backgroundColor = color.toString();
        document.getElementById("col-moy-text").innerHTML = color.toString();
        document.getElementById("variance").innerHTML = this.variance(this.scoreAddVals_).toString();
    };
    return Scene;
}(Sprite));

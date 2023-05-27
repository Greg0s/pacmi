"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lois = {
    bernouilli: function (level) {
        var rand = Math.random();
        if (rand < level) {
            return true;
        }
        else {
            return false;
        }
    },
    uniforme: function (max) {
        return Math.floor(Math.random() * max);
    },
    binomiale: function (times, chances, nbToWin) {
        var count = 0;
        for (var i = 0; i < times; i++) {
            if (lois.bernouilli(chances)) {
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
    },
    loiBeta: function (a, b) {
        var u = Math.random();
        var v = Math.random();
        while (Math.pow(u, 1 / a), Math.pow(v, 1 / b) > 1) {
            u = Math.random();
            v = Math.random();
        }
        var res = (Math.pow(u, 1 / a)) / (Math.pow(u, 1 / a) + Math.pow(v, 1 / b));
        return res;
    },
    loiGeometrique: function (p) {
        if (p <= 0 || p >= 1) {
            return "Probability (p) must be greater than 0 and less than 1.";
        }
        var count = 1;
        while (this.bernouilli(p)) {
            count++;
        }
        return count;
    }
};
exports.default = lois;

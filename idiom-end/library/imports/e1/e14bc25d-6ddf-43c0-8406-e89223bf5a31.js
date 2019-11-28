"use strict";
cc._RF.push(module, 'e14bcJdbd9DwIQG6JIjv1ox', 'gameButton');
// script/game/gameButton.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        home: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.director.preloadScene('main');
    },
    start: function start() {
        this.home.on('click', function () {
            cc.director.loadScene('main');
        }, this);
    }
}

// update (dt) {},
);

cc._RF.pop();
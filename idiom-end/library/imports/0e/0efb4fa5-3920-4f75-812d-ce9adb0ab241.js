"use strict";
cc._RF.push(module, '0efb4+lOSBPdYEtzprbCrJB', 'GiftButton');
// script/main/GiftButton.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        totalCount: 0,
        vigor: cc.Prefab //精力预制体

    },

    onLoad: function onLoad() {
        this.init();
    },

    init: function init() {
        this.vigors = [];

        for (var index = 0; index < this.totalCount; index++) {
            var vigor = this.addVigor();
            this.vigors.push(vigor);
        }
    },
    addVigor: function addVigor() {
        var vigor = cc.instantiate(this.vigor);
        this.scrollView.content.addChild(vigor);
        return vigor;
    },
    show: function show() {
        this.node.active = true;
        this.node.emit('fade-in');
    },
    hide: function hide() {
        this.node.emit('fade-out');
    },
    start: function start() {}
}
// update (dt) {},
);

cc._RF.pop();
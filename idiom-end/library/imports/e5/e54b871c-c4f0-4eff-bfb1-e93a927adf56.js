"use strict";
cc._RF.push(module, 'e54b8ccxPBO/7+x6TqSet9W', 'Constants');
// script/SocketIO/Constants.js

"use strict";

var STAND = cc.Enum({
    BLACK: 47,
    WHITE: -47
});

var GAME_STATE = cc.Enum({
    PREPARE: -1,
    PLAYING: -1,
    OVER: -1
});

module.exports = {
    STAND: STAND,
    GAME_STATE: GAME_STATE
};

cc._RF.pop();
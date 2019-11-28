const STAND = cc.Enum({
    BLACK: 47,
    WHITE: -47,
});


const GAME_STATE = cc.Enum({
    PREPARE: -1,
    PLAYING: -1,
    OVER: -1
});


module.exports = {
    STAND:STAND,
    GAME_STATE:GAME_STATE,
};
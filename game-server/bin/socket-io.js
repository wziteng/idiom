'use strict'

let app = require('express')();
var fs=require('fs');
var options = {
    key: fs.readFileSync('/etc/nginx/cert/game_i--j_com.key'),
    cert: fs.readFileSync('/etc/nginx/cert/game_i--j_com.pem'),
    passphrase:''//如果秘钥文件有密码的话，用这个属性设置密码
};
let server = require('https').Server(options, app);
let io = require('socket.io')(server);

server.listen(3002, function() {
    console.log('listening on:3002');
});

let MAX = 30;//最大支持连接房间数
let hall = null;//大厅
let queue = null;//匹配队列
let rooms = [];//游戏房间
let namearr=[];
let avatararr=[];


function Hall() {
    this.people = 0;
    this.socket = null;
}

function Room(){
	this.people = 0;
    this.socket = null;
}

function Queue(){
    this.people = 0;
    this.socket = null;
}


hall = new Hall();

queue = new Queue();

for(let n = 0;n < MAX;n++){
	rooms[n] = new Room();
}

function getFreeRoom(){
	for(let n = 0;n < MAX;n++){
		if(rooms[n].people === 0){
			return n;
		}
	}
	return -1;
}

io.people = 0;
io.on('connection',function(socket){
    io.people++;
    console.log('someone connected');
    socket.on('disconnect',function(){
        io.people--;
        console.log('someone disconnected');
    });
});

hall.socket = io.of('/hall').on('connection', function(socket) {

	hall.people++;

    console.log('a player connected.There are '+hall.people+' people in hall');

	hall.socket.emit('people changed',hall.people);

    socket.on('disconnect',function(){
        hall.people--;
		console.log('a player disconnected.There are '+hall.people+' people in hall');
		hall.socket.emit('people changed',hall.people);
    });
});

queue.socket = io.of('/queue').on('connection',function(socket){

	queue.people++;

    console.log('someone connect queue socket.There are '+queue.people+' people in queue');
	
    if(queue.people === 1){
		socket.emit('set stand','black');
	}else if(queue.people === 2){
		socket.emit('set stand','white');
		let roomId = getFreeRoom();
        console.log(roomId+"roomId");
		if(roomId >= 0){
			queue.socket.emit('match success',roomId);
            console.log('match success.There are '+queue.people+' people in queue');
		}else{
            console.log('no free room!');
        }
	}

	socket.on('cancel match',function(){
		queue.people--;
        console.log('someone cancel match.There are '+queue.people+' people in queue');
	});

    socket.on('disconnect',function(){
        queue.people--;
        console.log('someone disconnected match.There are '+queue.people+' people in queue');
    });

});

for(let i = 0;i < MAX;i++){
	rooms[i].socket = io.of('/rooms'+i).on('connection',function(socket){
		rooms[i].people++;
		console.log('some one connected room'+i+'.There are '+rooms[i].people+' people in the room');
        socket.on('match_sss',function(name,avatar){
            namearr.push(name);//名称
            avatararr.push(avatar);//头像
            if(namearr.length===2){
                console.log('nameArr'+namearr);
                console.log('avatarArr'+avatararr);
                rooms[i].socket.emit('userAll',namearr[0],avatararr[0],namearr[1],avatararr[1]);//玩家一和玩家二的信息
                namearr.splice(0,namearr.length);
                avatararr.splice(0,avatararr.length);
            }
        });

		socket.on('type',function(type){
			console.log(type);
			if(type===0){
				socket.emit('type',0);
			}
			else if(type===47){
				socket.broadcast.emit('wover',1);
			}else{
				socket.broadcast.emit('bover',2);
			}
		});
		
		socket.on('disconnect',function(){
			rooms[i].people--;
            console.log('someone disconnected room'+i+'.There are '+rooms[i].people+' people in the room');
		});

	});
}

//Variables
var io = require('socket.io-client');
var socket = io.connect('http://104.236.49.163:3000');
var relayExp = require("/usr/bin/node-relay-exp");
var timeout = 3000;
var addr = 0;
//Connect listener
socket.on('connect', function(){
   try {
      console.log('socket connect');
   } catch(e) {
     console.log(e);
   }
});

socket.on("connect_error", function(error){
	console.log(error);
});

socket.on("change_state", function(state){
	
	if(state){
		testCheckInit()
			.then(testInit)
			.then(setChannelOn)	
	}else{
		testCheckInit()
			.then(testInit)
			.then(setChannelOff)
	}

});

var testCheckInit =  function () {
	var promise = new Promise ( function(resolve, reject) {
		setTimeout( () => {
			console.log("Checking if Relay Expansion is initialized");
			relayExp.checkInit(addr, () => {
				console.log("checked");
			});
			resolve();
		}, timeout);
	});
	return promise;
};

var testInit =  function () {
	var promise = new Promise ( function(resolve, reject) {
		setTimeout( () => {
			console.log("Initializing Relay Expansion");
			relayExp.init(addr, () => {
				console.log("Relay Initialised");
			});
			resolve();
		}, timeout);
	});
	return promise;
};

var setChannelOff =  function () {
	var promise = new Promise ( function(resolve, reject) {
		setTimeout( () => {
			console.log("Setting Channel 0 to On");
			relayExp.setChannel(addr,0,1, () => {
				console.log("Channel 0 on");
			});
			resolve();
		}, timeout);
	});
	return promise;
};

var setChannelOn =  function () {
	var promise = new Promise ( function(resolve, reject) {
		setTimeout( () => {
			console.log("Setting Channel 0 to Off");
			relayExp.setChannel(addr,0,0, () => {
				console.log("Channel 0 off");
			});
			resolve();
		}, timeout);
	});
	return promise;
};
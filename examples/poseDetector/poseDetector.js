
//This tells Myo.js to create the web sockets needed to communnicate with Myo Connect
Myo.connect();

Myo.on('status', function(data){
	$('.events').prepend(JSON.stringify(data, null, 2));
})


//Whenever we get a pose event, we'll update the image sources with the active version of the image
Myo.on('pose', function(pose){
	$('img.' + pose).attr('src', 'img/' + pose + '_active.png');
	$('.mainPose img').attr('src', 'img/' + pose + '_active.png');
})

//Opposite of above. We also revert the main img to the unlocked state
Myo.on('pose_off', function(pose){
	$('img.' + pose).attr('src', 'img/' + pose + '.png');
	$('.mainPose img').attr('src', 'img/unlocked.png');
});



Myo.on('locked', function(){
	$('.mainPose img').attr('src', 'img/locked.png');
});
Myo.on('unlocked', function(){
	$('.mainPose img').attr('src', 'img/unlocked.png');
});


var lowest = 110;
var highest = 0
Myo.on('bluetooth_strength', function(val){
	if(val < lowest){
		lowest = val;
		console.log('low', lowest);
	}
	if(val > highest){
		highest = val;
		console.log('high', highest);
	}
});

Myo.on('ready', function(){
	setInterval(function(){
		Myo.myos[1].requestBluetoothStrength();
	}, 200)
})

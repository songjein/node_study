// program과 관련된 정보 나타내는 객체

// process.argv
process.argv.forEach(function(item, index){
	console.log(index + ' : ' + typeof(item) + ' : ' + item);
	
	// if containe --exit
	if (item == '--exit'){
		var exitTime = Number(process.argv[index + 1]);	
		setTimeout(function(){
			process.exit();	
		}, exitTime)
	}
})

// process.exit([exitCode = 0])
// normal : 0
// abnormal: 1

var fs = require('fs');

// file read Async
fs.readFile('textfile.txt', 'utf8', function(error, data){
	if (error){
		console.log(error);	
	}	else {
		console.log(data);	
	}
});

// file wrie Async
fs.writeFile('textfile2.txt', 'Hello wwww', 'utf8', function(error){
	if (error){
		console.log(error);	
	}else {
		console.log('File write complete async');	
	}
});

// file read Sync
try {
	var data = fs.readFileSync('textfile.txt', 'utf8');
	console.log(data);

} catch (e){
	console.log(e);
}


// file write Sync
try {
	fs.writeFileSync('textfile2.txt', 'Hello World...!', 'utf8');
	console.log('File write complete sync');

} catch (e){
	console.log(e);
}



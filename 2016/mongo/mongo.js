const mongojs = require('mongojs');
// db name, collections 
const db = mongojs('node', ['products']);

db.products.find({name: 'sharp'}, (error, data) => {
	console.log('find############################################');
	console.log(data);
	console.log('################################################');
});


db.products.findOne((error, data) => {
	console.log('one#############################################');
	console.log(data);
	console.log('################################################');
});


db.products.find().sort({price:1}).skip(2).limit(3, (error, data) => {
	console.log('sort############################################');
	console.log(data);
	console.log('################################################');
});

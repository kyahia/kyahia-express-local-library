const mongoose = require('mongoose');

const url = 'mongodb+srv://student001:motdepasse@cluster0.mlcbwjt.mongodb.net/?retryWrites=true&w=majority',
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const mySchema = new mongoose.Schema({ name: String, age: Number });
const myModel = mongoose.model('RandModel', mySchema);
const newDoc = new myModel({ name: 'yahia', age: 29 });


newDoc.save( err => {
	if (err) return console.log('error saving to DB')
});


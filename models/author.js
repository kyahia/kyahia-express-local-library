const mongoose = require('mongoose');
const {DateTime} = require('luxon');

const AuthorSchema = new mongoose.Schema({
	first_name: { type: String, required: true, maxLength: 100 },
	family_name: { type: String, required: true, maxLength: 100 },
	date_of_birth: Date, 
	date_of_death: Date
});

// Virtuals for author's full name & URL
AuthorSchema.virtual('name').get( function() {
    let fullname = '';
    if (this.first_name && this.family_name) {
      fullname = `${this.family_name}, ${this.first_name}`;
    }
    if (!this.first_name || !this.family_name) {
      fullname = '';
    }
    return fullname;
});
  
AuthorSchema.virtual('url').get(function(){ return `/catalog/author/${this._id}` });

AuthorSchema.virtual('date_of_death_formatted').get(function () {
	return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : 'Alive';
});
AuthorSchema.virtual('date_of_birth_formatted').get(function () {
	return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
});

AuthorSchema.virtual('date_of_birth_numeric').get(function () {
	return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toISO().slice(0, 10) : '';
});
AuthorSchema.virtual('date_of_death_numeric').get(function () {
	return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toISO().slice(0, 10) : '';
});

AuthorSchema.virtual('lifespan').get(function () {
	return this.date_of_death ? Math.floor((this.date_of_death - this.date_of_birth)/3600000/24/365) : this.date_of_birth;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);

const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');


const userSchema = new mongoose.Schema ({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    role:{type: String, enum:['admin', 'jobSeeker'], default: ',jobSeeker'},
    dateJoined:{ type: date , default: Date.now}
});

// Hash the password before saving it to the database
usenSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

modules.exports = User;
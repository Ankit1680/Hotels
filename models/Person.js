const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

//define the person schema
const PersonSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        required:true
    },

    work:{
        type:String,
        enum:['chef', 'waiter', 'manager'],
        required:true,
    },
    mobile: {
        type:String,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address:{
        type: String
    },
    salary: {
        type: Number,
        required: true,
    },
    username:{
        type:String,
        required:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    }
});

PersonSchema.pre('save', async function(next) {
    const person = this;

    // Hash the password only when the password is modified
    if (!person.isModified('password')) return next();

    try {
        // Hash password generation
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Override the plain password with hashedPassword
        person.password = hashedPassword;

        next();
    } catch (error) {
        return next(error);
    }
});



PersonSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

//create person model

const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;
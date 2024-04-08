const express = require("express");

//step 6: setup passport
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/Person')


passport.use(new localStrategy( async (USERNAME, PASSWORD, done)=>{
    try {
        // USER verification
        const user = await Person.findOne({username: USERNAME});
        if (!user) {
            return done(null, false, {message: 'Incorrect username'});
        }

        // PASSWORD verification
        const isPasswordMatch = await user.comparePassword(PASSWORD);
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Incorrect password'});
        }
      
    } catch (error) {
        return done(error);
    }
}));




module.exports = passport

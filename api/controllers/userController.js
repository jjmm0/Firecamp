const express = require('express')

//Import user model
const User = require('../models/user')

module.exports.register = [
    function(req, res){
        User.create({Login: req.body.Login, Password: req.body.Password}, (err, result) => {
            if(err){
                console.log(err)
                res.status(400).end()
            }else{
                console.log(`Utworzono uzytkownika: ${result}`)
                res.status(200).end()
            }
        })
    }
]
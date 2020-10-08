const express = require('express')
const jwt = require('jsonwebtoken')
//Import user model
const User = require('../models/user')

const authSecret = 

module.exports.register = [
    function(req, res){
        User.findOne({Login: req.body.Login}, (err, result) => {
            if(err){
                console.log(err)
            } 
            else if (result)
            {
                res.status(201).send({message: "Użytkownik o podanym loginie już istnieje!"})
            } 
            else
            {
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
        })
    }
]

module.exports.login = [
    function(req, res){
        User.findOne({Login: req.body.Login, Password: req.body.Password}, (err, result) => {
            if(err){
                console.log(err)
            } 
            else if(result){
                jwt.sign({result}, 'secretKey', (err, decoded) => {
                    res.send(decoded)
                })
            }
            else{
                res.send(`Uzytkownik nie istnieje`)
            }
        })
    }
]
const express = require('express')
const jwt = require('jsonwebtoken')
//Import user model
const User = require('../models/user')

//User register
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
                        jwt.sign({result}, 'SikretKluczES', (err, coded) => {
                            res.status(200).send({token: coded, login: result.Login})
                        })
                    }
                })
            }
        })
    }
]
//User login
module.exports.login = [
    function(req, res){
        User.findOne({Login: req.body.Login, Password: req.body.Password}, (err, result) => {
            if(err){
                console.log(err)
            } 
            else if(result){
                jwt.sign({result}, 'SikretKluczES', (err, coded) => {
                    res.status(200).send({token: coded, login: result.Login})
                })
            }
            else{
                res.send(`Uzytkownik nie istnieje`)
            }
        })
    }
]

//Get profile by id
module.exports.profile = [
    function(req, res){
        User.findOne({_id: req.params.userId}, (err, result) => {
            if(result){
                res.send({name: result.Login, description: result.Description, likes: result.Likes})
            }
            else if(err){
                res.status(400).end()
            }
            else{
                res.status(400).end()
            }
        })
    }
]

//Get all user profiles
module.exports.profiles = [
    function(req, res){
        User.find({}, '-Password -Email -Description -Likes',).then((resolve) => {
            res.status(200).send(resolve)
        })
    }
]

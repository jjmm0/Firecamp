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
                            res.status(200).send({token: coded, login: result.Login, uid: result._id})
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
                    res.status(200).send({token: coded, login: result.Login, uid: result._id})
                })
            }
            else{
                res.status(200).send(`Uzytkownik nie istnieje`)
            }
        })
    }
]

//Get profile by id
module.exports.profile = [
    function(req, res){
        User.findOne({_id: req.params.userId}, (err, result) => {
            if(result){
                res.send({name: result.Login, description: result.Description, likes: result.Likes, id: result._id})
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

//Update user profile data
module.exports.editprofile = [
    function(req, res){
        if(req.body.description){
            User.findOneAndUpdate({_id: req.body.udata.uid, Login: req.body.udata.name}, {Description: req.body.description}, {new: true},  (err, result) => {
                if(result != null || undefined){
                    res.status(200).end()
                }
                else if(err){
                    console.log(err)
                    res.status(400).end()
                }
                else{
                    res.status(400).end()
                }
            })
        }
        else {
            req.status(400).end()
        }
    }
]

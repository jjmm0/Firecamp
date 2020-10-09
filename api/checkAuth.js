const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./models/user')

module.exports = [
    function(req, res, next){
        if(req.body.token != (null || undefined))
        {
            jwt.verify(req.body.token, 'SikretKluczES', (err, decoded) => {
                if(decoded.result.Login != (null || undefined)){
                    User.findOne({Login: decoded.result.Login}, (err, result) => {
                        if((result.Login === decoded.result.Login) && (result.Password === decoded.result.Password)){
                            console.log('Authorized!')
                            res.status(200).end()
                            next()
                        }
                        else{
                            res.status(500).send({message: "Unauthorized"})
                        }
                    })
                }
            })
        }
        else{
            res.status(500).send({message: "Unauthorized!"})
        }
    }

]

module.exports.test = [
    function(req, res){
        console.log('next')
    }
]
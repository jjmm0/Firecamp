const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./models/user')

//Check user token isn't expired or fake
module.exports.auth = [
    function(req, res, next){
        console.log(req.headers)
        if((req.body.udata.token && req.body.udata.name) != (null || undefined))
        {
            jwt.verify(req.body.udata.token, 'SikretKluczES', (err, decoded) => {
                if(decoded == (undefined || null)){
                    res.status(201).end()
                    // console.log('Unauthorized!')
                }
                else if(decoded.result.Login != (null || undefined)){
                    User.findOne({_id: req.body.udata.uid, Login: decoded.result.Login}, (err, result) => {
                        if(result){
                            if((result.Login === (decoded.result.Login && req.body.udata.name)) && (result.Password === decoded.result.Password)){
                                console.log('Authorized!')
                                next()
                            }
                            else{
                                res.status(201).end()
                                // console.log('Unauthorized!')
                            }
                        }
                        else{
                            res.status(201).end()
                            // console.log('Unauthorized!')
                        }
                    })
                }
            })
        }
        else{
            res.status(201).end()
            console.log('Unauthorized!')
        }
    }

]

module.exports.userId = [
    function(req, res){
        console.log(req.body.udata.token)
    }
]
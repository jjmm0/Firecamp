const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('./models/user')

//Check user token isn't expired or fake
module.exports = [
    function(req, res, next){
        if((req.body.udata.token && req.body.udata.name) != (null || undefined))
        {
            jwt.verify(req.body.udata.token, 'SikretKluczES', (err, decoded) => {
                if(decoded == (undefined || null)){
                    res.status(201).end()
                    // console.log('Unauthorized!')
                }
                if(decoded.result.Login != (null || undefined)){
                    User.findOne({Login: decoded.result.Login}, (err, result) => {
                        if((result.Login === (decoded.result.Login && req.body.udata.name)) && (result.Password === decoded.result.Password)){
                            // console.log('Authorized!')
                            res.status(200).end()
                            // next()
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
        }
    }

]
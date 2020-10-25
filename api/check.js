const jwt = require('jsonwebtoken');
const User = require('./models/user');

// Check user token isn't expired or fake
module.exports.auth = [
    function(req, res, next){
        const utoken = req.headers.utoken || null
        if(utoken)
        {
            jwt.verify(req.headers.utoken, 'SikretKluczES', (err, decoded) => {
                if(decoded == undefined || null){
                    res.status(201).end();
                    console.log('Unauthorized!');
                }
                else if(decoded.result.Login != null || undefined){
                    User.findOne({_id: req.headers.uid, Login: decoded.result.Login}, (err, result) => {
                        if(result){
                            if((result.Login === (decoded.result.Login && req.headers.uname)) && (result.Password === decoded.result.Password)){
                                console.log('Authorized!');
                                next();
                            }
                            else{
                                res.status(201).end();
                                console.log('Unauthorized!');
                            }
                        }
                        else{
                            res.status(201).end();
                            console.log('Unauthorized!');
                        }
                    });
                }
            })
        }
        else{
            res.status(201).end();
            console.log('No token supplied!');
        }
    }
]
// Get user id from request
module.exports.userId = function (req) {
  return new Promise((resolve, reject) => {
    const token = req.headers.utoken;

    if(!token) {
        reject(new Error('No token supplied!'));
    }

    jwt.verify(token, 'SikretKluczES', function (err, decoded){
    if(err){
        return reject(err);
    }
    resolve(decoded.result._id);
    })
  })
}

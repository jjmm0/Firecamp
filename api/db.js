const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost/ProjektnaKONKURS";

// Connect to mongoDB with mongoose
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
}, (err, done) => {
    if(err){
        console.log(err);
    } 
    else if(done){
        console.log('Connected with mongodb!');
    }
})
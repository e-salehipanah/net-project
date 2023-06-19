const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require("cors");
const mongoose = require('mongoose')


const uri = "mongodb+srv://ebpa1379:2MvVwLfyMSUTwJgq@cluster1.eonszyg.mongodb.net/?retryWrites=true&w=majority";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

mongoose.connect(uri).then(() => {
    console.log('successfully ');
}).catch((err) => { console.log(err); })

app.use(express.static(path.join(__dirname, 'client/build')));

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.get('/api/form', (req, res) => {
    User.find().limit(5).sort({ _id: -1 }).then((data) => {
        res.send(data);
    });
})

app.post('/api/form', (req, res) => {
    const { name, email, password, address } = req.body;
    const newUser = new User({
        name, email, password, address
    });

    newUser.save().then((data => {
        console.log(data);
        res.status(201).send(data);
    })).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});




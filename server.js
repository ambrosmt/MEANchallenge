const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//==========DataBase==========//

mongoose.connect('mongodb://localhost/dojo_store');

var ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: [3, "Product name must be at least 3 characters long"] },
    qty: { type: Number, required: true, min: [0, "Product quantity must be greater than 0"] },
    price: { type: Number, required: true, min: [0.01, "Price must be greater than 0"] },
}, { timestamps: true });

mongoose.Promise = global.Promise;
mongoose.model('Item', ProductSchema);
const appTask = mongoose.model('Item');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/client/dist'));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//==========Routes==========//

//Retrieve all Tasks
app.get('/products', function (req, res) {
    appTask.find({}, function (err, tasks) {
        if (err) {
            console.log("*****\nsomething went wrong\n*****");
        }
        else {
            console.log("*****\nrendering json Data\n*****");
            res.json(tasks);
        }
    })
})

//Retrieve Task by Id
app.get('/product/:id', function (req, res) {
    console.log(req.params)
    appTask.findOne({ _id: req.params.id }, function (err, tasks) {
        if (err) {
            console.log("*****\nsomething went wrong\n*****");
        }
        else {
            console.log("*****\nrendering json Data\n*****");
            res.json(tasks);
        }
    })
})

//Create Task
app.post('/product/new', function (req, res) {
    console.log("POST DATA", req.body);
    var newTask = new appTask({ 
        name: req.body.name, 
        qty: req.body.qty, 
        price: req.body.price, 
    });
    newTask.save(function (err) {
        if (err) {
            console.log("*****\nsomething went wrong\n*****");
            res.json(err);
        }
        else {
            console.log("*****\nnew user added and saved\n*****");
            res.json('Post complete')
        }
    })
})

//Update Task by Id
app.put('/product/edit/:id', function (req, res) {
    console.log("PUT DATA", req.body);
    console.log("*****\ntask Id = " + req.params.id + "\n*****");
    var updateTask = appTask.findById(req.params.id, function (err, updateTask) {
        if (err) {
            console.log("*****Cannot find by Id*****")
            res.json(err);
        }
        else {
            updateTask.name = req.body.name;
            updateTask.qty = req.body.qty;
            updateTask.price = req.body.price;
            updateTask.save(function (err) {
                if (err) {
                    console.log("*****\nCould not save\n*****\nError:" + err + "\n*****");
                    res.json(err);
                }
                else {
                    console.log("*****\nTask Updated\n*****");
                    res.json();
                }
            })
        }
    });
})

//Delete Task by Id
app.delete('/product/delete/:id', function (req, res) {
    appTask.findByIdAndRemove(req.params.id, function (err, task) {
        if (err) {
            console.log("*****\nsomething went wrong\n*****\n" + err + "\n*****");
            res.json(err);
        }
        else {
            console.log("*****\nTask Deleted\n*****");
            res.json('deleted')
        }
    })
})

app.listen(8000, function () {
    console.log("listening on port 8000");
})
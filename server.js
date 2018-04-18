// Express Setup
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/api/login', (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result)
      res.status(200).json({user:{username:user.username,name:user.name,id:user.id}});
    else
      res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

app.post('/api/users', (req, res) => {
  console.log("HERE");
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).send("Missing Values");
  }
  knex('users').where('email',req.body.email).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Email address already exists");
      throw new Error('abort');
    }
    return knex('users').where('name',req.body.name).first();
    }).then(user => {
    return bcrypt.hash(req.body.password, saltRounds);
    }).then(hash => {
    return knex('users').insert({
      email: req.body.email,
      hash: hash,
			name:req.body.name,
      role: 'user'});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first().select('email','name','id');
  }).then(user => {
    res.status(200).json({user:user});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

app.get('/api/users/:id/vehicles', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').join('vehicles','users.id','vehicles.user_id')
    .where('users.id',id)
    .orderBy('vehicle_name')
    .select('vehicle_name').then(vehicles => {
      res.status(200).json({vehicles:vehicles});
    }).catch(error => {
      res.status(500).json({ error });
    });
});

app.post('/api/users/:id/vehicles', (req, res) => {
  if (req.body.vehicle_name === undefined ||
    req.body.vehicle_name === "") {
    return res.status(400).send("Missing Values");
  }
  let id = parseInt(req.params.id);
  knex('users').where('id',id).first().then(user => {
    return knex('vehicles').insert({
      user_id: id,
      vehicle_name:req.body.vehicle_name});
  }).then(ids => {
    return knex('vehicles').where('id',ids[0]).first();
  }).then(vehicle_name => {
    res.status(200).json({vehicle_name:vehicle_name});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

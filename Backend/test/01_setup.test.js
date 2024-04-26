process.env.NODE_ENV = 'test';

const User = require('../models/user');
const Appointment = require('../models/appointment');
const ShoppingItem = require('../models/shoppingItem');
const ToDo = require('../models/toDo');

// Fjern alt i databasen før og efter hver test
beforeEach((done) => { 
    User.deleteMany({}, function(err) {});
    Appointment.deleteMany({}, function(err) {});
    ShoppingItem.deleteMany({}, function(err) {});
    ToDo.deleteMany({}, function(err) {});
    done();
});

afterEach((done) => {
    User.deleteMany({}, function(err) {});
    Appointment.deleteMany({}, function(err) {});
    ShoppingItem.deleteMany({}, function(err) {});
    ToDo.deleteMany({}, function(err) {});
    done();
});
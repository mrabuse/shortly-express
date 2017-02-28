var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var saltRounds = 10;

// TODO: write this model 
var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false,
  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      console.log('model', model);
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(model.get('password'), salt, null, function (err, hash) {
          model.set('password', hash);
        });
      });
    });
  }
});

module.exports = User;
'use strict';

var mysql = require('mysql2');
var config = require('../config/db-config');
var db = mysql.createConnection(config);

describe('Test database connection', function() {
  after(function() {
    db.end();
  });

  it('Test DB query', function(done) {
    db.query('SELECT 1+1;', (error, results) => {
      if (error) {
        done(error);
        return;
      }

      done();
    });
  });
});

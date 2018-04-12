'use strict';

const assert = require('assert').strict;

var mysql = require('mysql2');
var config = require('../config/db-config');
var db = mysql.createConnection(config);

describe('Test database connection', function() {

  // Populate a test table before the tests
  before(function(done) {
    // Create a temporary persons table
    var query =
      `CREATE TEMPORARY TABLE \`persons\`
      (
        \`id\` INT PRIMARY KEY,
        \`name\` VARCHAR(255)
      )`;

    db.query(query, (error, results) => {
      if (error) {
        done(error);
        return;
      }

      // Insert a new person
      query =
        `INSERT INTO \`persons\` SET
        \`id\`=1,
        \`name\`='steve'`;

      db.query(query, (error, results) => {
        if (error) {
          done(error);
          return;
        }

        done();
      });
    });
  });

  after(function() {
    db.end();
  });

  it('Test DB query', function(done) {
    // Pull all rows from persons
    var query = 'SELECT * FROM `persons`';

    db.query(query, (error, results) => {
      if (error) {
        done(error);
        return;
      }

      var expects = {
        id: 1,
        name: "steve"
      };

      assert(results[0], 'results not as expected');
      assert(results[0].id === expects.id, 'results not as expected');
      assert(results[0].name === expects.name, 'results not as expected');

      done();
    });
  });
});

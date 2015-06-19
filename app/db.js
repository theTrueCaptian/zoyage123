/**
 * Created by mh4047 on 6/11/15.
 */
module.exports = function(in_connection_link){
    var connection_link = in_connection_link;
    var pg = require('pg');

    function connect(){

        //this starts initializes a connection pool
        //it will keep idle connections open for a (configurable) 30 seconds
        //and set a limit of 20 (also configurable)
        pg.connect(connection_link, function(err, client, done) {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            client.query('SELECT $1::int AS number', ['1'], function(err, result) {
                //call `done()` to release the client back to the pool
                done();

                if(err) {
                    return console.error('error running query', err);
                }
                console.log(result.rows[0].number);
                //output: 1
            });
        });
    }

    /*
    @query_string e.g. 'SELECT $1::int AS number'
    @query_params e.g. ['1']
    @callback is a function e.g. function(result){...}
     */
    function query(query_string, query_params, callback){
        pg.connect(connection_link, function(err, client, done) {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            client.query(query_string, query_params, function(err, result) {
                //call `done()` to release the client back to the pool
                done();

                if(err) {
                    console.error('Error running query:'+query_string, err);
                    callback(-1);
                }
                console.log(query_string);
                console.log(result.rows);

                callback(result.rows);
            });
        });
    }
    return {
        connect:connect,
        query:query
    }
}
/**
 * Created by mh4047 on 6/19/15.
 */

var search_routes = function(db_api) {
    var express = require('express');
    var router = express.Router();
    /* GET users listing. */
    router.post('/', function (req, res, next) {
        console.log(req.body);
        res.json(req.body);
    });



    function search_routes() {



    }

    return{
        search_routes:search_routes,
        router:router
    }
}

module.exports = search_routes;

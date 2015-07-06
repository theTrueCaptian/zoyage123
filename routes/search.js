/**
 * Created by mh4047 on 6/19/15.
 */
var _ = require('lodash');
var search_routes = function(db_api) {
    var express = require('express');
    var router = express.Router();

    router.get('/topk_people_kinds/:searchStr', function(req, res, next){
        console.log('tag search',req.params.searchStr);
        //res.json(req.params);
        //res.send('user ' + req.params.searchStr);
        db_api.get_top_k_tag(req.params.searchStr,
         function(results){
            res.json(_.pluck(results, 'TagName'));
         }
         );
    })

    /* Perform search query . */
    router.post('/', function (req, res, next) {
        console.log("Search query:",req.body);
        var query_params = req.body;
        db_api.search(query_params.people_tags[0].text,
            query_params.from_location_model,
            query_params.to_location_model,
            function(results){
                res.json(results);
        });


    });


    function search_routes() {



    }

    return{
        search_routes:search_routes,
        router:router
    }
}

module.exports = search_routes;

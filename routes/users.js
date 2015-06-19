var user_router = function(db_api) {
    var express = require('express');
    var router = express.Router();
    /* GET users listing. */
    router.get('/', function (req, res, next) {
        db_api.get_person(function(result){
            res.send(result);
        });
    });



    function user_routes() {



    }

    return{
        user_routes:user_routes,
        router:router
    }
}

module.exports = user_router;

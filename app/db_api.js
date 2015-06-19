module.exports = function(db_connection){
    // Person e.g. Maeda
    function add_person(name, fblink, callback){
        db_connection.query("INSERT INTO \"Person\" (\"Name\", \"FBLink\") VALUES ($1, $2);", [name, fblink], callback);
    }
    function get_person(callback){
        db_connection.query("SELECT * FROM \"Person\"", [], callback);
    }

    function update_person(id, new_name, new_fblink, callback){    //Given id, update the name and fblink
        db_connection.query("UPDATE \"Person\" SET \"Name\" = $1, \"FBLink\" = $2 WHERE \"PersonID\" = $3;", [new_name, new_fblink, id], callback);
    }
    function delete_person(id, callback){
        db_connection.query("DELETE FROM \"Person\" WHERE \"PersonID\" = $1;", [id], callback);
    }

    function add_tag(new_tag, callback){                             // Tags e.g. NYUAD students
        db_connection.query("INSERT INTO \"Tag\" (\"TagName\") VALUES ($1);", [new_tag], callback);
    }
    function get_tag(callback){
        db_connection.query("SELECT * FROM \"Tag\"", [], callback);
    }
    function update_tag(id, new_tag_name, callback){ //update by id
        db_connection.query("UPDATE \"Tag\" SET \"TagName\" = $1 WHERE \"TagID\" = $2;", [new_tag_name, id], callback);
    }
    function delete_tag(id, callback){  //dete by id
        db_connection.query("DELETE FROM \"Tag\" WHERE \"TagID\" = $1;", [id], callback);
    }
    // PeopleTag e.g. NYUAD students == Maeda
    function add_people_tag(tag_id, person_id, callback){
        db_connection.query("INSERT INTO \"PeopleTag\" (\"TagID\", \"PeopleID\") VALUES ($1, $2);", [tag_id, person_id], callback);
    }
    function get_people_tag(callback){
        db_connection.query("SELECT * FROM \"PeopleTag\"", [], callback);
    }
    function update_people_tag(tag_id, person_id, new_tag_id, new_person_id,callback){       //update by finding both id
        db_connection.query("UPDATE \"PeopleTag\" SET \"TagID\" = $1, \"PeopleID\" = $2 WHERE \"TagID\" = $3 AND \"PeopleID\" = $4;",
                            [tag_id, person_id, new_tag_id, new_person_id], callback);
    }
    function delete_people_tag(tag_id, person_id, callback){
        db_connection.query("DELETE FROM \"PeopleTag\" WHERE \"TagID\" = $1 AND \"PeopleID\" = $2;", [tag_id, person_id], callback);
    }
    // TravelInfo e.g. Maeda traveled from CT to Abu Dhabi from Jun 1 2014 to Jun 2015
    function add_travel_info(date_duration, person_id, to_location, from_location, callback){
        db_connection.query("INSERT INTO \"TravelInfo\" (\"DateDuration\", \"PersonID\", \"ToLocation\", \"FromLocation\") VALUES ($1, $2, $3, $4);",
            [date_duration, person_id, to_location, from_location], callback);
    }
    function get_travel_info(callback){
        db_connection.query("SELECT * FROM \"TravelInfo\"", [], callback);
    }
    function update_travel_info(travel_info_id, date_duration, person_id, to_location, from_location, callback){    //update by travel info id
        db_connection.query("UPDATE \"TravelInfo\" SET \"DateDuration\"=$1, \"PersonID\"=$2, \"ToLocation\"=$3, \"FromLocation\"=$4 WHERE \"TravelInfoID\"=$5;",
            [date_duration, person_id, to_location, from_location, travel_info_id], callback);
    }
    function delete_travel_info(travel_info_id, callback){ //delete by travel_info_id
        db_connection.query("DELETE FROM \"TravelInfo\" WHERE \"TravelInfoID\" = $1;", [travel_info_id], callback);
    }

    // Location e.g. Abu Dhabi, Abu Dhabi, UAE
    function add_location_info(location, callback){
        db_connection.query("INSERT INTO \"Location\" (\"Location\") VALUES ($1);", [location], callback);
    }
    function get_location_info(callback){
        db_connection.query("SELECT * FROM \"Location\"", [], callback);
    }
    function update_location_info(location_id, new_location, callback){     //update by location id
        db_connection.query("UPDATE \"Location\" SET \"Location\" = $1 WHERE \"LocationID\" = $2;",
            [new_location, location_id], callback);
    }
    function delete_location_info(location_id, callback){
        db_connection.query("DELETE FROM \"Location\" WHERE \"LocationID\" = $1;", [location_id], callback);
    }
    // Test
    function test_insert(){
        var query1 = "INSERT INTO \"Person\" (\"Name\", \"FBLink\") VALUES ('Maeda Hanafi', 'https://www.facebook.com/profile.php?id=100000304317289');";
        var query2 = "INSERT INTO \"Tag\" (\"TagName\") VALUES ('Cat Lovers');";
        var query3 = "INSERT INTO \"PeopleTag\" (\"TagID\", \"PeopleID\") VALUES (1, 1);";
        var query4 = "INSERT INTO \"Location\" (\"Location\") VALUES ('San Francisco, CA, USA'), ('Abu Dhabi, Abu Dhabi, UAE');";
        var query5 = "INSERT INTO \"TravelInfo\" (\"DateDuration\", \"PersonID\", \"ToLocation\", \"FromLocation\") VALUES ('[2012-03-28, 2012-04-02]', 1, 1, 2);";
    }

    function test_get(){
        var query1 = "SELECT * FROM \"Person\";";
        var query2 = "SELECT * FROM \"Tag\";"
        var query3 = "SELECT * FROM \"Location\";";
        var query4 = "SELECT * FROM \"PeopleTag\";"
        var query5 = "SELECT * FROM \"TravelInfo\";";
    }

    function test_update(){
        var query1 = "UPDATE \"Location\" SET \"Location\" = 'Dubai, Dubai, UAE' WHERE \"Location\" = 'Abu Dhabi, Abu Dhabi, UAE';";
    }

    function test_delete(){
        var query1 = "DELETE FROM \"Location\" WHERE \"Location\" = 'Abu Dhabi, Abu Dhabi, UAE';";
    }

    return{
        add_person:add_person,
        get_person:get_person,
        update_person:update_person,
        delete_person:delete_person,
        add_tag:add_tag,
        get_tag:get_tag,
        update_tag:update_tag,
        delete_tag:delete_tag,
        add_people_tag:add_people_tag,
        get_people_tag:get_people_tag,
        update_people_tag:update_people_tag,
        delete_people_tag:delete_people_tag,
        add_travel_info:add_travel_info,
        get_travel_info:get_travel_info,
        update_travel_info:update_travel_info,
        delete_travel_info:delete_travel_info,
        add_location_info:add_location_info,
        get_location_info:get_location_info,
        update_location_info:update_location_info,
        delete_location_info:delete_location_info
    }
}
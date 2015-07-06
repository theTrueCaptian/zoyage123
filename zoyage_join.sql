SELECT *

FROM
"Location",
"Person",
"TravelInfo"

WHERE
	("TravelInfo"."ToLocation" = "Location"."LocationID" OR
	"TravelInfo"."FromLocation" = "Location"."LocationID") AND
	"TravelInfo"."PersonID" = "Person"."PersonID"
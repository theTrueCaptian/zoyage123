SELECT 
*
FROM
	(SELECT 
		* 
	FROM 
		public."PeopleTag", 
		public."Person",
		public."Tag",
		public."TravelInfo"
	WHERE 
		"Person"."PersonID" = "PeopleTag"."PeopleID" AND
		"Tag"."TagID" = "PeopleTag"."TagID" AND
		"TravelInfo"."PersonID" = "PeopleTag"."PeopleID"
	) n1
	 LEFT JOIN "Location"
	ON "Location"."LocationID" = n1."FromLocation"
/*,
	public."TravelInfo"
WHERE 
	"TravelInfo"."PersonID" = "n1"."PersonID"*/;

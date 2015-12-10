SELECT 
  * 
FROM (
  SELECT 
    * 
  FROM
    public."PeopleTag",
    public."Tag"
  WHERE 
    "PeopleTag"."TagID" = "Tag"."TagID"
    AND "Tag"."TagName" = 'Cat Lovers'
 ) tagtbl,
(
  SELECT
   *
  FROM
    public."TravelInfo",
    /*public."Location",*/
    (
	select "Location"."LocationID" as fromlocationid from public."Location", public."TravelInfo" 
	where "Location"."LocationID"="TravelInfo"."FromLocation" 
	and "Location"."Location"='Kuala Lumpur, Malaysisa'
    ) fromlocation,
    (
	select "Location"."LocationID" as tolocationid from public."Location", public."TravelInfo" 
	where "Location"."LocationID"="TravelInfo"."ToLocation" 
	and "Location"."Location"='France'
    ) tolocation
  WHERE
    /*("TravelInfo"."ToLocation" = "Location"."LocationID" OR
     "TravelInfo"."FromLocation" = "Location"."LocationID" ) AND */
     ("TravelInfo"."FromLocation"=fromlocationid OR
     "TravelInfo"."ToLocation"=tolocationid)
) locationdetailtbl,
public."Person"  
   WHERE
     tagtbl."PeopleID" = "Person"."PersonID"
     AND locationdetailtbl."PersonID" = "Person"."PersonID";

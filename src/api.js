/*this function takes an events array, then uses map to create a 
new array with only locations.  it will also remove all duplicates
by creating another new array using the spread operator and spreading
a Set.  the Set will remove all duplicates from the array*/

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};
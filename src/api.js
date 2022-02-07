/*
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 */
export const extractLocations = (eventsList) => {
    var extractLocations = eventsList.map(e => e.location);
    return [...new Set(extractLocations)];
};
function apiToPlaces(places = []) {
  return places.map(({ properties }) => ({
    id: properties.mapbox_id,
    lat: properties.coordinates.latitude,
    long: properties.coordinates.longitude,
    name: properties.full_address
  }));
}

module.exports = {
  apiToPlaces
};

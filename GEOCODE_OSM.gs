function GEOCODE_OSM(address) {
  var url = "https://nominatim.openstreetmap.org/search?format=json&q=" + encodeURI(address);
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  if (data.length > 0) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    return lat + "," + lon;
  }
  
  return "Please Enter Data Address";
}

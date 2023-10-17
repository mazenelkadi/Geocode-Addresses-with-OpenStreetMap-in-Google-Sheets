function REVERSE_GEOCODE_OSM(lat, lon) {
  var cache = CacheService.getScriptCache();
  var cacheKey = lat + "," + lon;
  var cached = cache.get(cacheKey);
  
  if (cached != null) {
    return cached;
  }
  
  try {
    lat = parseFloat(lat);
    lon = parseFloat(lon);
    
    if (isNaN(lat) || isNaN(lon)) {
      return "Latitude and Longitude must be valid numbers";
    }
    
    var url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + lon;
    var response = UrlFetchApp.fetch(url);
    var json = response.getContentText();
    var data = JSON.parse(json);
    
    if (data && data.address) {
      var address = data.address;
      var formattedAddress = address.road + ", " + address.postcode + ", " + address.city + ", " + address.country;
      cache.put(cacheKey, formattedAddress, 3600); // Cache for 1 hour
      return formattedAddress;
    }
    
    return "Error";
  } catch (e) {
    return "Error: " + e.toString();
  }
}

const { google } = window;
const { maps } = google;
const { Map } = maps;
const { Marker } = maps;
const { InfoWindow } = maps;
const { Geocoder } = maps;

const map = new Map(document.getElementById("map"), {
  zoom: 8,
  center: { lat: 40.731, lng: -73.997 },
});
const geocoder = new Geocoder();
const infowindow = new InfoWindow();

document.getElementById("submit").addEventListener("click", () => {
  geocodeLatLng(geocoder, map, infowindow);

  const input = document.getElementById("latlng").value;
  const latlngStr = input.split(",", 2);
  const latlng = {
    lat: parseFloat(latlngStr[0]),
    lng: parseFloat(latlngStr[1]),
  };

  geocoder
    .geocode({ location: latlng })
    .then((response) => {
      if (response.results[0]) {
        map.setZoom(11);

        const marker = new Marker({
          position: latlng,
          map: map,
        });

        infowindow.setContent(response.results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
});

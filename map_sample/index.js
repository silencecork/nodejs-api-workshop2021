let map;
let infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 24.989695, lng: 121.543652 },
    zoom: 12,
  });

  fetch('http://127.0.0.1:8080/ubike?bike_num=5', {
      method: "GET"
  })
  .then(function (response) {
    return response.json();
  })
  .then(function(data) {
    data.forEach(function (item) {
        let marker = new google.maps.Marker({
            position: { lat: Number(item.lat), lng: Number(item.lng) },
            map,
            title: item.title,
        });
        marker.addListener("click", () => {
            map.setZoom(16);
            map.panTo(marker.getPosition());
            if (infoWindow) {
                infoWindow.close();
            }
            infoWindow = new google.maps.InfoWindow({
                content: marker.getTitle(),
                position: marker.getPosition(),
            });
            infoWindow.open(map);
        });
    });
  });;
  

  new google.maps.Marker({
    position: { lat: 24.989695, lng: 121.543652 },
    map,
    title: "SHU University",
  });
}
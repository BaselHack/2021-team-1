$(document).ready(function() {
  const startupResources = [
    "Infrastructure",
    "Rent Spaces",
    "Co-Working",
    "Laboratory Space",
    "Coaching",
    "Accelerator",
    "Workshop",
    "Competition"
  ];
  const investorResources = ["Workshop", "Competition"];

  const map = L.map("mapid").setView([47.541232, 7.604589], 13);

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoidmljLWNvZGVjYW1wIiwiYSI6ImNrdGZueGZ1azBhMDYycG1yY2ZmNGJ4cWQifQ.xoYa6-TrQxRND1wHjGYkwg"
  }).addTo(map);

  const getPopupHTML = function(item) {
    const itemImage = `<p><figure class="image "><img src="${item.image}"></figure></p>`;
    const tagsHTML = `<p class="tags">${item.ressource.map(r => `<span class="tag">${r}</span>`).join(" ")}</p>`;

    const result = `<p><b><a href="${item.website}">${item.name}</a></b></p><p>${item.description}</p>${tagsHTML}`;

    return result;
  };

  $.getJSON("data.json", function(data) {
    console.log(data);

    const filterByResources = function(data, resources) {
      const result = [];

      for (let i = 0; i < data.length; ++i) {
        const item = data[i];
        for (let j = 0; j < resources.length; ++j) {
          if (item.ressource.includes(resources[j])) {
            result.push(item);
          }
        }
      }

      return result;
    };

    const addMarkers = function(map, items) {
      const markers = [];

      for (let i = 0; i < items.length; ++i) {
        const item = items[i];

        const marker = L.marker(item.latlong)
          .addTo(map)
          .bindPopup(getPopupHTML(item))
          .openPopup();

        markers.push(marker);
      }

      return markers;
    };

    const clearMarkers = function(map, markers) {
      for (let i = 0; i < markers.length; ++i) {
        map.removeLayer(markers[i]);
      }
    };

    const onTitleSelectChange = function(e) {
      const selectedIndex = e.target.selectedIndex;
      clearMarkers(map, markers);

      if (selectedIndex === 0) {
        markers = addMarkers(map, filterByResources(data, startupResources));
      } else if (selectedIndex === 1) {
        markers = addMarkers(map, filterByResources(data, investorResources));
      }
    };

    $("#title-select select").change(onTitleSelectChange);

    $("#last-updated").html(`Last updated: ${new Date().toLocaleString()}`);

    // global
    var markers = addMarkers(map, filterByResources(data, startupResources));
  });

  /*
  new Noty({
    theme: "bulma",
    type: "{{notification.type}}",
    text: "{{notification.message}}",
    timeout: 3500
    // container: ".notification"
  }).show();
  */
});
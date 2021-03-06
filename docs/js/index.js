$(document).ready(function () {
  const map = L.map("mapid").setView([47.541232, 7.604589], 13);

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "pk.eyJ1IjoidmljLWNvZGVjYW1wIiwiYSI6ImNrdGZueGZ1azBhMDYycG1yY2ZmNGJ4cWQifQ.xoYa6-TrQxRND1wHjGYkwg",
  }).addTo(map);

  $.getJSON("data.json", function (data) {
    console.log(data);

    // global
    var markers = addMarkers(map, filterByResources(data, startupResources));

    const onTitleSelectChange = function (e) {
      const selectedIndex = e.target.selectedIndex;
      clearMarkers(map, markers);

      if (selectedIndex === 0) {
        $("#investLink").css("display", "none");
        $("#startLink").css("display", "inherit");
        markers = addMarkers(map, filterByResources(data, startupResources));
      } else if (selectedIndex === 1) {
        $("#investLink").css("display", "inherit");
        $("#startLink").css("display", "none");
        markers = addMarkers(map, filterByResources(data, investorResources));
      }
    };

    const onDataTableFilterChange = function (e) {
      const value = e.target.value;
      $("#data-table tbody").html(getDataTableRowsHTML(data, value));
    };

    $("#title-select select").change(onTitleSelectChange);
    $("#data-table-filter").keyup(onDataTableFilterChange);
    $("#data-table-filter").change(onDataTableFilterChange);
    $("#data-table-filter-clear").click(function () {
      $("#data-table-filter").val("").trigger("change");
    });

    $("#data-table-filter-map-mark").click(function () {
      const filterValue = $("#data-table-filter").val();
      const filteredItems = getDataTableItems(data, filterValue);
      clearMarkers(map, markers);
      markers = addMarkers(map, filteredItems);
    });

    $("#data-table tbody").html(getDataTableRowsHTML(data, ""));
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

const startupResources = [
  "Infrastructure",
  "Rent Spaces",
  "Co-Working",
  "Laboratory Space",
  "Coaching",
  "Accelerator",
  "Workshop",
  "Competition",
  "Funding",
  "Venture Capital",
  "Support",
];

const investorResources = ["Workshop", "Competition", "Start-Up", "Funding", "Venture Capital", "Support"];

const getPopupHTML = function (item) {
  const itemImage = `<p><figure class="image "><img src="${item.image}"></figure></p>`;
  const tagsHTML = `<p class="tags">${item.ressource.map((r) => `<span class="tag">${r}</span>`).join(" ")}</p>`;

  const result = `<p><b><a href="${item.website}">${item.name}</a></b></p><p>${item.description}</p>${tagsHTML}`;
  if (item.zefixUID != "") {
    return (
      result +
      '<a target="zefix" href=\'https://www.uid.admin.ch/Detail.aspx?uid_id=' +
      item.zefixUID +
      "'>" +
      item.zefixUID +
      "</a>"
    );
  }
  return result;
};

const addMarkers = function (map, items) {
  const markers = [];

  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    if (item.latlong && item.latlong.length === 2) {
      const marker = L.marker(item.latlong).addTo(map).bindPopup(getPopupHTML(item)).openPopup();
      markers.push(marker);
    }
  }

  return markers;
};

const clearMarkers = function (map, markers) {
  for (let i = 0; i < markers.length; ++i) {
    map.removeLayer(markers[i]);
  }
};

const filterByResources = function (data, resources) {
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

const getDataTableRowsHTML = function (data, filter) {
  const result = [];

  const items = getDataTableItems(data, filter);

  for (let i = 0; i < items.length; ++i) {
    const item = items[i];

    let row = `<tr>`;
    row += `<td></td>`;
    row += `<td><a href="${item.website}">${item.name}</a></td>`;
    row += `<td>${item.description}</td>`;
    row += `<td class="is-hidden-mobile">${item.email}</td>`;
    row += `<td class="is-hidden-mobile">${item.address}</td>`;
    // row += `<td class="word-break-all"><a href="${item.website}" class="">${item.website}</a></td>`;
    row += `<td><div class="tags">${item.ressource
      .map((r) => `<span class="tag is-link is-light" onclick="onClickTag(this)">${r}</span>`)
      .join(" ")}</div></td>`;
    row += `</tr>`;

    result.push(row);
  }

  return result;
};

const getDataTableItems = function (data, filter) {
  const result = [];

  for (let i = 0; i < data.length; ++i) {
    const item = data[i];
    const lFilter = filter.toUpperCase();

    if (
      lFilter &&
      !item.name.toUpperCase().includes(lFilter) &&
      !item.description.toUpperCase().includes(lFilter) &&
      !item.ressource.join(" ").toUpperCase().includes(lFilter) &&
      !item.address.toUpperCase().includes(lFilter)
    ) {
      continue;
    }

    result.push(item);
  }

  return result;
};

const onClickTag = function (elem) {
  const value = elem.innerText;
  console.log(value);
  $("#data-table-filter").val(value).trigger("change");
};

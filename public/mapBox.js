
mapboxgl.accessToken = mapToken;
campInfo = JSON.parse(campInfo);
console.log(campInfo);
campGeometry = JSON.parse(campGeometry);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mitul30m/clw3mpmgk02ha01qra4u38nhh', // style URL
    center: campGeometry.coordinates, // starting position [lng, lat]
    zoom: 13 // starting zoom
});

const el = document.createElement('div');
el.className = 'marker';
const marker = new mapboxgl.Marker(el)
    .setLngLat(campGeometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 15 }) // add popups
            .setHTML(
                `<h3 class="fs-6 text-secondary fw-bold mb-0">${campInfo}</h3>`
            )
    )
    .addTo(map);


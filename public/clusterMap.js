mapboxgl.accessToken = 'pk.eyJ1IjoibWl0dWwzMG0iLCJhIjoiY2x2a2h2dnBiMDVtdzJrcDNheGhtdTRubCJ9.aTHEIWMBRXxJ6IKKUzIJIA';
const map = new mapboxgl.Map({
    container: 'clusterMap',
    style: 'mapbox://styles/mitul30m/clw3mpmgk02ha01qra4u38nhh', // Change the style to a Mercator-based style
    center: [-98.289017, 37.127709],
    zoom: 4,
});

map.addControl(new mapboxgl.NavigationControl());
map.on('load', () => {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('camps', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ camps
        data: camps,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'camps',
        filter: ['has', 'point_count'],
        paint: {
            // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
            // with three steps to implement three types of circles:
            //   * #AADEC2, 20px circles when point count is less than 10
            //   * #EDB0B9, 30px circles when point count is between 10 and 30
            //   * Pink, 40px circles when point count is greater than or equal to 30
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#AADEC2',
                10,
                '#EDB0B9',
                30,
                '#fff'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                10,
                30,
                30,
                40
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'camps',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'camps',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#000',
            'circle-radius': 5,
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#fff'
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('camps').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });


    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', (e) => {
        const unclusterPointText = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                `

                <div class="w-100 p-0">
                      <div class="card-body">
                        <h5 class="fw-bold fs-6">${unclusterPointText.campName}</h5>
                        <img src="${unclusterPointText.getCampBannerImg}" class="card-img-bottom rounded">    
                       <a href="${unclusterPointText.campLink}" class="btn-outline-dark btn btn-sm my-2 fs-6 text-align-center">Exolore</a>
                     </div>
                </div>
                
                `
            )
            .addTo(map);
    });


    //when user hovers over an unclustered point
    map.on('mouseenter', 'unclustered-point', (e) => {
        map.getCanvas().style.cursor = 'pointer';

        const unclusterPointText = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        popup
            .setLngLat(coordinates)
            .setHTML(
                `
                <div class="w-100 p-0">
                      <div class="card-body">
                        <h5 class="fw-bold fs-6">${unclusterPointText.campName}</h5>
                        <img src="${unclusterPointText.getCampBannerImg}" class="card-img-bottom rounded">    
                       <a href="${unclusterPointText.campLink}" class="btn-outline-dark btn btn-sm my-2 fs-6">Exolore</a>
                     </div>
                </div>
                
                `
            ).addTo(map);
    });
    map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});

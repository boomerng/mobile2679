var map, prevMarker, provinceWrapper,
    provinceInfo = {
        AB: {
            name: 'Alberta',
            premier: 'Rachel Notley',
            address: '10800 97 Ave NW Edmonton, AB T5K 2B6',
            tax: '5%',
            attraction: 'https://www.tripadvisor.ca/Attractions-g154909-Activities-Alberta.html',
            latitude: 53.533835,
            longitude: -113.506499,
        },
        BC: {
            name: 'British Columbia',
            premier: 'John Horgan',
            address: '501 Belleville St, Victoria, BC V8V 2L8',
            tax: '12%',
            attraction: 'https://www.tripadvisor.ca/Attractions-g154922-Activities-British_Columbia.html',
            latitude: 48.419766,
            longitude: -123.370306,
        },
        MB: {
            name: 'Manitoba',
            premier: 'Brian Pallister',
            address: '450 Broadway, Winnipeg, MB R3C 1S4',
            tax: '13%',
            attraction: 'https://www.tripadvisor.ca/Attractions-g154950-Activities-Manitoba.html',
            latitude: 49.884614,
            longitude: -97.146304,
        },
        NB: {
            name: 'New Brunswick',
            premier: 'Brian Gallant',
            address: '706 Queen St, Fredericton, NB E3B 1C5',
            tax: '15%',
            attraction: 'https://www.tripadvisor.ca/Attractions-g154956-Activities-New_Brunswick.html',
            latitude: 45.959441,
            longitude: -66.635997,
        },
        NL: {
            name: 'Newfoundland and Labrador',
            premier: 'Dwight Ball',
            address: '100 Prince Philip Dr, St. John\'s, NL A1B 3R4',
            tax: '15%',
            attraction: 'https://www.tripadvisor.ca/Attractions-g154962-Activities-Newfoundland_and_Labrador.html',
            latitude: 47.583329,
            longitude: -52.723786,
        },
        NS: {
            name: 'Nova Scotia',
            premier: 'Stephen McNeil',
            address: '1740 Granville St, Halifax, NS B3J 1X5',
            tax: '15%',
            attraction: 'https://www.tripadvisor.ca/Attractions-g154967-Activities-Nova_Scotia.html',
            latitude: 44.648010,
            longitude: -63.573393,
        },
        ON: {
            name: 'Ontario',
            premier: 'Doug Ford',
            address: '514 Parliament St, Toronto, ON M4X 1P4',
            tax: '13%',
            attraction: 'https://www.tripadvisor.ca/Attractions-g154979-Activities-Ontario.html',
            latitude: 43.6656362,
            longitude: -79.3709436,
        },
        PE: {
            name: 'Prince Edward Island',
            premier: 'Wade MacLauchlan',
            address: '165 Richmond St, Charlottetown, PE C1A 1J1',
            tax: '15%',
            attraction: 'https://www.tripadvisor.ca/Attractions-g155022-Activities-Prince_Edward_Island.html',
            latitude: 46.234898,
            longitude: -63.125658,
        },
        QC: {
            name: 'Quebec',
            premier: 'François Legault',
            address: '1045 Rue Des Parliamentaires, Quebec City, QC G1A 1A3',
            tax: '14.975%',
            attraction: 'https://www.tripadvisor.ca/Attractions-g155033-Activities-Quebec_City_Quebec.html',
            latitude: 46.808537,
            longitude: -71.214222,
        },
        SK: {
            name: 'Saskatchewan',
            premier: 'Scott Moe',
            address: '2405 Legislative Dr, Regina, SK S4S 0B3',
            tax: '11%',
            attraction: 'https://www.tripadvisor.ca/Attractions-g155038-Activities-Saskatchewan.html',
            latitude: 50.432484,
            longitude: -104.615137,
        },
        NT: {
            name: 'Northwest Territories',
            premier: 'Bob McLeod',
            address: '5003 49 St, Yellowknife, NT X1A 1P5',
            tax: '5%',
            attraction: 'https://www.tripadvisor.ca/Attractions-g154965-Activities-Northwest_Territories.html',
            latitude: 62.454519,
            longitude: -114.370000,
        },
        NU: {
            name: 'Nunavut',
            premier: 'Joe Savikataaq',
            address: '926 Federal Rd, Iqaluit, NU X0A 0H0',
            tax: '5%',
            attraction: 'https://www.tripadvisor.ca/Attractions-g154978-Activities-Nunavut.html',
            latitude: 63.750246,
            longitude: -68.523187,
        },
        YT: {
            name: 'Yukon',
            premier: 'Sandy Silver',
            address: '2071 2nd Ave, Whitehorse, YT Y1A 1B2',
            tax: '5%',
            attraction: 'https://www.tripadvisor.ca/Attractions-g155045-Activities-Yukon.html',
            latitude: 60.716935,
            longitude: -135.048626,
        },
    };

function InitializeMap() {
    map = L.map('map').setView([0,0], 2);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		id: 'mapbox.streets'
    }).addTo(map);
    provinceWrapper = document.getElementById('province-wrapper');
    provinceWrapper.style.display = 'none';
};

var showPosition = function(position, popup) {
    if (prevMarker) {
        prevMarker.remove();
    }

    map.setView([position.coords.latitude, position.coords.longitude], 15);
    prevMarker = L.marker([position.coords.latitude, position.coords.longitude]);
    if (popup) {
        prevMarker.addTo(map).bindPopup(popup).openPopup();
    } else {
        prevMarker.addTo(map);
    }
};

var getGeoLocationClick = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showProvinceWrapper);
    } else {
        showProvinceWrapper();
    }
};

var getProvinceInfoChange = function(value) {
    provinceIn = provinceInfo[value];

    function getPopupInfo(pInfo) {
        var infoKeys = Object.keys(pInfo),
            infoText = '';
        infoKeys.forEach(function(key) {
            infoText += '<b>' + key + '</b>: ' + pInfo[key] + '<br />';
        });
        return infoText;
    };

    if (provinceIn) {
        showPosition({
            coords: {
                latitude: provinceIn.latitude,
                longitude: provinceIn.longitude,
            }
        }, getPopupInfo(provinceIn));
    }

};

var showProvinceWrapper = function() {
    provinceWrapper.style.display = 'flex';
};

window.onload = InitializeMap;
/**
 *Dataset of Sites to Behold
 */
var myLocations = [
	{
		siteId: 1100,
		siteName: 'Cristo Redentor',
		lat: -22.9518763,
		lng: -43.2112374,
		placeId: 'ChIJP6FKmNV_mQAR3gKVAdeEyZ0',
		wikiKey: 'Christ_the_Redeemer_(statue)',
		country: 'Brazil'
    },
	{
		siteId: 438,
		siteName: 'The Great Wall of Badaling',
		lat: 40.357584,
		lng: 116.017822,
		placeId: 'ChIJFbdOF22T8DURnEAe0oca7LM',
		wikiKey: 'Great_Wall_of_China',
		country: 'China'
    },
	{
		siteId: 441,
		siteName: 'Mausoleum of the First Qin Emperor',
		lat: 34.377564,
		lng: 109.258013,
		placeId: 'ChIJCZeK772gZDYR3ERa7J2_JdY',
		wikiKey: 'Mausoleum_of_the_First_Qin_Emperor',
		country: 'China'
    },
	{
		siteId: 526,
		siteName: 'Alcazar de Diego Colon',
		lat: 18.4773854,
		lng: -69.8830572,
		placeId: 'ChIJV3ejOxaIr44R5tZj2EjXHWU',
		wikiKey: 'Alcázar_de_Colón',
		country: 'Dominican Republic'
    },
	{
		siteId: 86,
		siteName: 'The Great Pyramid at Giza',
		lat: 29.9772962,
		lng: 31.1303015,
		placeId: 'ChIJGymPrIdFWBQRJCSloj8vDIE',
		wikiKey: 'Great_Pyramid_of_Giza',
		country: 'Egypt'
    },
	{
		siteId: 87,
		siteName: 'Great Spinx of Giza',
		lat: 29.97496,
		lng: 31.1364519,
		placeId: 'ChIJeamuo2JPWBQRqb1mQKbw08k',
		wikiKey: 'Great_Sphinx_of_Giza',
		country: 'Egypt'
    },
	{
		siteId: 80,
		siteName: 'Mont-Saint-Michel and its Bay',
		lat: 48.6360166,
		lng: -1.5133085,
		placeId: 'ChIJwccMN0RYBkgRlp_YeSIlOzs',
		wikiKey: 'Mont_Saint-Michel_Bay',
		country: 'France'
    },
	{
		siteId: 81,
		siteName: 'Chartres Cathedral',
		lat: 48.4478026,
		lng: 1.4869519,
		placeId: 'ChIJlYA6J0QM5EcRISiIn2K1IBs',
		wikiKey: 'Chartres_Cathedral',
		country: 'France'
    },
	{
		siteId: 83,
		siteName: 'Chateau de Versailles',
		lat: 48.8073846,
		lng: 2.1052098,
		placeId: 'ChIJdUyx15R95kcRj85ZX8H8OAU',
		wikiKey: 'Palace_of_Versailles',
		country: 'France'
    },
	{
		siteId: 897,
		siteName: 'Wartburg Castle',
		lat: 50.9663423,
		lng: 10.3041484,
		placeId: 'ChIJMR-Kc3CcpEcR0OqU8OullQg',
		wikiKey: 'Wartburg',
		country: 'Germany'
    },
	{
		siteId: 393,
		siteName: 'Delphi',
		lat: 38.4823868,
		lng: 22.4987759,
		placeId: 'ChIJ8bYp9l15XxMRVJB-uaPfO8o',
		wikiKey: 'Delphi',
		country: 'Greece'
    },
	{
		siteId: 404,
		siteName: 'Acropolis, Athens',
		lat: 37.9715323,
		lng: 23.7235552,
		placeId: 'ChIJ86z1Nxi9oRQR9g3r9ULAl1w',
		wikiKey: 'Acropolis_of_Athens',
		country: 'Greece'
    },
	{
		siteId: 454,
		siteName: 'Mount Athos',
		lat: 40.1535416,
		lng: 24.3155917,
		placeId: 'ChIJWTaPYaFIrxQREX9MeLyviB8',
		wikiKey: 'Mount_Athos',
		country: 'Greece'
    },
	{
		siteId: 286,
		siteName: 'Vatican City',
		lat: 41.902141,
		lng: 12.453926,
		placeId: 'ChIJPS3UVwqJJRMRsH46sppPCQA',
		wikiKey: 'Vatican_City',
		country: 'Holy See'
    },
	{
		siteId: 252,
		siteName: 'Taj Mahal',
		lat: 27.1750151,
		lng: 78.0399612,
		placeId: 'ChIJPRQcHyBxdDkRs1lw_Dj1QnU',
		wikiKey: 'Taj_Mahal',
		country: 'India'
    },
	{
		siteId: 114,
		siteName: 'Persepolis',
		lat: 29.9355133,
		lng: 52.8904617,
		placeId: 'ChIJba3wXF_jrT8R7s-Xacc-NgI',
		wikiKey: 'Persepolis',
		country: 'Iran'
    }

];


//set globabl variables
var $, global, ko, map, bounds, placesService, styledMapType, mapTypeIds, infowindow;
var currentInfoWindows = []; //tracks open infowindows to help close all at once.
var allLocations = [];
var inProgress = 0; //keeps track of pending responses from Ajax calls to Wikipedia.

//Clicking anywhere other than the filter box causes the list box to hide.
$( document ).on( 'click', function ( e ) {
	if ( $( e.target ).is( '#search-box' ) || $( e.target ).is( '#results' ) ) {
		$( '#results' ).show();
	} else {
		$( '#results' ).hide();
	}
} );

function arrayObjectIndexOf( myArray, searchTerm, property ) {
	for ( var i = 0, len = myArray.length; i < len; i++ ) {
		if ( myArray[ i ][ property ] === searchTerm ) return i;
	}
	return -1;
}

/**
 *This function creates an object containing Google Map objects
 *for each location in the location list.
 */
var Location = function ( data ) {
	var self = this;

	//Set data model
	self.siteId = ko.observable( data.siteId );
	self.siteName = ko.observable( data.siteName );
	self.lat = ko.observable( data.lat );
	self.lng = ko.observable( data.lng );
	self.latLng = ko.computed( function () {
		return data.lat + ", " + data.lng;
	} );
	self.placeId = ko.observable( data.placeId );
	self.wikiKey = ko.observable( data.wikiKey );
	self.wikiImg = ko.observable( ' ' );
	self.wikiExtract = ko.observable( ' ' );

	self.country = ko.observable( data.country );

	self.hideDetailsPanel( false );

	self.visible = ko.observable( true );

	self.hasChanged = ko.observable( false );


	//prepare a placeId object for submission to Places API
	var Request = {
		placeId: data.placeId
	};

	//call place API using placeId
	placesService.getDetails( Request, callback );

	function callback( results, status ) {
		if ( status == google.maps.places.PlacesServiceStatus.OK ) {
			self.createMarker( results, status, data );
		}
	}
};


Location.prototype.createMarker = function ( place, status, data ) {

	var self = this;
	var infoPic = null;
	var regularPic = null,
		hoverPic = null,
		clickPic = null;
	var regularIcon = null,
		hoverIcon = null,
		clickIcon = null;

	var photos = place.photos;


	if ( photos ) {
		infoPic = photos[ 0 ].getUrl( {
			'maxWidth': 250,
			'maxHeight': 200
		} );

		/*Create markers with images, if available.
		 *  Otherwise use regular markers
		 */

		regularPic = {
			url: photos[ 0 ].getUrl( {
				'maxWidth': 75,
				'maxHeight': 75
			} ),
		};

		hoverPic = {
			url: photos[ 1 ].getUrl( {
				'maxWidth': 75,
				'maxHeight': 75
			} ),
		};

		clickPic = {
			url: photos[ 2 ].getUrl( {
				'maxWidth': 75,
				'maxHeight': 75
			} ),
		};
	}
	//If place found but no picture, then use default markers.
	regularIcon = {
		url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FE7569|40|_|%E2%80%A2',
		size: new google.maps.Size( 21, 34 ),
		origin: new google.maps.Point( 0, 0 ),
		anchor: new google.maps.Point( 10, 34 ),
		scaledSize: new google.maps.Size( 21, 34 )
	};

	hoverIcon = {
		url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FFFF24|40|_|%E2%80%A2',
		size: new google.maps.Size( 21, 34 ),
		origin: new google.maps.Point( 0, 0 ),
		anchor: new google.maps.Point( 10, 34 ),
		scaledSize: new google.maps.Size( 21, 34 )
	};

	clickIcon = {
		url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FE7569|40|_|%E2%80%A2',
		size: new google.maps.Size( 21, 34 ),
		origin: new google.maps.Point( 0, 0 ),
		anchor: new google.maps.Point( 10, 34 ),
		scaledSize: new google.maps.Size( 21, 34 )
	};

	/**
	 * Populate the infowindow according to the available data.
	 */
	var info = '<div class="container">';
	if ( typeof ( infoPic ) !== 'undefined' ) {
		info = info + '<div id="pic">';
		info = info + '<img id="infoPic" src="' + infoPic + '"/>';
		info = info + '</div>';
		info = info + '<div id="content">';
	}
	info = info + '<div><h3>' + ( place.name || data.siteName ) + '</h3></div>';
	if ( typeof ( place.formatted_address ) !== 'undefined' ) {
		var address_parts = [];
		address_parts = place.formatted_address.split( ',' );
		address_parts.forEach( function ( part ) {
			info = info + '<div>' + part + '</div>';
		} );
	}
	if ( typeof ( place.formatted_phone_number ) !== 'undefined' ) {
		info = info + '<div>' + place.formatted_phone_number + '</div>';
	}
	if ( typeof ( place.international_phone_number ) !== 'undefined' ) {
		info = info + '<div>' + place.international_phone_number + '</div>';
	}
	if ( typeof ( place.url ) !== 'undefined' ) {
		info = info + '<div><a href="' + place.url + '">Google Page</a></div>';
	}
	if ( typeof ( place.website ) !== 'undefined' ) {
		info = info + '<div><a href="' + place.website + '">Official Website</a></div>';
	}
	info = info + '</div>';
	info = info + '</div>';

	//instantiate marker object
	self.marker = new google.maps.Marker( {
		map: map,
		position: ( place.geometry.location || {
			lat: data.lat,
			lng: data.lng
		} ),
		title: ( place.name || data.siteName ),
		icon: ( regularPic || regularIcon ),
		animation: google.maps.Animation.DROP,

	} );

	/**
	 *Double click on marker zooms in on site instantly.
	 *WikiInfo Panel is displayed.
	 *Double click on marker again to zoom out.
	 */
	self.marker.addListener( 'dblclick', function () {
		map = self.marker.getMap();
		self.marker.setAnimation( null );

		if ( map.getZoom() > 5 ) {
			map.setCenter( new google.maps.LatLngBounds( {
				lat: 0,
				lng: 0
			} ) );
			map.setZoom( 3 );
		} else {
			//self.hideDetailsPanel( false );
			self.closeInfoWindows();
			map.setZoom( 17 );
		}
	} );


	var wikiInfo = function ( wikiKey ) {

		var wikiWait = setTimeout( function () {
			$( 'wikiText' ).html( "failed to get wikipedia resources" );
		}, 5000 );

		function wikiCallback( data ) {
			var resp = data.query.pages;

			var arrExtract = jsonPath( resp, '$..extract' );
			var arrThumb = jsonPath( resp, '$..thumbnail' );

			self.wikiImg( arrThumb[ 0 ].source );
			self.wikiExtract( arrExtract[ 0 ] );

			clearTimeout( wikiWait );
		}

		$.ajax( {
			url: 'http://en.wikipedia.com/w/api.php?action=query&prop=extracts|pageimages&exintro=true&pilimit=1&piprop=thumbnail&pithumbsize=300&titles=' + encodeURIComponent( wikiKey ) + '&format=json&callback=?',
			dataType: "jsonp",
			crossDomain: true,
			success: wikiCallback
		} );

	};

	/**
	 *Single click on a closes all existing infoWindows and displays
	 *a new one for the selected marker.
	 *Wiki query is submitted asynchronously to prepare the WikiPanel
	 *for display.
	 *TODO: add another UX component to allow the user to toggle the wikiPanel.
	 */
	self.marker.addListener( 'click', function () {
		self.closeInfoWindows();
		self.hideDetailsPanel( true );

		wikiInfo( self.wikiKey() );

		map.setCenter( self.marker.getPosition() );
		self.marker.setIcon( clickPic || clickIcon );
		self.marker.setAnimation( google.maps.Animation.BOUNCE );

		var timeoutID = setTimeout( function () {
			self.marker.setIcon( regularPic || regularIcon );
			self.marker.setAnimation( null );

		}, 3000 );

		self.infowindow = new google.maps.InfoWindow();

		self.infowindow.setContent( info );
		self.infowindow.open( map, self.marker );

		currentInfoWindows.push( self.infowindow );

		self.hideDetailsPanel( false );
	} );

	//Designated during list filtering.  Shows the marker on the map if "true"
	self.showMarker = ko.computed( function () {
		self.marker.setVisible( self.visible() );
		return true;
	} );

};

//Closes any open infoWindows
Location.prototype.closeInfoWindows = function () {
	if ( currentInfoWindows.length > 0 ) {
		currentInfoWindows.forEach( function ( currInfoWindow ) {
			currInfoWindow.close();
		} );
		$( detailsPanel ).hide();
	}
};

//Hides WikiPanel if "true", displays panel if "false"
Location.prototype.hideDetailsPanel = function ( bool ) {
	if ( bool ) {
		$( detailsPanel ).hide();
	} else {
		$( detailsPanel ).show();
	}
};



//Method called by list box selection that triggers the marker click event.
// Location.prototype.findSite = function ( clickedLocation ) {
// 	google.maps.event.trigger( clickedLocation.marker, 'click' );
// };


//Main KO ViewModel
var ViewModel = function () {
	var self = this;

	var iter = 1;
	/*used as a multiplier to set intervals to calls
	 *to Google Places API, which limits the number of
	 *queries to 10 per second and then fails.
	 */

	self.searchTerm = ko.observable( "" );

	self.locationList = ko.observableArray( [] );

	self.boundList = ko.observableArray( [] );


	//for each JSON object, create locations KO objects and keep in array.
	myLocations.forEach( function ( locationItem ) {
		window.setTimeout( function () {
			var newLocation = new Location( locationItem );
			self.locationList.push( newLocation );
			allLocations.push( newLocation );
		}, 225 * iter );
		iter++;
	}, self );

	/**
	 *This section handles the filtering of list box items
	 *and returns only the locations that match the filter.
	 */
	self.filteredList = ko.computed( function () {
		var filter = self.searchTerm().toLowerCase();
		if ( !filter ) {
			self.locationList().forEach( function ( locationItem ) {
				locationItem.visible( true );
			} );
			return self.locationList();
		} else {
			return ko.utils.arrayFilter( self.locationList(), function ( locationItem ) {
				var string = locationItem.siteName().toLowerCase();
				var result = ( string.search( filter ) >= 0 );
				locationItem.visible( result );
				return result;
			} );
		}
	}, self );

	self.currLocation = ko.observable( self.filteredList()[ 0 ] );

	self.changeLoc = function ( clickedLocation ) {
		//self.currLocation( clickedLocation );
		self.currLocation( clickedLocation );
		google.maps.event.trigger( clickedLocation.marker, 'click', 'fromVM' );
	};


};

$( detailsPanel ).on( 'click', function () {
	$( detailsPanel ).hide();
} );


ko.applyBindings( new ViewModel() );

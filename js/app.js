var myLocations = [
	{
		siteId: 1100,
		siteName: "Cristo Redentor",
		lat: -22.9518763,
		lng: -43.2112374,
		placeId: "ChIJP6FKmNV_mQAR3gKVAdeEyZ0",
		wikiKey: "Christ_the_Redeemer_(statue)",
		country: "Brazil"
    },
	{
		siteId: 438,
		siteName: "The Great Wall of Badaling",
		lat: 40.357584,
		lng: 116.017822,
		placeId: "ChIJFbdOF22T8DURnEAe0oca7LM",
		wikiKey: "Great_Wall_of_China",
		country: "China"
    },
	{
		siteId: 441,
		siteName: "Mausoleum of the First Qin Emperor",
		lat: 34.377564,
		lng: 109.258013,
		placeId: "ChIJCZeK772gZDYR3ERa7J2_JdY",
		wikiKey: "Mausoleum_of_the_First_Qin_Emperor",
		country: "China"
    },
	{
		siteId: 526,
		siteName: "Alcazar de Diego Colon",
		lat: 18.4773854,
		lng: -69.8830572,
		placeId: "ChIJV3ejOxaIr44R5tZj2EjXHWU",
		wikiKey: "Alcázar_de_Colón",
		country: "Dominican Republic"
    },
	{
		siteId: 86,
		siteName: "The Great Pyramid at Giza",
		lat: 29.9772962,
		lng: 31.1303015,
		placeId: "ChIJGymPrIdFWBQRJCSloj8vDIE",
		wikiKey: "Great_Pyramid_of_Giza",
		country: "Egypt"
    },
	{
		siteId: 87,
		siteName: "Great Spinx of Giza",
		lat: 29.97496,
		lng: 31.1364519,
		placeId: "ChIJeamuo2JPWBQRqb1mQKbw08k",
		wikiKey: "Great_Sphinx_of_Giza",
		country: "Egypt"
    },
	{
		siteId: 80,
		siteName: "Mont-Saint-Michel and its Bay",
		lat: 48.6360166,
		lng: -1.5133085,
		placeId: "ChIJwccMN0RYBkgRlp_YeSIlOzs",
		wikiKey: "Mont_Saint-Michel_Bay",
		country: "France"
    },
	{
		siteId: 81,
		siteName: "Chartres Cathedral",
		lat: 48.4478026,
		lng: 1.4869519,
		placeId: "ChIJKzGHdEgM5EcR_OBTT3nQoEA",
		wikiKey: "Chartres_Cathedral",
		country: "France"
    },
	{
		siteId: 83,
		siteName: "Chateau de Versailles",
		lat: 48.8073846,
		lng: 2.1052098,
		placeId: "ChIJdUyx15R95kcRj85ZX8H8OAU",
		wikiKey: "Palace_of_Versailles",
		country: "France"
    },
	{
		siteId: 897,
		siteName: "Wartburg Castle",
		lat: 50.9663423,
		lng: 10.3041484,
		placeId: "ChIJMR-Kc3CcpEcR0OqU8OullQg",
		wikiKey: "Wartburg",
		country: "Germany"
    },
	{
		siteId: 393,
		siteName: "Delphi",
		lat: 38.4823868,
		lng: 22.4987759,
		placeId: "ChIJn52jvWh5XxMRVRqVI3SRm2Y",
		wikiKey: "Delphi",
		country: "Greece"
    },
	{
		siteId: 404,
		siteName: "Acropolis, Athens",
		lat: 37.9715323,
		lng: 23.7235552,
		placeId: "ChIJhaTPiGV5XxMRW7GMCp-Rul8",
		wikiKey: "Acropolis_of_Athens",
		country: "Greece"
    },
	{
		siteId: 454,
		siteName: "Mount Athos",
		lat: 40.1535416,
		lng: 24.3155917,
		placeId: "ChIJWTaPYaFIrxQREX9MeLyviB8",
		wikiKey: "Mount_Athos",
		country: "Greece"
    },
	{
		siteId: 286,
		siteName: "Vatican City",
		lat: 41.902141,
		lng: 12.453926,
		placeId: "ChIJPS3UVwqJJRMRsH46sppPCQA",
		wikiKey: "Vatican_City",
		country: "Holy See"
    },
	{
		siteId: 252,
		siteName: "Taj Mahal",
		lat: 27.1750151,
		lng: 78.0399612,
		placeId: "ChIJPRQcHyBxdDkRs1lw_Dj1QnU",
		wikiKey: "Taj_Mahal",
		country: "India"
    },
	{
		siteId: 114,
		siteName: "Persepolis",
		lat: 29.9355133,
		lng: 52.8904617,
		placeId: "ChIJba3wXF_jrT8R7s-Xacc-NgI",
		wikiKey: "Persepolis",
		country: "Iran"
    }

];

// Declaring global variables now to satisfy strict mode
//var map;
var $, ko, bounds, placesService;


$( document ).on( "click", function ( e ) {
	if ( $( e.target ).is( "#search-box" ) || $( e.target ).is( "#results" ) ) {
		$( "#results" ).show();
	} else {
		$( "#results" ).hide();
	}
} );



var Location = function ( data ) {
	var self = this;
	var wikiVals = [];


	this.siteId = data.siteId;
	this.siteName = data.siteName;
	this.lat = data.lat;
	this.lng = data.lng;
	this.latLng = ( data.lat + ", " + data.lng );
	this.placeId = data.placeId;
	this.wikiKey = data.wikiKey;
	this.country = data.country;


	this.wikiThumb = "";
	this.wikiExtract = "";

	this.visible = ko.observable( true );



	var wikiUrl = 'http://en.wikipedia.com/w/api.php?action=query&prop=extracts|pageimages&exintro=true&pilimit=1&piprop=thumbnail&pithumbsize=320&titles=' + encodeURIComponent( data.wikiKey ) + '&format=json&callback=?';

	var jqxhr = $.ajax( {
			url: wikiUrl,
			context: this,
			dataType: 'jsonp',
		} ).always( function ( data ) {
			var resp = data.query.pages;

			var arrExtract = jsonPath( resp, "$..extract" );
			self.wikiExtract = arrExtract[ 0 ];
			//console.log( self.wikiExtract );

			var arrThumb = jsonPath( resp, "$..thumbnail" );
			self.wikiThumb = arrThumb[ 0 ].source;
			//console.log( self.wikiThumb );
		} )
		.fail( function ( jqXHR, textStatus ) {
			console.log( "error" );
			console.log( 'Status: ' + textStatus );
		} );

	function makeMarkerIcon( markerColor ) {
		var markerImage = new google.maps.MarkerImage(
			'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
			'|40|_|%E2%80%A2',
			new google.maps.Size( 21, 34 ),
			new google.maps.Point( 0, 0 ),
			new google.maps.Point( 10, 34 ),
			new google.maps.Size( 21, 34 ) );
		return markerImage;
	}

	var defaultIcon = makeMarkerIcon( 'FE7569' );

	var highlightedIcon = makeMarkerIcon( 'ffff24' );

	var Request = {
		placeId: data.placeId
	};

	placesService = new google.maps.places.PlacesService( map );

	this.marker = new google.maps.Marker( {} );

	placesService.getDetails( Request, callback );

	function callback( place, status ) {
		console.log( status );

		if ( status == google.maps.places.PlacesServiceStatus.OK ) {
			createPhotoMarker( place );
		}
	}

	function createPhotoMarker( place ) {
		var photos = place.photos;
		console.log( place.toString );
		if ( !photos ) {
			self.marker = new google.maps.Marker( {
				position: new google.maps.LatLng( data.lat, data.lng ),
				map: map,
				title: data.siteName,
				icon: defaultIcon,
				animation: google.maps.Animation.DROP,
			} );

		} else {
			self.marker = new google.maps.Marker( {
				map: map,
				position: place.geometry.location,
				title: place.name,
				icon: photos[ 0 ].getUrl( {
					'maxWidth': 75,
					'maxHeight': 75
				} ),
				animation: google.maps.Animation.DROP,
			} );
		}
	}


	this.info = '<div class="info-window-content"><div class="title"><b>' + data.siteName + "</b></div>" +
		'<div class="infoContent"><p>' + this.latLng + '</p></div>';

	this.infoWindow = new google.maps.InfoWindow( {
		content: self.info
	} );

	// this.marker = new google.maps.Marker( {
	// 	position: new google.maps.LatLng( data.lat, data.lng ),
	// 	map: map,
	// 	title: data.siteName,
	// 	icon: defaultIcon,
	// 	animation: google.maps.Animation.DROP,
	// } );

	// this.showMarker = ko.computed( function () {
	// 	if ( this.visible() === true ) {
	// 		this.marker.setMap( map );
	// 	} else {
	// 		this.marker.setMap( null );
	// 	}
	// 	return true;
	// }, this );
	//
	// this.marker.addListener( 'mouseover', function () {
	// 	this.setIcon( highlightedIcon );
	// } );
	//
	// this.marker.addListener( 'mouseout', function () {
	// 	this.setIcon( defaultIcon );
	// } );

	// this.bounce = function ( place ) {
	// 	google.maps.event.trigger( self.marker, 'click' );
	// };
	//
	// this.marker.addListener( 'click', function () {
	//
	// 	self.infoWindow.setContent( self.info );
	//
	// 	self.infoWindow.open( map, this );
	//
	// 	self.marker.setAnimation( google.maps.Animation.BOUNCE );
	//
	// 	setTimeout( function () {
	// 		self.marker.setAnimation( null );
	// 	}, 100 );
	// } );

	// map.addListener( 'center_changed', function () {
	// 	// 3 seconds after the center of the map has changed, pan back to the
	// 	// marker.
	// 	window.setTimeout( function () {
	// 		map.panTo( marker.getPosition() );
	// 	}, 3000 );
	// } );

	// this.marker.addListener( 'dblclick', function () {
	// 	self.map = self.marker.getMap();
	// 	//alert( self.map.getZoom() );
	// 	if ( self.map.getZoom() > 5 ) {
	// 		self.map.setCenter( 0, 0 );
	// 		self.map.setZoom( 3 );
	// 	} else {
	// 		self.map.setCenter( self.marker.getPosition() );
	// 		self.map.setZoom( 17 );
	// 		//self.map.panTo( self.marker.getPosition() );
	// 	}
	// } );

};

function ViewModel() {
	var self = this;

	this.searchTerm = ko.observable( "" );

	this.locationList = ko.observableArray( [] );

	myLocations.forEach( function ( locationItem ) {
		self.locationList.push( new Location( locationItem ) );
	} );

	this.filteredList = ko.computed( function () {
		var filter = self.searchTerm().toLowerCase();
		if ( !filter ) {
			self.locationList().forEach( function ( locationItem ) {
				locationItem.visible( true );
			} );
			return self.locationList();
		} else {
			return ko.utils.arrayFilter( self.locationList(), function ( locationItem ) {
				var string = locationItem.siteName.toLowerCase();
				var result = ( string.search( filter ) >= 0 );
				locationItem.visible( result );
				return result;
			} );
		}
	}, self );

	this.filteredList().forEach( function ( locationItem ) {
		bounds.extend( filteredList.marker.getPosition() );
	} );
}

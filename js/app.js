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
var $, ko, map, bounds, placesService, styledMapType, infowindow;


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

	this.geoLoc = null;

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


	var Request = {
		placeId: data.placeId
	};

	this.marker = new google.maps.Marker( {} );

	placesService.getDetails( Request, callback );

	function callback( place, status ) {
		var regularPic = null,
			hoverPic = null,
			clickPic = null;
		var regularIcon = null,
			hoverIcon = null,
			clickIcon = null;



		if ( status == google.maps.places.PlacesServiceStatus.OK ) {
			var photos = place.photos;

			if ( photos ) {
				var infoPic = photos[ 0 ].getUrl( {
					'maxWidth': 250,
					'maxHeight': 200
				} );

				var info = '<div class="container">';
				info = info + '<div id="pic">';
				info = info + '<img id="infoPic" src="' + infoPic + '"/>';
				info = info + "</div>";
				info = info + '<div id="content">';
				if ( typeof ( place.name ) !== "undefined" ) {
					info = info + "<p><h3>" + place.name + "</h3></p>";
				}
				if ( typeof ( place.formatted_address ) !== "undefined" ) {
					info = info + "<p>" + place.formatted_address + "</p>";
				}
				if ( typeof ( place.formatted_phone_number ) !== "undefined" ) {
					info = info + "<p>" + place.formatted_phone_number + "</p>";
				}
				if ( typeof ( place.international_phone_number ) !== "undefined" ) {
					info = info + "<p>" + place.international_phone_number + "</p>";
				}
				if ( typeof ( place.url ) !== "undefined" ) {
					info = info + "<p><a href='" + place.url + "'>Google Page</a></p>";
				}
				if ( typeof ( place.website ) !== "undefined" ) {
					info = info + "<p><a href='" + place.website + "'>Official Website</a></p>";
				}
				info = info + "</div>";
				info = info + "</div>";

				img = photos[ 0 ].getUrl( {
					'maxWidth': 75,
					'maxHeight': 75
				} );

				regularPic = {
					url: img,
				};

				hoverPic = {
					url: img,
				};

				clickPic = {
					url: img,
				};

				self.marker = new google.maps.Marker( {
					map: map,
					position: place.geometry.location,
					title: place.name,
					icon: regularPic,
					animation: google.maps.Animation.DROP,
				} );

			} else {

				regularIcon = {
					url: "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FE7569|40|_|%E2%80%A2",
					size: new google.maps.Size( 21, 34 ),
					origin: new google.maps.Point( 0, 0 ),
					anchor: new google.maps.Point( 10, 34 ),
					scaledSize: new google.maps.Size( 21, 34 )
				};

				hoverIcon = {
					url: "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FFFF24|40|_|%E2%80%A2",
					size: new google.maps.Size( 21, 34 ),
					origin: new google.maps.Point( 0, 0 ),
					anchor: new google.maps.Point( 10, 34 ),
					scaledSize: new google.maps.Size( 21, 34 )
				};

				clickIcon = {
					url: "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FE7569|40|_|%E2%80%A2",
					size: new google.maps.Size( 21, 34 ),
					origin: new google.maps.Point( 0, 0 ),
					anchor: new google.maps.Point( 10, 34 ),
					scaledSize: new google.maps.Size( 21, 34 )
				};

				self.marker = new google.maps.Marker( {
					map: map,
					position: place.geometry.location,
					title: place.name,
					icon: regularIcon,
					animation: google.maps.Animation.DROP,

				} );
			}
		} else {
			regularIcon = {
				url: "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FE7569|40|_|%E2%80%A2",
				size: new google.maps.Size( 21, 34 ),
				origin: new google.maps.Point( 0, 0 ),
				anchor: new google.maps.Point( 10, 34 ),
				scaledSize: new google.maps.Size( 21, 34 )
			};

			hoverIcon = {
				url: "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FFFF24|40|_|%E2%80%A2",
				size: new google.maps.Size( 21, 34 ),
				origin: new google.maps.Point( 0, 0 ),
				anchor: new google.maps.Point( 10, 34 ),
				scaledSize: new google.maps.Size( 21, 34 )
			};

			clickIcon = {
				url: "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FE7569|40|_|%E2%80%A2",
				size: new google.maps.Size( 21, 34 ),
				origin: new google.maps.Point( 0, 0 ),
				anchor: new google.maps.Point( 10, 34 ),
				scaledSize: new google.maps.Size( 21, 34 )
			};

			self.marker = new google.maps.Marker( {
				map: map,
				position: {
					lat: data.lat,
					lng: data.lng
				},
				title: data.siteName,
				icon: regularIcon,
				animation: google.maps.Animation.DROP,
			} );

			console.log( "error : " + status );
		}


		//self.geoLoc = place.geometry.location;

		self.marker.addListener( 'mouseover', function () {
			self.marker.setIcon( hoverPic || hoverIcon );
		} );

		self.marker.addListener( 'mouseout', function () {
			self.marker.setIcon( regularPic || regularIcon );
		} );

		self.marker.addListener( 'click', function () {
			self.marker.setIcon( clickPic || clickIcon );
			self.marker.setAnimation( google.maps.Animation.BOUNCE );
			var timeoutID = setTimeout( function () {
				self.marker.setIcon( regularPic || regularIcon );
				self.marker.setAnimation( null );
			}, 3000 );
		} );

		self.marker.addListener( 'dblclick', function () {
			map = self.marker.getMap();
			self.marker.setAnimation( null );

			if ( map.getZoom() > 5 ) {
				map.setCenter( 0, 0 );
				map.setZoom( 3 );
				map.mapTypes.set( 'styled_map', styledMapType );
				map.setMapTypeID( 'styled_map' );
			} else {
				map.setCenter( self.marker.getPosition() );
				map.setZoom( 17 );
				map.setMapTypeId( 'satellite' );
			}
		} );

		self.showMarker = ko.computed( function () {
			if ( self.visible() === true ) {
				self.marker.setMap( map );
			} else {
				self.marker.setMap( null );
			}
			return true;
		} );


		google.maps.event.addListener( self.marker, 'click', function () {
			if ( !self.infowindow ) {
				self.infowindow = new google.maps.InfoWindow();
			}

			self.infowindow.setContent( info );
			self.infowindow.open( map, self.marker );
		} );

		// google.map.event.addListener( self.infowindow, 'click', function () {
		// 	$( document ).getElementById( "infoImg" ).src = photos[ 1 ].getUrl( {
		// 		'maxWidth': 75,
		// 		'maxHeight': 75
		// 	} );
		// } );
	}

};

function ViewModel() {
	var self = this;
	var iter = 1;

	this.searchTerm = ko.observable( "" );

	this.locationList = ko.observableArray( [] );

	this.boundList = ko.observableArray( [] );

	myLocations.forEach( function ( locationItem ) {
		window.setTimeout( function () {
			self.locationList.push( new Location( locationItem ) );
		}, 225 * iter );
		iter++;
	}, self );


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

	this.teleport = function ( locationItem ) {
		self.filteredList( locationItem );
		// this.bounce = function () {
		// 	google.maps.event.trigger( self.marker, 'click' );
		// };

	};



}

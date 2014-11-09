// declare remix vars
var apiKey = 'TRZJMRXITQGIFF6LK';
var trackID = 'TRACK-ID-HERE';
var trackURL = '../static/audio/katie.mp3'
var jingleURL = '../static/audio/jinglebell_hit-f.mp3'

var context;
var jingleBuffer;

var remixer;
var player;
var track;
var remixed;


// delacre snow3d vars
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var container;

var particle;

var camera;
var scene;
var renderer;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var particles = [];
var particleImage = new Image();//THREE.ImageUtils.loadTexture( "img/ParticleSmoke.png" );
particleImage.src = '../static/img/ParticleSmoke.png';


function snow3d() {

  	container = document.createElement('div');
  	document.body.appendChild(container);

  	camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
  	camera.position.z = 1000;

  	scene = new THREE.Scene();
  	scene.add(camera);

  	renderer = new THREE.CanvasRenderer();
  	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  	var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );

  	for (var i = 0; i < 500; i++) {

  		particle = new Particle3D( material);
  		particle.position.x = Math.random() * 2000 - 1000;
  		particle.position.y = Math.random() * 2000 - 1000;
  		particle.position.z = Math.random() * 2000 - 1000;
  		particle.scale.x = particle.scale.y =  1;
  		scene.add( particle );

  		particles.push(particle);
  	}

  	container.appendChild( renderer.domElement );


  	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

  	setInterval( loop, 1000 / 60 );

  function onDocumentMouseMove( event ) {

  	mouseX = event.clientX - windowHalfX;
  	mouseY = event.clientY - windowHalfY;
  }

  function onDocumentTouchStart( event ) {

  	if ( event.touches.length == 1 ) {

  		event.preventDefault();

  		mouseX = event.touches[ 0 ].pageX - windowHalfX;
  		mouseY = event.touches[ 0 ].pageY - windowHalfY;
  	}
  }

  function onDocumentTouchMove( event ) {

  	if ( event.touches.length == 1 ) {

  		event.preventDefault();

  		mouseX = event.touches[ 0 ].pageX - windowHalfX;
  		mouseY = event.touches[ 0 ].pageY - windowHalfY;
  	}
  }

  //

  function loop() {

  for(var i = 0; i<particles.length; i++)
  	{

  		var particle = particles[i];
  		particle.updatePhysics();

  		with(particle.position)
  		{
  			if(y<-1000) y+=2000;
  			if(x>1000) x-=2000;
  			else if(x<-1000) x+=2000;
  			if(z>1000) z-=2000;
  			else if(z<-1000) z+=2000;
  		}
  	}

  	camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  	camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
  	camera.lookAt(scene.position);

  	renderer.render( scene, camera );


  }
}




function jingleRemix() {
    var contextFunction = window.webkitAudioContext || window.AudioContext;
    if (contextFunction === undefined) {
        $("#info").text("Sorry, this app needs advanced web audio. Your browser doesn't"
            + " support it. Try the latest version of Chrome?");
    } else {
        var context = new contextFunction();

        // Load jingle
        var request = new XMLHttpRequest();
        request.open('GET', jingleURL, true);
        request.responseType = 'arraybuffer';

        request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            jingleBuffer = buffer;
        });
        }
        request.send();


        remixer = createJRemixer(context, $, apiKey);
        player = remixer.getPlayer();
        $("#info").text("Loading analysis data...");

        remixer.remixTrackById(trackID, trackURL, function(t, percent) {
            track = t;

            $("#info").text(percent + "% of the track loaded");
            if (percent == 100) {
                $("#info").text(percent + "% of the track loaded, remixing...");
            }

            if (track.status == 'ok') {
                remixed = track.analysis.beats;
                for (var i=0; i < remixed.length; i++) {
                    if (i % 2 == 1) {
                        remixed[i].syncBuffer = jingleBuffer;
                    }
                }
                $("#info").text("Remix complete!");
            }
        });
    }
}

function jingleInit() {
  jingleRemix();
  snow3d();
}

window.onload = jingleInit;

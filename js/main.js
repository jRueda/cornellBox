WIDTH = window.innerWidth; // Ancho de pantalla
HEIGHT = window.innerHeight; // Alto de pantalla

// visor u objeto encargado del renderizado
var visor = new THREE.WebGLRenderer({antialias: true});
visor.shadowMapEnabled = true;
// Establecemos las dimensiones del visor
visor.setSize(
	WIDTH,
	HEIGHT
);

// Añadimos el visor a la página
document.body.appendChild(visor.domElement);

// Creamos la escena
var escena = new THREE.Scene;

//GEOMETRY//
/*------------ esfera ----------------

// Creamos un poligono
var geometriaesfera = new THREE.CubeGeometry(
	100, // Dimensiones en eje X
	140, // Dimensiones en eje Y
	100 // Dimensiones en eje Z
);


// Creamos una apariencia (de lila claro)
var aparienciaLila = new THREE.MeshLambertMaterial({
	color: 0x9999FF // Color hexadecimal
});

// Generamos el polígino y le aplicamos la apariencia
var esfera = new THREE.Mesh(geometriaesfera, aparienciaLila);

// Añadimos el esfera a la escena
escena.add(esfera);

/*-------------- END esfera --------------*/



/*------------ ESFERA ----------------*/


var geometriaEsfera = new THREE.SphereGeometry(
	25, // radio
	32, // subdivisiones width
	32 // subdivisiones heigth
);

var aparienciaEspejo = new THREE.MeshPhongMaterial( { ambient: 0x000000, color: 0xffffff, specular: 0xffffff, shininess: 100 } );

// Generamos el polígino y le aplicamos la apariencia
var esfera = new THREE.Mesh(geometriaEsfera, aparienciaEspejo);


esfera.position.z = 50;
esfera.position.y = -25;

esfera.receiveShadow = true;
esfera.castShadow = true;

// Añadimos el esfera a la escena
escena.add(esfera);

/*-------------- END ESFERA --------------*/


/*------------ PLANOS ----------------*/
var geometriaPlano = new THREE.PlaneGeometry( 100, 100, 32 ); 
var geometriaSuelo = new THREE.PlaneGeometry( 1000, 1000, 32 );
var materialPlanoBlanco = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide} ); 
var materialPlanoVerde = new THREE.MeshLambertMaterial( {color: 0x00ff00, side: THREE.DoubleSide} ); 
var materialPlanoRojo = new THREE.MeshLambertMaterial( {color: 0xff0000, side: THREE.DoubleSide} ); 
var suelo = new THREE.Mesh( geometriaSuelo, materialPlanoBlanco ); 
var planoBack = new THREE.Mesh( geometriaPlano, materialPlanoBlanco ); 
var planoBottom = new THREE.Mesh( geometriaPlano, materialPlanoBlanco ); 
var planoTop = new THREE.Mesh( geometriaPlano, materialPlanoBlanco ); 
var planoLeft = new THREE.Mesh( geometriaPlano, materialPlanoRojo );
var planoRight = new THREE.Mesh( geometriaPlano, materialPlanoVerde );


//Ojo, la rotación es en radianes, no en grados.
planoLeft.rotation.y = Math.PI / 2;
planoRight.rotation.y = Math.PI / 2;
planoBottom.rotation.x = Math.PI / 2;
planoTop.rotation.x = Math.PI / 2;
suelo.rotation.x = Math.PI / 2;


suelo.position.y = -51;

planoLeft.position.x = -50;
planoLeft.position.z = 50;

planoRight.position.x = 50;
planoRight.position.z = 50;

planoBottom.position.y = -50;
planoBottom.position.z = 50;

planoTop.position.y = 50;
planoTop.position.z = 50;


planoBottom.receiveShadow = true;
planoBack.receiveShadow = true;
planoTop.receiveShadow = true;
planoRight.receiveShadow = true;
planoLeft.receiveShadow = true;
planoBottom.castShadow = true;
planoBack.castShadow = true;
planoTop.castShadow = true;
planoRight.castShadow = true;
planoLeft.castShadow = true;
suelo.castShadow = true;


escena.add( planoBack );
escena.add( planoLeft );
escena.add( planoRight );
escena.add( planoBottom );
escena.add( planoTop );
escena.add( suelo );

/*-------------- END PLANOS --------------*/





// Generamos la cámara
var camara = new THREE.PerspectiveCamera(
	45,
	(WIDTH / HEIGHT),
	0.1,
	10000
);

// Situamos la cámara
camara.position.y = 10;
camara.position.z = 300;
camara.position.x = 10;

// Centramos la vista en el esfera
camara.lookAt(esfera.position);

// Añadimos la cámara a la escena
escena.add(camara);




/* -------- LUCES -----------*/


//var luzAmbiente = new THREE.AmbientLight( 0xffffff, 0.001 ); // soft white light scene.add( light );


var spotLight = new THREE.SpotLight( 0xffffff, 1); 
spotLight.position.set( 00, 300, 0 ); 
spotLight.castShadow = true; 
spotLight.shadowMapWidth = 1024; 
spotLight.shadowMapHeight = 1024; 
spotLight.shadowCameraNear = 500; 
spotLight.shadowCameraFar = 4000; 
spotLight.shadowCameraFov = 30; 



/*
// Creamos una par de focos de luz
var luz1 = new THREE.PointLight(0xffffff, 0.25); // Rojizo
luz1.position.set(
	0, // Posición en eje X
	-10, // Posición en eje Y
	50	 // Posición en eje Z
);
*/


// Añadimos las luces
escena.add( spotLight );
//escena.add(luz1);
//escena.add(luzAmbiente);

/*-------------- FIN LUCES -----------------*/



/*x=0;
function renderizar(){
	// Rotamos el esfera
	esfera.rotation.y += Math.PI * 0.5 / 180;
	esfera.rotation.z += Math.PI * Math.cos(x++ / 50) / 180;
	// Renderizamos la escena
	visor.render(escena, camara);
	// Volvemos a renderizar
	requestAnimationFrame(renderizar);
}

// Empezamos a renderizar
renderizar();
*/
visor.render(escena, camara);
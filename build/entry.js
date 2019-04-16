var scene = new THREE.Scene();
var clock = new THREE.Clock();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var effectGlitch = new THREE.GlitchPass()
var composer = new THREE.EffectComposer(renderer)
var renderPass = new THREE.RenderPass(scene, camera)
var effect = new THREE.AnaglyphEffect(renderer, window.innerWidth, window.innerHeight);


composer.addPass(renderPass)
composer.addPass(effectGlitch)
composer.setSize(window.innerWidth / 2, window.innerHeight / 2)
effectGlitch.goWild = true
effectGlitch.renderToScreen = true
var intersectedObject, mouseOn;

camera.position.z = 20;
camera.position.y = 10
camera.lookAt(new THREE.Vector3());

renderer.setSize(window.innerWidth, window.innerHeight);
var planeGeo = new THREE.PlaneGeometry(50, 50);
var planeMat = new THREE.MeshBasicMaterial({ color: 'gray' });
planeMat.side = THREE.DoubleSide;
var plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x += 1.5708
// scene.add(plane);

var typed = new Typed('#typed', {
  stringsElement: '#typed-strings',
  typeSpeed: -1000,
  fadeOut: true,
  fadeOutDelay: false,
  onStringTyped: function (pos, self) { 
    setTimeout(function () { effectGlitch.goWild = true; }, 600);
    setTimeout(function () { effectGlitch.goWild = false; }, 700);
   },
  onComplete: function () { 
    $('#asciiContainer').load('./assets/ascii/fish.html');
  }
});
var cubeGeo = new THREE.BoxGeometry(5, 5, 5);
var cubeMat = new THREE.MeshBasicMaterial({ color: 'green' });
var cube = new THREE.Mesh(cubeGeo, cubeMat);
cube.position.y = 2.5
// scene.add(cube);
setTimeout(function () { effectGlitch.goWild = false; }, 1000);

var onMouseMove = function (e) {
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);
  if (!intersects[0]) {
    intersectedObject = null
  }
  if (intersects[0] && intersects[0].object !== intersectedObject) { 
      intersectedObject = intersects[0].object
  }
  mouse.x = event.clientX / window.innerWidth * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

var onMouseDown = function (e) {
  console.log(intersectedObject)
};

var onKeyUp = function (e) {
  console.log(e.keyCode)
};

var animate = function () {
  renderer.render(scene, camera);
  effect.render(scene, camera);
  composer.render(clock.getDelta());
  controls.update;
  requestAnimationFrame(animate);

};
animate();

var windowResizeHandler = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHandler();

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('keyup', onKeyUp, false);
window.addEventListener('resize', windowResizeHandler);

document.body.style.margin = 0;
$('#three-content').append(renderer.domElement);
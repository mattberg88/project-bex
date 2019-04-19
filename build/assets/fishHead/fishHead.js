var scene = new THREE.Scene();
var clock = new THREE.Clock();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls(camera);
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
setTimeout(function () { effectGlitch.goWild = false; }, 1000);
var intersectedObject, mouseOn;
scene.position.y -= 10
camera.position.z = 10;
camera.position.y = 10
camera.lookAt(new THREE.Vector3());
var light = new THREE.DirectionalLight('white');
light.intensity = 2;
light.position.x = 10
light.position.z = 10
scene.add(light);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('rgb(2, 8, 2)')
var planeGeo = new THREE.PlaneGeometry(50, 50);
var planeMat = new THREE.MeshBasicMaterial({ color: 'gray' });
planeMat.side = THREE.DoubleSide;
var plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x += 1.5708
scene.add(plane);

var gltfObject = null;
var material = null;
var mixer = null;
var loader = new THREE.GLTFLoader();
loader.load('assets/gltf/fishheadph1.gltf', function (obj) {
  obj.scene.children[0].scale.x -= 0.9
  obj.scene.children[0].scale.y -= 0.9
  obj.scene.children[0].scale.z -= 0.9
  obj.scene.children[0].position.y -= 1.4

  scene.add(obj.scene);
});

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
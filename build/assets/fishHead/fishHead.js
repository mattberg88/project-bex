var scene = new THREE.Scene();
var clock = new THREE.Clock();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});
var controls = new THREE.OrbitControls(camera);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var effectGlitch = new THREE.GlitchPass()
var composer = new THREE.EffectComposer(renderer)
var renderPass = new THREE.RenderPass(scene, camera)
var effect = new THREE.AnaglyphEffect(renderer, window.innerWidth, window.innerHeight);

controls.enableZoom = false;
controls.enablePan = false;

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
light.position.y = 30
light.position.z = 5
scene.add(light);
var light2 = new THREE.DirectionalLight('white');
light2.intensity = 1;
light2.position.x = -10
light.position.y = 10
light2.position.z = -15
scene.add(light2);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('rgb(2, 8, 2)')

var idleAnim, twistAnim;
var gltfObject = null;
var material = null;
var mixer = null;
var loader = new THREE.GLTFLoader();
loader.load('assets/gltf/fishheadph1test3.gltf', function (obj) {
  obj.scene.children[0].scale.x = 0.1
  obj.scene.children[0].scale.y = 0.1
  obj.scene.children[0].scale.z = 0.1
  obj.scene.children[0].position.y -= 1.4

  scene.add(obj.scene);
  mixer = new THREE.AnimationMixer(obj.scene);
  var clips = obj.animations
  console.log(clips)
  var idleClip = new THREE.AnimationClip.findByName(clips, "Key|Take 001|BaseLayer");
  var twistClip = new THREE.AnimationClip.findByName(clips, "Armature|Take 001|BaseLayer");
  idleAnim = mixer.clipAction(idleClip);
  twistAnim = mixer.clipAction(twistClip);
  idleAnim.play();
  twistAnim.play();
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
  if (mixer) {
  }

  renderer.render(scene, camera);
  effect.render(scene, camera);
  composer.render(clock.getDelta());
  controls.update;
  requestAnimationFrame(animate);
};
animate();
var scrollHandler = function () {
  console.log('scroll')
  mixer.update(clock.getDelta());

};
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
window.addEventListener('wheel', scrollHandler);
document.body.style.margin = 0;
$('#three-content').append(renderer.domElement);
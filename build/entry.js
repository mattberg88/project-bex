var scene = new THREE.Scene();
var clock = new THREE.Clock();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var effectGlitch = new THREE.GlitchPass()
var composer = new THREE.EffectComposer(renderer)
var renderPass = new THREE.RenderPass(scene, camera)
var effect = new THREE.AnaglyphEffect(renderer, window.innerWidth, window.innerHeight);

composer.addPass(renderPass)
composer.addPass(effectGlitch)
composer.setSize(window.innerWidth / 2, window.innerHeight / 2)
effectGlitch.goWild = true
effectGlitch.renderToScreen = true
setTimeout(function () { effectGlitch.goWild = false; }, 400);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('rgb(2, 8, 2)')

var state = 0;
var typed = new Typed('#typed', {
  stringsElement: '#typed-strings',
  fadeOut: true,
  fadeOutDelay: false,
  onComplete: function () { 
    loadMenu()
  }
});

var loadMenu = function() {
  setTimeout(function () { effectGlitch.goWild = true; }, 10);
  setTimeout(function () { effectGlitch.goWild = false; }, 100);
  state = 1;
  typed.destroy()
  $('#asciiContainer').load('./assets/html/fish.html');
  setTimeout(function () {
    effectGlitch.goWild = true;
    setTimeout(function () { effectGlitch.goWild = false; }, 100);
    $('#asciiContainer').hide()
    $('#menu-content').load('./assets/html/menu.html')
  }, 3000);
}

var onMouseDown = function (e) {
  if(state === 0) loadMenu();
};


var animate = function () {
  renderer.render(scene, camera);
  effect.render(scene, camera);
  composer.render(clock.getDelta());
  requestAnimationFrame(animate);
};
animate();

var windowResizeHandler = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHandler();

window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('resize', windowResizeHandler);

document.body.style.margin = 0;
$('#three-content').append(renderer.domElement);
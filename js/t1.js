var proton, emitter1, emitter2, R;
var camera, scene, renderer, stats, clock, spring, controls;

setTimeout(init,10);

function init() {
    addScene();
    addControls();
    addLights();
    addStars();
    addProton();
    //addInteraction();
    addStats();
    animate();
}

function addScene() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 1, 10000);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function addControls() {
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
}

function addLights() {
    var ambientLight = new THREE.AmbientLight(0x101010);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);
}

function addStats() {
    stats = new Stats();
    stats.showPanel(0);
    stats.dom.style.position = 'absolute';
    stats.dom.style.left = '0px';
    stats.dom.style.top = '0px';
    container.appendChild(stats.dom);
}

function addStars() {
    var geometry = new THREE.Geometry();
    for (var i = 0; i < 10000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = THREE.Math.randFloatSpread(2000);
        vertex.y = THREE.Math.randFloatSpread(2000);
        vertex.z = THREE.Math.randFloatSpread(2000);
        geometry.vertices.push(vertex);
    }
    var particles = new THREE.Points(geometry, new THREE.PointsMaterial({
        color: 0x888888
    }));
    scene.add(particles);
}

function addProton() {
    proton = new Proton();

    R = 70;
    emitter1 = createEmitter(R, 0, '#4F1500', '#0029FF');
    emitter2 = createEmitter(-R, 0, '#004CFE', '#6600FF');

    proton.addEmitter(emitter1);
    proton.addEmitter(emitter2);
    proton.addRender(new Proton.SpriteRender(scene));

}

function createEmitter(x, y, color1, color2) {
    var emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(new Proton.Span(5, 7), new Proton.Span(.01, .02));
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(2));
    emitter.addInitialize(new Proton.Body(createSprite()));
    emitter.addInitialize(new Proton.Radius(80));
    emitter.addInitialize(new Proton.V(200, new Proton.Vector3D(0, 0, -1), 0));


    emitter.addBehaviour(new Proton.Alpha(1, 0));
    emitter.addBehaviour(new Proton.Color(color1, color2));
    emitter.addBehaviour(new Proton.Scale(1, 0.5));
    emitter.addBehaviour(new Proton.CrossZone(new Proton.ScreenZone(camera, renderer), 'dead'));


    emitter.addBehaviour(new Proton.Force(0, 0, -20));
    // emitter.addBehaviour(new Proton.Attraction({
    //     x: 0,
    //     y: 0,
    //     z: 0
    // }, 5, 250));



    emitter.p.x = x;
    emitter.p.y = y;
    emitter.emit();

    return emitter;
}

function createSprite() {
    var map = new THREE.TextureLoader().load(base64);
    var material = new THREE.SpriteMaterial({
        map: map,
        color: 0xff0000,
        blending: THREE.AdditiveBlending,
        fog: true
    });
    return new THREE.Sprite(material);
}

function animate() {
    stats.begin();
    requestAnimationFrame(animate);
    animateEmitter();
    render();
    stats.end();
}

var ctha = 0;

function render() {
    proton.update();
    renderer.render(scene, camera);
    //controls.update();

    camera.lookAt(scene.position);
    ctha += .02;
    camera.position.x = Math.sin(ctha) * 500;
    camera.position.z = Math.cos(ctha) * 500;
    camera.position.y = Math.sin(ctha) * 500;

    Proton.Debug.renderInfo(proton, 3);
}

var tha = 0;

function animateEmitter() {
    tha += .13;
    emitter1.p.x = R * Math.cos(tha);
    emitter1.p.y = R * Math.sin(tha);

    emitter2.p.x = R * Math.cos(tha + Math.PI / 2);
    emitter2.p.y = R * Math.sin(tha + Math.PI / 2);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


var base64="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJkSURBVHjaxJeJbusgEEW94S1L//83X18M2MSuLd2pbqc4wZGqRLrKBsyZhQHny7Jk73xVL8xpVhWrcmiB5lX+6GJ5YgQ2owbAm8oIwH1VgKZUmGcRqKGGPgtEQQAzGR8hQ59fAmhJHSAagigJ4E7GPWRXOYC6owAd1JM6wDQPADyMWUqZRMqmAojHp1Vn6EQQEgUNMJLnUjMyJsM49wygBkAPw9dVFwXRkncCIIW3GRgoTQUZn6HxCMAFEFd8TwEQ78X4rHbILoAUmeT+RFG4UhQ6MiIAE4W/UsYFjuVjAIa2nIY4q1R0GFtQWG3E84lqw2GO2QOoCKBVu0BAPgDSU0eUDjjQenNkV/AW/pWChhpMTelo1a64AOKM30vk18GzTHXCNtI/Knz3DFBgsUqBGIjTInXRY1yA9xkVoqW5tVq3pDR9A0hfF5BSARmVnh7RMDCaIdcNgbPBkgzn1Bu+SfIEFSpSBmkxyrMicb0fAEuCZrWnN89veA/4XcakrPcjBWzkTuLjlbfTQPOlBhz+HwkqqPXmPQDdrQItxE1moGof1S74j/8txk8EHhTQrAE8qlwfqS5yukm1x/rAJ9Jiaa6nyATqD78aUVBhFo8b1V4DdTXdCW+IxA1zB4JhiOhZMEWO1HqnvdoHZ4FAMIhV9REF8FiUm0jsYPEJx/Fm/N8OhH90HI9YRHesWbXXZwAShU8qThe7H8YAuJmw5yOd989uRINKRTJAhoF8jbqrHKfeCYdIISZfSq26bk/K+yO3YvfKrVgiwQBHnwt8ynPB25+M8hceTt/ybPhnryJ78+tLgAEAuCFyiQgQB30AAAAASUVORK5CYII=";

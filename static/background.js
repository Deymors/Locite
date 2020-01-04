function run(){
var renderer,
    scene,
    camera,
    myCanvas = document.getElementById('myCanvas');


//RENDERER
renderer = new THREE.WebGLRenderer({
    canvas: myCanvas,
    antialias: true,
    alpha: true
});


renderer.setPixelRatio((window.devicePixelRatio));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);
//CAMERA
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

//SCENE
scene = new THREE.Scene();
var seqstr = "CGCAGTCGTCAGTCAGTCTGACTGTACGTCTGACTGTCATGCTAGCTGTCAGTCTAGCTGCTAGTCGTACGTCATGTCAGTCGTACGTACGTCGTCATGTAGCTAGCATGCTGCTGCAAGTCGTCAGCTAGCTAGCATGCTAGCTAGCTAGCTAGCGTCAGTCAGTCAGCTAGCTAGCTAGCTAGCGTCAGTCGTCAGTCAGTCGTCAGTCAGTCTGCATGCTGCATGCATGTCGATCGTCAGTCTAGCTGCTAGCTAGCTGCTAGTCGTCGTCGTACATGCTAGCTGCTAGCTGCTAGCATCGTCAGTCCGTAGCTAGCTAGCGTCAGCTAGCTAGCTAGCTAGCGTCAGCTAGCTAGCTAGCTAGCGCTAGCTAGCTAGCTAGCGTCAGCTAGCTAGCTAGCTAGCTAGCGTCAGCTAGTCGACGTCAGTCAGTCGATCGTCATGCGTCAGTCAGTCAGTCTAGTCGTACGTCATGC";
var seq = seqstr.split("");
var index = seq.length - 1;
var rotation = 0;
var randomCache = Math.random()*100000+10000;

var j = 1;
var loader = new THREE.GLTFLoader();
var loader2 = new THREE.GLTFLoader();
var loader3 = new THREE.GLTFLoader();

var lights = [];
lights[0] = new THREE.AmbientLight(0xffffff, 0.5);
lights[1] = new THREE.DirectionalLight(0xffdd00, 0.15);
lights[1].position.set(10, 0, 10);
lights[2] = new THREE.DirectionalLight(0xbb9af4, 0.015);
lights[2].position.set(-10, 0, 10);
lights[3] = new THREE.DirectionalLight(0xffffff, 1);
lights[3].position.set(0, 0, 10);
scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);
scene.add(lights[3]);

var linktemp;
for (var i = seq.length - 1; i >= seq.length - 70; i--) {
    if (seq[index] == "A") {
        rotation = 0;
        linktemp = 'static/untitled.glb?ver='+randomCache;
        loader.load(linktemp, handle_load);
    } else if (seq[index] == "T") {
        rotation = 1;
        linktemp = 'static/untitled.glb?ver='+randomCache;
        loader.load(linktemp, handle_load);
    } else if (seq[index] == "C") {
        rotation = 0;
        linktemp = 'static/untitledalt.glb?ver='+randomCache;
        loader2.load(linktemp, handle_load1);
    } else if (seq[index] == "G") {
        rotation = 1;
        linktemp = 'static/untitledalt.glb?ver='+randomCache;
        loader2.load(linktemp, handle_load1);
    }
    index--;
}
linktemp = 'static/chromosome.glb?ver='+randomCache;
loader3.load(linktemp, handle_load2);

var mesh;
var mesh1;
var mesh21;
var disp = 0.985;
var xrot = 0.03;
var yrot = -0.0002;
var zrot = 0.1;
var delta = 0;
var group = new THREE.Group();
group.position.z = -10;
group.position.y = 0;




var particle = new THREE.Group();
var ydest = [];
var xdest = [];
for (var i = 0; i < 400; i++) {
    var mesh2 = new THREE.Mesh(
        // Notice radius decreased to 2 because it has to be smaller
        // than camera.position. If camera is placed inside the mess,
        // then we won't see it.
        new THREE.IcosahedronGeometry(7, 1),

        // I went ahead and added Phong shading in order to make result clearer
        new THREE.MeshPhongMaterial({
            color: 0xffffff,
            emissive: 0x072534,
            opacity: 0.45,
            transparent: true,
            side: THREE.DoubleSide,
            flatShading: true,
        }),
    );

    mesh2.position.x = Math.random() * window.innerWidth * 2 - window.innerWidth;
    mesh2.position.y = Math.random() * window.innerHeight * 2 - window.innerHeight;
    mesh2.position.z = Math.random() * window.innerWidth * 2 - window.innerWidth;
    mesh2.scale.set(1.5, 1.5, 1.5);
    mesh2.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh2);
    xdest[i] = (Math.random() - 0.5)*1.5;
    ydest[i] = (Math.random() - 0.5)*1.5;
}
var multiple = 1;
scene.add(group);
scene.add(particle);
render();

var prevTime = Date.now();
}

function render() {

    delta += 1;

    if (group) {
        group.rotation.x += 0.01 * multiple;
        group.position.x += 0.01 * multiple;
    }
    if (particle) {
        for (var i = particle.children.length - 1; i >= 0; i--) {
            particle.children[i].position.x += xdest[i];
            particle.children[i].position.y += ydest[i];
            if (particle.children[i].position.x < -window.innerWidth ||
                particle.children[i].position.x > window.innerWidth) {
                xdest[i] = -xdest[i];
            }
            if (particle.children[i].position.y < -window.innerHeight ||
                particle.children[i].position.y > window.innerHeight) {
                ydest[i] = -ydest[i];
            }
        }
    }
    for (var i = group.children.length - 1; i >= 0; i--) {
        if (group.position.x + group.children[i].position.x > 30) {
            scene.remove(group.children[i]);
            group.remove(group.children[i]);
            if (seq[index] == "A") {
                rotation = 0;
                linktemp = 'static/untitled.glb?ver='+randomCache;
                loader.load(linktemp, handle_load);
            } else if (seq[index] == "T") {
                rotation = 1;
                linktemp = 'static/untitled.glb?ver='+randomCache;
                loader.load(linktemp, handle_load);
            } else if (seq[index] == "C") {
                rotation = 0;
                linktemp = 'static/untitledalt.glb?ver='+randomCache;
                loader2.load(linktemp, handle_load1);
            } else if (seq[index] == "G") {
                rotation = 1;
                linktemp = 'static/untitledalt.glb?ver='+randomCache;
                loader2.load(linktemp, handle_load1);
            }
            index--;
            if (index == -1) {
                index = seq.length - 1;
            }
        }
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}


document.onreadystatechange = function() {
    var state = document.readyState
    if (state == 'interactive' || state == 'loading') {
        multiple = 5;
    } else if (state == 'complete') {
        for (var i = 1; i < 10; i++) {
            setTimeout(function() {
                multiple = (multiple - 4 / 9);
            }, 500 * i);
        }
    }
}

function accelerate() {
    for (var i = 1; i < 14; i++) {
        setTimeout(function() {
            multiple = (multiple + 1);
        }, 100 * i);
    }
}


function handle_load(gltf) {
    mesh = gltf.scene;
    group.add(mesh);
    mesh.position.z = 0;
    mesh.position.x = 30 - j * disp;
    mesh.rotation.z = Math.PI / 2 + Math.PI * rotation;
    mesh.rotation.y = -Math.PI / 2;
    mesh.rotation.x += xrot * j;
    mesh.rotation.y += yrot * j;
    mesh.rotation.z += zrot * j;
    j++;
}

function handle_load1(gltf) {
    mesh1 = gltf.scene;
    group.add(mesh1);
    mesh1.position.z = 0;
    mesh1.position.x = 30 - j * disp;
    mesh1.rotation.z = Math.PI / 2 + Math.PI * rotation;
    mesh1.rotation.y = -Math.PI / 2;
    mesh1.rotation.x += xrot * j;
    mesh1.rotation.y += yrot * j;
    mesh1.rotation.z += zrot * j;
    j++;
}

function handle_load2(gltf) {
    mesh21 = gltf.scene;
    var materialB = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    var materialA = new THREE.MeshLambertMaterial({
        color: 0x000000
    });
    var geometry = new THREE.Geometry();
    geometry.fromBufferGeometry(mesh21.children[2].geometry);
    var materialArray = [
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00
        }),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff
        })
    ];


    var xaer = 0;
    var colors = [];
    for (var iy = 0; iy < geometry.faces.length; iy++) {
        var face = geometry.faces[iy];

        var vertices = geometry.vertices;
        var v1 = vertices[face.a];
        var v2 = vertices[face.b];
        var v3 = vertices[face.c];
        var position = Math.floor(Math.max(Math.max(v1.y, v2.y), v3.y) * 1000000);
        if (typeof colors[position] !== 'undefined') {
            geometry.faces[iy].materialIndex = colors[position];
        } else {
            colors[position] = Math.floor(Math.random() * 3);
            geometry.faces[iy].materialIndex = colors[position];
        }
        xaer++;
    }

    var sphere = new THREE.Mesh(

        geometry,

        materialArray);
    sphere.rotation.y = Math.PI / 2;
    sphere.scale.set(4, 4, 4);
    // group.add( sphere );
}
var canvas = document.getElementById("renderCanvas");
var cameraPanel = document.getElementById("cameraPanel");
var kat1 = document.getElementById("kat1");
var kat2 = document.getElementById("kat2");
var kat3 = document.getElementById("kat3");
var kat4 = document.getElementById("kat4");
var kat5 = document.getElementById("kat5");
var aKutusu, bKutusu;

var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI, Math.PI / 2.0, 20, new BABYLON.Vector3(0, 0, 0), scene);
    //var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    camera.speed = 5;
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
    // camera.lowerRadiusLimit = 10;
    // camera.upperRadiusLimit = 500;
    camera.radius = 50;
    camera.position = new BABYLON.Vector3(0, 0, 100);
    //camera.checkCollisions = true;
    //camera.ellipsoid = new BABYLON.Vector3(1.0, 1.0, 1.0);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.1;

    var kutu = function(deger, sahne, kaplama, xPos, yPos, zPos, boxName, matName){
      //değer: skybox boyutu
      //sahne: sahne adı
      //kaplama: skyboxa giydirilecek kaplama
      //xPos: skybox x koordinatı
      //yPos: skybox y koordinatı
      //zPos: skybox z koordinatı

      var skybox = BABYLON.Mesh.CreateBox(boxName, deger, sahne);
      var skyboxMaterial = new BABYLON.StandardMaterial(matName, sahne);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = new BABYLON.Texture(kaplama, sahne, true);
      skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;
      skyboxMaterial.disableLighting = true;
      skybox.material = skyboxMaterial;
      this.xPozisyonu = skybox.position.x = xPos;
      this.yPozisyonu = skybox.position.y = yPos;
      this.zPozisyonu = skybox.position.z = zPos;
    }

    aKutusu = new kutu(100, scene, "./texture/R0010064.JPG", 0, 0, 100, "KutuA", "KutuAMat");
    bKutusu = new kutu(100, scene, "./texture/R0010065.JPG", 0, 0, 300, "KutuB", "KutuBMat");

    kat1.addEventListener("click", function () {
        camera.position = new BABYLON.Vector3(0,0,100);  
        //hideCameraPanel();
    });
    

    kat2.addEventListener("click", function () {
      camera.position = new BABYLON.Vector3(0,0,300);  
      console.log("bKutusu: " + bKutusu);
      console.log("Kamera Pozisyonları x: " + camera.position);
      //hideCameraPanel();
    });

    kat3.addEventListener("click", function() {
      console.log("Kamera pozisyonları: " + camera.position);
    })

    return scene;
    
};


var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = createScene();

engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});

// UI kamera paneli ile ilgili hareket ayarları
var panelIsClosed = true;
var cameraPanelIsClosed = true;
var aboutIsClosed = true;
document.getElementById("clickableTag").addEventListener("click", function () {
    if (panelIsClosed) {
        panelIsClosed = false;
        controlPanel.style.webkitTransform = "translateY(0px)";
        controlPanel.style.transform = "translateY(0px)";
    } else {
        panelIsClosed = true;
        controlPanel.style.webkitTransform = "translateY(100px)";
        controlPanel.style.transform = "translateY(100px)";
    }
});

document.getElementById("cameraClickableTag").addEventListener("click", function () {
    if (cameraPanelIsClosed) {
        cameraPanelIsClosed = false;
        cameraPanel.style.webkitTransform = "translateX(0px)";
        cameraPanel.style.transform = "translateX(0px)";
    } else {
        hideCameraPanel();
    }
});



var hideCameraPanel = function () {
    cameraPanelIsClosed = true;
    cameraPanel.style.webkitTransform = "translateX(17em)";
    cameraPanel.style.transform = "translateX(17em)";
};

var canvas = document.getElementById("renderCanvas");
var cameraPanel = document.getElementById("cameraPanel");

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var sphereHolder = { sphere1: '', sphere2: '', sphere3: '', sphere4: '', sphere5: '', sphere6: '', sphere7: '' };
var sphereProperties = { diameter: 100, diameterX: 100 }
var currentFloor = 'sphere1';

var CreateSphere = function (sphereName, sceneObject, cameraObject) {
    var htmlObject = document.getElementById(sphereName);
    var sphereMaterial = new BABYLON.StandardMaterial(sphereName + "Material", sceneObject);
    sphereMaterial.backFaceCulling = false;
    sphereMaterial.reflectionTexture = new BABYLON.Texture(htmlObject.dataset.texture, sceneObject, true);
    sphereMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;
    sphereMaterial.disableLighting = true;

    var sphere = BABYLON.MeshBuilder.CreateSphere(sphereName, sphereProperties, sceneObject);
    sphere.material = sphereMaterial;
    sphere.position = new BABYLON.Vector3(parseInt(htmlObject.dataset.x), parseInt(htmlObject.dataset.y), parseInt(htmlObject.dataset.z));

    htmlObject.addEventListener("click", function () {
        if (currentFloor != sphereName) {
            cameraObject.target = cameraObject.position = sphere.position;
            document.getElementById(currentFloor).removeAttribute('style');
            htmlObject.setAttribute("style", "background: #090; color: #FFF;");
            currentFloor = sphereName;
        }
        hideCameraPanel();
    });
};

var CreateInfoBox = function (boxName, materialTexture, sceneObject, position, rotation, callback, boxProperties = { width: 3, height: 3, depth: 0.5 }) {
    // kutular başlangıç
    var material = new BABYLON.StandardMaterial(boxName + 'Material', sceneObject);
    material.diffuseTexture = new BABYLON.Texture(materialTexture, sceneObject);
    material.diffuseTexture.hasAlpha = true;

    var boxPicture = BABYLON.MeshBuilder.CreateBox(boxName, boxProperties, sceneObject);
    boxPicture.position = position;
    boxPicture.rotation = rotation;
    boxPicture.material = material;
    boxPicture.actionManager = new BABYLON.ActionManager(sceneObject);
    boxPicture.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function(event){ callback(event); } ));
};

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
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 50;
    camera.radius = 50;
    camera.position = new BABYLON.Vector3(0, 0, -100);


    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.parent = camera;
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.5;

    CreateSphere('sphere1', scene, camera);
    CreateSphere('sphere2', scene, camera);
    CreateSphere('sphere3', scene, camera);
    CreateSphere('sphere4', scene, camera);
    CreateSphere('sphere5', scene, camera);
    CreateSphere('sphere6', scene, camera);
    CreateSphere('sphere7', scene, camera);

    // Kutu özellikleri ve oluşturma
    var boxPosition = { x: -43, y: -2.9, z: -19 };
    var box2Position = { x: -48, y: -5.5, z: 10 };
    var boxRotation = { x: 0, y: -Math.PI / 1.9, z: 0.08 };
    var callbackAction = function(e){
        alert("Resim takalandı");
    };
    var boxProperties = { width: 3, height: 3, depth: 0.5 };
    CreateInfoBox('boxPicture', 'hotSpotPics/info_OFF.png', scene, boxPosition, boxRotation, callbackAction, boxProperties);
    CreateInfoBox('boxPicture', 'hotSpotPics/info_OFF.png', scene, box2Position, boxRotation, callbackAction, boxProperties);
    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});

// Resize
window.addEventListener("resize", function () { engine.resize(); });

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
        showCameraPanel();
    } else {
        hideCameraPanel();
    }
});

var showCameraPanel = function () {
    cameraPanelIsClosed = false;
    cameraPanel.style.webkitTransform = "translateX(0)";
    cameraPanel.style.transform = "translateX(0)";
};

var hideCameraPanel = function () {
    cameraPanelIsClosed = true;
    cameraPanel.style.webkitTransform = "translateX(17em)";
    cameraPanel.style.transform = "translateX(17em)";
};

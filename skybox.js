export default function skyBoxEkle(deger, sahne, kaplama, xPos, yPos, zPos) {
	
	//değer: skybox boyutu
	//sahne: sahne adı
	//kaplama: skyboxa giydirilecek kaplama
	//xPos: skybox x koordinatı
	//yPos: skybox y koordinatı
	//zPos: skybox z koordinatı

	var skybox = BABYLON.Mesh.CreateBox("skyBox", deger, sahne);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", sahne);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.Texture(kaplama, sahne, true);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.position.x = xPos;
    skybox.position.y = yPos;
    skybox.position.z = zPos;

}
let scene, renderer, camera;
let cube;
let spotLightHelper;
const loader = new THREE.TextureLoader();
const gltfLoader = new THREE.GLTFLoader();
// 初始化場景、渲染器、相機、物體
function init() {
  // 建立場景
  scene = new THREE.Scene();
  let axes = new THREE.AxesHelper(20); // 參數為座標軸長度
  scene.add(axes);
  // 建立渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight); // 場景大小
  renderer.setClearColor("rgb(255, 255, 224)", 1.0); // 預設背景顏色
  renderer.shadowMap.enable = true; // 陰影效果
  //renderer.outputEncoding = THREE.sRGBEncoding;

  // 將渲染器的 DOM 綁到網頁上
  document.body.appendChild(renderer.domElement);

  // 建立相機
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 20, 70);
  camera.lookAt(scene.position);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  // 建立光源
  // var pointLight = new THREE.PointLight("rgb(255, 255,255)", 0.5, 150);
  // pointLight.position.set(0, 30, 0);
  // scene.add(pointLight, new THREE.PointLightHelper(pointLight, 2));
  let ambientLight = new THREE.AmbientLight("rgb(235, 255, 225)", 0.5);
  scene.add(ambientLight);
  //建立地面
  const planeGeometry = new THREE.PlaneGeometry(60, 60);
  // 材質
  const pr = loader.load(
    "hw3Texture/TexturesCom_Wood_ParquetStrip9_1K_roughness.png"
  );
  reSizeTex(pr, 2, 1);
  const pn = loader.load( 
    "hw3Texture/TexturesCom_Wood_ParquetStrip9_1K_normal.png"
  );
  reSizeTex(pn, 2, 1);
  const pm = loader.load(
    "hw3Texture/TexturesCom_Wood_ParquetStrip9_1K_albedo.png"
  );
  reSizeTex(pm, 2, 1);
  const planMat = new THREE.MeshStandardMaterial({
    roughnessMap: pr, // 粗糙度
    normalMap: pn,
    normalScale: new THREE.Vector2(0, 2),
    map: pm,
  });
  let plane = new THREE.Mesh(planeGeometry, planMat);
  plane.rotation.x = -Math.PI / 2; // 使平面與 y 軸垂直，並讓正面朝上
  plane.rotation.z = -Math.PI / 2;
  plane.position.set(0, -7, 0);
  scene.add(plane);

  // 建立物體
  //左右牆
  wallSi = new THREE.BoxGeometry(2, 21, 60); // 幾何體
  // 材質
  const wr = loader.load(
    "hw3Texture/TexturesCom_Plaster_Plain_1K_roughness.png"
  );
  reSizeTex(wr, 8, 8);
  const wn = loader.load("hw3Texture/TexturesCom_Plaster_Plain_1K_normal.png");
  reSizeTex(wn, 8, 8);
  const wm = loader.load("hw3Texture/TexturesCom_Plaster_Plain_1K_albedo.png");
  reSizeTex(wm, 8, 8);
  const wallM = new THREE.MeshStandardMaterial({
    roughnessMap: wr, // 粗糙度
    normalMap: wn,
    normalScale: new THREE.Vector2(0, 2),
    map: wm,
  }); // 材質
  const wallLMe = new THREE.Mesh(wallSi, wallM); // 建立網格物件
  wallLMe.position.set(-31, 2, 0);
  scene.add(wallLMe);
  const wallRMe = new THREE.Mesh(wallSi, wallM); // 建立網格物件
  wallRMe.position.set(31, 2, 0);
  scene.add(wallRMe);

  //前後牆
  wallFB = new THREE.BoxGeometry(64, 21, 2); // 幾何體
  const wallFMe = new THREE.Mesh(wallFB, wallM); // 建立網格物件
  wallFMe.position.set(0, 2, 31);
  scene.add(wallFMe);
  const wallBMe = new THREE.Mesh(wallFB, wallM); // 建立網格物件
  wallBMe.position.set(0, 2, -31);
  scene.add(wallBMe);

  //中左牆
  const wallMidL = new THREE.BoxGeometry(1, 20, 30); // 幾何體
  const wallMidLMe = new THREE.Mesh(wallMidL, wallM); // 建立網格物件
  wallMidLMe.position.set(-10, 2, 15);
  scene.add(wallMidLMe);

  //中間牆
  const wallMidRD = new THREE.BoxGeometry(2, 20, 30); // 幾何體
  const wallMidRDMe = new THREE.Mesh(wallMidRD, wallM); // 建立網格物件
  wallMidRDMe.position.set(13, 2, -1);
  scene.add(wallMidRDMe);

  //建立聚光燈1
  let spotLight = new THREE.SpotLight("rgb(255, 255, 200)");
  setSpotLight(spotLight);
  spotLight.position.set(-30, 20, 15);
  let targetObject = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshPhongMaterial({
      color: "black",
    })
  );
  targetObject.position.set(-10, 2, 15);
  scene.add(targetObject);
  spotLight.target = targetObject;
  scene.add(spotLight);

  let artPlaneGeometry = new THREE.PlaneGeometry(9, 9);
  let artm = loader.load(
    "hw3Texture/academy of athens chariot-618033.png"
  );
  reSizeTex(artm, 1, 1);
  let artMat = new THREE.MeshStandardMaterial({
    map: artm,
  });
  artPlane = new THREE.Mesh(artPlaneGeometry, artMat);
  //artPlane.rotation.x = -Math.PI / 2; // 使平面與 y 軸垂直，並讓正面朝上
  artPlane.rotation.y = -Math.PI / 2;
  artPlane.position.set(-10.6, 2, 15);
  scene.add(artPlane);

  //建立聚光燈2
  spotLight = new THREE.SpotLight("rgb(255, 255, 200)");
  setSpotLight(spotLight);
  spotLight.position.set(-7, 20, -15);
  targetObject = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshPhongMaterial({
      color: "black",
    })
  );
  targetObject.position.set(-31, 2, -15);
  scene.add(targetObject);
  spotLight.target = targetObject;
  scene.add(spotLight);

  artPlaneGeometry = new THREE.PlaneGeometry(9, 9);
  artm = loader.load(
    "hw3Texture/cat.png"
  );
  reSizeTex(artm, 1, 1);
  artMat = new THREE.MeshStandardMaterial({
    map: artm,
  });
  artPlane = new THREE.Mesh(artPlaneGeometry, artMat);
  //artPlane.rotation.x = -Math.PI / 2; // 使平面與 y 軸垂直，並讓正面朝上
  artPlane.rotation.y = Math.PI / 2;
  artPlane.position.set(-29.9, 2, -15);
  scene.add(artPlane);

  //建立聚光燈3
  spotLight = new THREE.SpotLight("rgb(255, 255, 200)");
  setSpotLight(spotLight);
  spotLight.position.set(7, 20, 0);
  targetObject = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshPhongMaterial({
      color: "black",
    })
  );
  targetObject.position.set(31, 2, 0);
  scene.add(targetObject);
  spotLight.target = targetObject;
  scene.add(spotLight);

  artPlaneGeometry = new THREE.PlaneGeometry(12, 12);
  artm = loader.load(
    "hw3Texture/crying woman.png"
  );
  reSizeTex(artm, 1, 1);
  artMat = new THREE.MeshStandardMaterial({
    map: artm,
  });
  artPlane = new THREE.Mesh(artPlaneGeometry, artMat);
  //artPlane.rotation.x = -Math.PI / 2; // 使平面與 y 軸垂直，並讓正面朝上
  artPlane.rotation.y = -Math.PI / 2;
  artPlane.position.set(29.9, 2, 0);
  scene.add(artPlane);

  //建立聚光燈4
  spotLight = new THREE.SpotLight("rgb(255, 255, 200)");
  setSpotLight(spotLight);
  spotLight.position.set(-7, 20, 15);
  targetObject = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshPhongMaterial({
      color: "black",
    })
  );
  targetObject.position.set(-31, 2, 15);
  scene.add(targetObject);
  spotLight.target = targetObject;
  scene.add(spotLight);

  artPlaneGeometry = new THREE.PlaneGeometry(12, 12);
  artm = loader.load(
    "hw3Texture/gleaners dog-617679.png"
  );
  reSizeTex(artm, 1, 1);
  artMat = new THREE.MeshStandardMaterial({
    map: artm,
  });
  artPlane = new THREE.Mesh(artPlaneGeometry, artMat);
  //artPlane.rotation.x = -Math.PI / 2; // 使平面與 y 軸垂直，並讓正面朝上
  artPlane.rotation.y = Math.PI / 2;
  artPlane.position.set(-29.9, 2, 15);
  scene.add(artPlane);

  //建立聚光燈5
  spotLight = new THREE.SpotLight("rgb(255, 255, 200)");
  setSpotLight(spotLight);
  spotLight.position.set(0, 20, -10);
  targetObject = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshPhongMaterial({
      color: "black",
    })
  );
  targetObject.position.set(0, 2, -31);
  scene.add(targetObject);
  spotLight.target = targetObject;
  scene.add(spotLight);
  spotLightHelper = new THREE.SpotLightHelper(spotLight);
  //scene.add(spotLightHelper);

  artPlaneGeometry = new THREE.PlaneGeometry(12, 12);
  artm = loader.load("hw3Texture/mona lisa cat-617655.png");
  reSizeTex(artm, 1, 1);
  artMat = new THREE.MeshStandardMaterial({
    map: artm,
  });
  artPlane = new THREE.Mesh(artPlaneGeometry, artMat);
  //artPlane.rotation.x = -Math.PI / 2; // 使平面與 y 軸垂直，並讓正面朝上
  artPlane.rotation.y = -Math.PI * 2;
  artPlane.position.set(0, 2, -29.9);
  scene.add(artPlane);

  //建立聚光燈6
  spotLight = new THREE.SpotLight("rgb(255, 255, 200)");
  setSpotLight(spotLight);
  spotLight.position.set(7, 20, 0);
  targetObject = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshPhongMaterial({
      color: "black",
    })
  );
  targetObject.position.set(13, 2, 0);
  scene.add(targetObject);
  spotLight.target = targetObject;
  scene.add(spotLight);

  artPlaneGeometry = new THREE.PlaneGeometry(12, 12);
  artm = loader.load(
    "hw3Texture/keanu charles reeves prie-617579.png"
  );
  reSizeTex(artm, 1, 1);
  artMat = new THREE.MeshStandardMaterial({
    map: artm,
  });
  artPlane = new THREE.Mesh(artPlaneGeometry, artMat);
  //artPlane.rotation.x = -Math.PI / 2; // 使平面與 y 軸垂直，並讓正面朝上
  artPlane.rotation.y = -Math.PI / 2;
  artPlane.position.set(11.9, 2, 0);
  scene.add(artPlane);

  //建立聚光燈7
  spotLight = new THREE.SpotLight("rgb(255, 255, 200)");
  setSpotLight(spotLight);
  spotLight.position.set(-5, 20, 15);
  targetObject = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshPhongMaterial({
      color: "black",
    })
  );
  targetObject.position.set(-10, 3, 15);
  scene.add(targetObject);
  spotLight.target = targetObject;
  scene.add(spotLight);

  artPlaneGeometry = new THREE.PlaneGeometry(12, 12);
  artm = loader.load(
    "hw3Texture/sunrise impression future-618131.png"
  );
  reSizeTex(artm, 1, 1);
  artMat = new THREE.MeshStandardMaterial({
    map: artm,
  });
  artPlane = new THREE.Mesh(artPlaneGeometry, artMat);
  //artPlane.rotation.x = -Math.PI / 2; // 使平面與 y 軸垂直，並讓正面朝上
  artPlane.rotation.y = Math.PI / 2;
  artPlane.position.set(-8.9, 3, 15);
  scene.add(artPlane);

  //椅子1
  gltfLoader.load(
    "glb/bench1.glb",
    function (gltf) {
      let obj = gltf.scene;
      obj.scale.set(5, 5, 5);
      obj.position.set(5, -6.3, 0);
      obj.castShadow = true;
      obj.receiveShadow = true;
      gltf.scene.traverse(function (object) {
        object.material = new THREE.MeshStandardMaterial({
          map: object.material.map,
          color: object.material.color,
        });
      });

      scene.add(obj);
      //建立聚光燈椅子1
      spotLight = new THREE.SpotLight("rgb(255, 255, 200)");
      setSpotLight(spotLight);
      spotLight.position.set(8, 20, 13);
      spotLight.target = obj;
      scene.add(spotLight);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  //椅子2
  gltfLoader.load(
    "glb/bench1.glb",
    function (gltf) {
      let obj = gltf.scene;
      obj.scale.set(5, 5, 5);
      obj.position.set(5, -6.3, 0);
      obj.castShadow = true;
      obj.receiveShadow = true;
      scene.add(obj);
      //建立聚光燈椅子2
      spotLight = new THREE.SpotLight("rgb(255, 255, 200)");
      setSpotLight(spotLight);
      spotLight.position.set(8, 20, -13);
      spotLight.target = obj;
      scene.add(spotLight);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

// 建立動畫
function animate() {
  renderer.render(scene, camera);
}

// 渲染場景
function render() {
  animate();
  spotLightHelper.update();
  requestAnimationFrame(render);
}

function setSpotLight(spotLight) {
  spotLight.angle = Math.PI / 10;
  spotLight.intensity = 2;
  spotLight.distance = 35;
  spotLight.penumbra = 0.5;
  spotLight.castShadow = true;
}
//調整貼圖大小
function reSizeTex(texture, s, t) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(s, t);
}

// 監聽螢幕寬高來做簡單 RWD 設定
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
render();

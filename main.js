import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- STAGE DATA ---
const stages = [
  {
    id: 0,
    name: "Su Rezervuarı",
    subtitle: "Bu simülasyonda bir su molekülünün doğadaki döngüsünü inceleyeceksiniz. Su, yüksek özgül ısısı ve hidrojen bağları sayesinde iklim sistemlerinde önemli bir düzenleyici rol oynar.",
    kavramlar: "Su Molekülü (H2O), Hidrojen Bağı, Özgül Isı, Yüzey Gerilimi",
    surecAciklamasi: "Su molekülleri hidrojen bağları ile bir arada durarak okyanus, göl gibi büyük rezervuarları oluşturur. Suyun yüksek özgül ısısı, büyük su kütlelerinin yavaş ısınıp yavaş soğumasına neden olur.",
    gercekYasam: "Deniz kenarındaki şehirlerin iç kesimlere göre daha ılıman bir iklime sahip olması, okyanusların ısıyı depolama kapasitesiyle ilgilidir.",
    dersKazanimi: "Suyun fiziksel özelliklerinin ekosistem ve iklim üzerindeki etkisini kavrar."
  },
  {
    id: 1,
    name: "Buharlaşma ve Enerji Aktarımı",
    subtitle: "Güneşten gelen enerji, su moleküllerinin kinetik enerjisini artırır. Yeterli enerjiye ulaşan moleküller sıvı fazdan gaz fazına geçerek atmosfere karışır. Bu olaya buharlaşma denir.",
    kavramlar: "Kinetik Enerji, Faz Değişimi, Buharlaşma Isısı",
    surecAciklamasi: "Güneş enerjisini soğuran su moleküllerinin kinetik enerjisi artar. Yüzeydeki moleküller yeterli hıza ulaştıklarında hidrojen bağlarını kırarak atmosfere gaz (su buharı) halinde geçer.",
    gercekYasam: "Güneşli ve rüzgarlı bir günde ıslak çamaşırların daha hızlı kuruması.",
    dersKazanimi: "Isı enerjisinin maddenin hal değişimine ve moleküler harekete etkisini analiz eder."
  },
  {
    id: 2,
    name: "Yoğuşma ve Bulut Oluşumu",
    subtitle: "Atmosferde yükselen su buharı soğudukça bağıl nem artar. Hava çiy noktasına ulaştığında su buharı aerosol parçacıkları üzerinde yoğunlaşarak mikroskobik bulut damlacıklarını oluşturur.",
    kavramlar: "Yoğuşma (Kondansasyon), Bağıl Nem, Çiy Noktası, Aerosol",
    surecAciklamasi: "Yükselen sıcak hava genleşir ve soğur. Havadaki su buharı çiy noktasına (doygunluk sıcaklığına) ulaştığında, atmosferdeki toz veya tuz partikülleri üzerinde sıvı damlacıklara dönüşür.",
    gercekYasam: "Soğuk bir kış gününde camların buğulanması veya sabahları bitkilerin üzerinde çiy oluşması.",
    dersKazanimi: "Gaz halindeki maddenin çevreye ısı vererek sıvı hale geçme sürecini açıklar."
  },
  {
    id: 3,
    name: "Yağış Mekanizması",
    subtitle: "Bulut içindeki küçük damlacıklar çarpışarak birleşir ve kütleleri artar. Damlacıkların ağırlığı hava direncini aştığında yerçekimi etkisiyle yeryüzüne düşer. Bu süreç yağış olarak adlandırılır.",
    kavramlar: "Koalesens (Birleşme), Yerçekimi, Hava Direnci, Yağış (Prepitasyon)",
    surecAciklamasi: "Bulut içindeki mikroskobik damlacıklar rüzgar akımlarıyla çarpışıp birleşerek büyür (Koalesens). Kütleleri yeterince arttığında yerçekimi kuvveti hava direncini yener ve düşmeye başlarlar.",
    gercekYasam: "Yağmur, kar veya dolu yağması; yerçekiminin kütle üzerindeki doğrudan etkisidir.",
    dersKazanimi: "Kuvvet, kütle ve ivme (yerçekimi) ilişkisini yağış mekanizması üzerinden modellendirir."
  },
  {
    id: 4,
    name: "Yüzey Akışı ve Sızma",
    subtitle: "Yeryüzüne ulaşan suyun bir bölümü yüzey akışıyla akarsulara karışırken bir bölümü toprağa sızarak yer altı sularını besler. Bu süreç, ekosistemlerin devamlılığı ve canlı yaşamı için kritik öneme sahiptir.",
    kavramlar: "Yüzey Akışı, Sızma (İnfiltrasyon), Porozite (Gözeneklilik), Yeraltı Suyu",
    surecAciklamasi: "Toprağın gözeneklilik yapısına ve eğime bağlı olarak su ya yeraltına sızar ya da yüzeyde akışa geçer. Bu süreç bitkilerin kökleriyle suyu alabilmesi ve göllerin beslenmesi için temeldir.",
    gercekYasam: "Eğimli arazilerde şiddetli yağmurlar sonrası sel oluşurken, ormanlık düz alanlarda suyun toprağa emilmesi.",
    dersKazanimi: "Su döngüsünün yeryüzü şekillerine ve biyoçeşitliliğe olan etkisini değerlendirir."
  },
  {
    id: 5,
    name: "Döngünün Devamı",
    subtitle: "Suyun doğadaki bu termodinamik yolculuğu asla bitmez. Simülasyonu tamamladınız, şimdi bilgilerinizi test etmek için değerlendirme bölümüne geçebilirsiniz.",
    kavramlar: "Termodinamik Döngü, Ekosistem Dengesi, Kütlenin Korunumu",
    surecAciklamasi: "Su döngüsü, enerjinin güneşten alınıp atmosfere, oradan toprağa ve okyanuslara aktarıldığı kesintisiz kapalı bir sistemdir. Dünyadaki toplam su miktarı yaklaşık olarak sabittir.",
    gercekYasam: "Bugün içtiğimiz bir bardak suyun milyonlarca yıl önce yaşamış bir dinozorun içtiği su molekülüyle aynı olabilmesi.",
    dersKazanimi: "Madde döngülerinin sürdürülebilirlik açısından önemini sentezler."
  }
];

// --- QUIZ DATA ---
const quizQuestions = [
  { q: "Buharlaşma sırasında su moleküllerinin hangi enerjisi artar?", options: ["Potansiyel Enerji", "Kinetik Enerji", "Nükleer Enerji", "Kimyasal Enerji"], answer: 1 },
  { q: "Yoğuşma hangi atmosfer koşulunda gerçekleşir?", options: ["Hava çiy noktasına ulaştığında", "Hava çok sıcak olduğunda", "Basınç sıfıra düştüğünde", "Ozon tabakası inceldiğinde"], answer: 0 },
  { q: "Yağışın başlamasında yerçekiminin rolü nedir?", options: ["Damlacıkları buharlaştırır", "Damlacıkların hava direncini aşarak düşmesini sağlar", "Bulutları yukarı iter", "Rüzgar hızını keser"], answer: 1 },
  { q: "Yüzey akışı ile sızma arasındaki temel fark nedir?", options: ["İkisi de aynı şeydir", "Yüzey akışı yeraltında, sızma gökyüzünde olur", "Yüzey akışı toprağın üstünden akar, sızma yeraltına iner", "Sızma sadece okyanuslarda olur"], answer: 2 },
  { q: "Su döngüsünün iklim sistemi için temel önemi nedir?", options: ["Sadece içme suyu sağlar", "Güneşi soğutur", "Isı transferi yaparak termal dengeyi düzenler", "Dünyanın dönüş hızını etkiler"], answer: 2 }
];

// --- GLOBAL VARIABLES ---
let currentStage = 0;
let isSoundMuted = false;
let scene, camera, renderer, controls;
let mainDrop; 
let particles; 
let cloudGroup; 
let directionalLight;
let audioCtx;
let rainNoiseNode;
let isQuizMode = false;
let currentQuestion = 0;
let score = 0;

// UI Elements
const startScreen = document.getElementById('start-screen');
const mainUi = document.getElementById('main-ui');
const quizUi = document.getElementById('quiz-ui');
const kazanimlarModal = document.getElementById('kazanimlar-modal');

const subtitleText = document.getElementById('subtitle-text');

const infoKavramlar = document.getElementById('info-kavramlar');
const infoSurec = document.getElementById('info-surec');
const infoYasam = document.getElementById('info-yasam');
const infoKazanim = document.getElementById('info-kazanim');

const nextBtn = document.getElementById('next-btn');
const startBtn = document.getElementById('start-btn');
const vrBtn = document.getElementById('vr-btn');
const kazanimlarBtn = document.getElementById('kazanimlar-btn');
const closeKazanimlarBtn = document.getElementById('close-kazanimlar-btn');
const directQuizBtn = document.getElementById('direct-quiz-btn');

const soundBtn = document.getElementById('sound-btn');
const restartBtn = document.getElementById('restart-btn');

// --- INITIALIZATION ---
function init() {
  // Scene Setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020617); // Dark slate
  scene.fog = new THREE.FogExp2(0x020617, 0.02);

  // Camera Setup
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 6);

  // Renderer Setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.xr.enabled = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  document.body.appendChild(renderer.domElement);

  // Controls (For PC)
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 1, 0);
  controls.maxPolarAngle = Math.PI / 2 - 0.1;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Dim ambient
  scene.add(ambientLight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(5, 10, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Create Environment
  createEnvironment();
  createMainDrop();

  // VR Support
  const vrButton = VRButton.createButton(renderer);
  vrButton.id = 'threejs-vr-btn';
  
  // Create a MutationObserver to force display:none on the threejs VR button
  // because three.js updates the style asynchronously based on XR support.
  const observer = new MutationObserver(() => {
    if (vrButton.style.display !== 'none') {
      vrButton.style.setProperty('display', 'none', 'important');
    }
  });
  observer.observe(vrButton, { attributes: true, attributeFilter: ['style'] });
  vrButton.style.setProperty('display', 'none', 'important');
  document.body.appendChild(vrButton);
  
  vrBtn.addEventListener('click', () => {
    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
        if (supported) {
          vrButton.click();
        } else {
          alert("Bilgisayarınızda veya tarayıcınızda VR gözlük takılı değil.\n\nSimülasyonu bilgisayarda fare (mouse) ile 360 derece kontrol etmek için 'Simülasyonu Başlat' butonuna tıklayınız. VR Modu yalnızca Oculus (Meta Quest) gibi gerçek VR gözlüklerin tarayıcılarından girildiğinde çalışır.");
        }
      });
    } else {
      alert("Tarayıcınız WebXR desteklemiyor.\n\nLütfen bilgisayar ekranında fare ile oynamak için 'Simülasyonu Başlat' butonuna basın.");
    }
  });

  const controller = renderer.xr.getController(0);
  controller.addEventListener('select', handleNextStage);
  scene.add(controller);

  // Events
  window.addEventListener('resize', onWindowResize);
  
  startBtn.addEventListener('click', startGame);
  nextBtn.addEventListener('click', handleNextStage);
  soundBtn.addEventListener('click', toggleSound);
  restartBtn.addEventListener('click', restartSimulation);
  
  // New Modal and direct quiz logic
  kazanimlarBtn.addEventListener('click', () => kazanimlarModal.classList.remove('hidden'));
  closeKazanimlarBtn.addEventListener('click', () => kazanimlarModal.classList.add('hidden'));
  
  directQuizBtn.addEventListener('click', () => {
    startScreen.classList.remove('active');
    startScreen.classList.add('hidden');
    startQuiz();
  });

  renderer.setAnimationLoop(animate);
}

// --- ENVIRONMENT CREATION ---
function createEnvironment() {
  // Ground (Cross-section illusion)
  const groundGroup = new THREE.Group();
  
  // Surface
  const surfaceGeo = new THREE.PlaneGeometry(100, 100);
  const surfaceMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9, metalness: 0.1 });
  const surface = new THREE.Mesh(surfaceGeo, surfaceMat);
  surface.rotation.x = -Math.PI / 2;
  surface.receiveShadow = true;
  groundGroup.add(surface);

  // Cross section visible in Stage 4 & 5
  const soilBoxGeo = new THREE.BoxGeometry(4, 2, 4);
  const soilBoxMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 1 });
  const soilBox = new THREE.Mesh(soilBoxGeo, soilBoxMat);
  soilBox.position.set(0, -1, 2);
  soilBox.visible = false;
  soilBox.name = "soilBox";
  groundGroup.add(soilBox);

  scene.add(groundGroup);

  // Water Reservoir
  const lakeGeo = new THREE.CylinderGeometry(6, 6, 0.1, 64);
  const lakeMat = new THREE.MeshPhysicalMaterial({ 
    color: 0x06b6d4, // Turquoise
    transparent: true, 
    opacity: 0.9,
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.9,
    ior: 1.33
  });
  const lake = new THREE.Mesh(lakeGeo, lakeMat);
  lake.position.set(0, 0.05, 0);
  lake.receiveShadow = true;
  scene.add(lake);

  // Particles (used for kinetic molecules / steam / rain)
  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 2000;
  const posArray = new Float32Array(particleCount * 3);
  for(let i=0; i<particleCount*3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.08,
    color: 0x22d3ee,
    transparent: true,
    opacity: 0, 
    blending: THREE.AdditiveBlending
  });
  particles = new THREE.Points(particleGeo, particleMat);
  particles.position.y = 4;
  scene.add(particles);

  // Aerosol/Cloud Group
  cloudGroup = new THREE.Group();
  cloudGroup.position.y = 8;
  const cloudGeo = new THREE.SphereGeometry(1.5, 32, 32);
  const cloudMat = new THREE.MeshStandardMaterial({ 
    color: 0x334155, 
    transparent: true, 
    opacity: 0,
    roughness: 1
  });
  
  for(let i=0; i<8; i++) {
    const cloud = new THREE.Mesh(cloudGeo, cloudMat);
    cloud.position.set((Math.random()-0.5)*8, (Math.random()-0.5)*2, (Math.random()-0.5)*8);
    cloud.scale.setScalar(Math.random() * 1.5 + 0.5);
    cloudGroup.add(cloud);
  }
  scene.add(cloudGroup);
}

function createMainDrop() {
  const dropGeo = new THREE.IcosahedronGeometry(0.3, 4);
  const dropMat = new THREE.MeshPhysicalMaterial({
    color: 0x22d3ee, // Neon blue molecule representation
    transmission: 1.0,
    opacity: 1,
    metalness: 0.2,
    roughness: 0.1,
    ior: 1.33,
    thickness: 0.5,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.2
  });
  mainDrop = new THREE.Mesh(dropGeo, dropMat);
  mainDrop.position.set(0, 1, 0);
  mainDrop.castShadow = true;
  scene.add(mainDrop);
}

// --- GAME LOGIC & STAGES ---
function startGame() {
  startScreen.classList.remove('active');
  startScreen.classList.add('hidden');
  mainUi.classList.remove('hidden');
  mainUi.classList.add('active');
  
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch(e) {
    console.error("Audio Context Error:", e);
  }
  applyStage(0);
}

function handleNextStage() {
  if (isQuizMode) return;
  
  if (currentStage < 5) {
    currentStage++;
    applyStage(currentStage);
  } else {
    // Start Quiz Mode after stage 5
    startQuiz();
  }
}

function applyStage(stageIndex) {
  const stageData = stages[stageIndex];
  
  // UI
  subtitleText.innerText = stageData.subtitle;
  
  infoKavramlar.innerText = stageData.kavramlar;
  infoSurec.innerText = stageData.surecAciklamasi;
  infoYasam.innerText = stageData.gercekYasam;
  infoKazanim.innerText = stageData.dersKazanimi;
  
  document.querySelectorAll('.progress-step').forEach(el => el.classList.remove('active'));
  document.getElementById(`step-${stageIndex}`).classList.add('active');
  
  if (stageIndex === 5) {
    nextBtn.innerText = "Değerlendirmeye Geç";
  } else {
    nextBtn.innerText = "Sonraki Aşama";
  }

  speakText(stageData.subtitle);
  transitionToStage(stageIndex);
}

function transitionToStage(stageIndex) {
  if (stageIndex !== 3 && rainNoiseNode) {
    rainNoiseNode.disconnect();
    rainNoiseNode = null;
  }

  const soilBox = scene.getObjectByName("soilBox");
  soilBox.visible = false;

  switch(stageIndex) {
    case 0: // Reservoir
      scene.background.setHex(0x020617);
      scene.fog.color.setHex(0x020617);
      directionalLight.intensity = 2;
      mainDrop.position.set(0, 1, 0);
      particles.material.opacity = 0;
      cloudGroup.children.forEach(c => c.material.opacity = 0);
      camera.position.set(0, 2, 6);
      break;

    case 1: // Evaporation
      directionalLight.intensity = 3; 
      directionalLight.color.setHex(0xe0f2fe);
      particles.material.opacity = 0.6;
      particles.material.color.setHex(0x38bdf8);
      particles.material.size = 0.05;
      break;

    case 2: // Condensation
      scene.background.setHex(0x0f172a); 
      scene.fog.color.setHex(0x0f172a);
      directionalLight.intensity = 1;
      particles.material.opacity = 0.2; // less kinetic, more clustering
      cloudGroup.children.forEach(c => c.material.opacity = 0.9);
      camera.position.set(0, 8, 6);
      mainDrop.position.y = 8;
      break;

    case 3: // Precipitation
      scene.background.setHex(0x020617); 
      scene.fog.color.setHex(0x020617);
      cloudGroup.children.forEach(c => c.material.color.setHex(0x1e293b));
      
      particles.material.opacity = 0.9;
      particles.material.color.setHex(0x06b6d4); 
      particles.material.size = 0.15; // larger drops
      
      camera.position.set(0, 5, 3);
      playRainSound();
      break;

    case 4: // Infiltration
      scene.background.setHex(0x020617);
      directionalLight.intensity = 1.5;
      cloudGroup.children.forEach(c => c.material.opacity = 0);
      particles.material.opacity = 0;
      soilBox.visible = true; // Show soil cross section
      
      mainDrop.position.set(0, 0.2, 2);
      camera.position.set(0, 2, 8);
      controls.target.set(0, 0, 2);
      break;
      
    case 5: // Cycle Continue
      soilBox.visible = true;
      // Drop continues to sink or goes back to lake
      if(mainDrop.position.y < -0.8) {
         mainDrop.position.set(0, -0.8, 2);
      }
      camera.position.set(0, 3, 10);
      break;
  }
}

// --- ANIMATION LOOP ---
let time = 0;
function animate() {
  time += 0.01;
  controls.update();

  if (currentStage === 0) {
    mainDrop.position.y = 1 + Math.sin(time * 2) * 0.1;
    mainDrop.rotation.y = time * 0.5;
  } else if (currentStage === 1) {
    if (mainDrop.position.y < 8) mainDrop.position.y += 0.03;
    mainDrop.rotation.x = time;
    mainDrop.rotation.y = time;
    
    // Kinetic movement
    const positions = particles.geometry.attributes.position.array;
    for(let i=1; i<positions.length; i+=3) {
      positions[i] += 0.08 + Math.random()*0.05; // upward erratic
      positions[i-1] += (Math.random()-0.5)*0.05; // x jitter
      if(positions[i] > 10) positions[i] = -2;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  } else if (currentStage === 2) {
    cloudGroup.rotation.y = time * 0.05;
    mainDrop.position.y = 8 + Math.sin(time * 2) * 0.1;
  } else if (currentStage === 3) {
    const positions = particles.geometry.attributes.position.array;
    for(let i=1; i<positions.length; i+=3) {
      positions[i] -= 0.3; // gravity acceleration simulation
      if(positions[i] < -2) positions[i] = 10;
    }
    particles.geometry.attributes.position.needsUpdate = true;
    
    if (mainDrop.position.y > 0.2) {
      mainDrop.position.y -= 0.08;
      camera.position.y -= 0.08;
    }
  } else if (currentStage === 4 || currentStage === 5) {
    // Infiltration simulation (moving down into soil)
    if (mainDrop.position.y > -1.5) {
      mainDrop.position.y -= 0.005;
    }
    mainDrop.rotation.y = time * 0.2;
  }

  renderer.render(scene, camera);
}

// --- QUIZ LOGIC ---
function startQuiz() {
  isQuizMode = true;
  mainUi.classList.add('hidden');
  mainUi.classList.remove('active');
  
  // Show Quiz overlay
  quizUi.classList.remove('hidden');
  quizUi.classList.add('active');
  
  window.speechSynthesis.cancel();
  if (rainNoiseNode) rainNoiseNode.disconnect();
  
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const qData = quizQuestions[currentQuestion];
  document.getElementById('question-text').innerText = `${currentQuestion + 1}. ${qData.q}`;
  
  const optionsDiv = document.getElementById('quiz-options');
  optionsDiv.innerHTML = '';
  
  qData.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = opt;
    btn.onclick = () => handleAnswer(index, btn);
    optionsDiv.appendChild(btn);
  });
}

function handleAnswer(selectedIndex, btnElement) {
  const qData = quizQuestions[currentQuestion];
  const optionsDiv = document.getElementById('quiz-options');
  
  // Disable all buttons
  Array.from(optionsDiv.children).forEach(b => b.disabled = true);
  
  if (selectedIndex === qData.answer) {
    btnElement.classList.add('correct');
    score++;
  } else {
    btnElement.classList.add('wrong');
    optionsDiv.children[qData.answer].classList.add('correct');
  }
  
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      loadQuestion();
    } else {
      showQuizResult();
    }
  }, 1500);
}

function showQuizResult() {
  document.getElementById('quiz-content').classList.add('hidden');
  const resultDiv = document.getElementById('quiz-result');
  resultDiv.classList.remove('hidden');
  
  document.getElementById('score-text').innerText = `Puanınız: ${score} / ${quizQuestions.length}`;
  let feedback = "";
  if (score === 5) feedback = "Mükemmel! Su döngüsünün termodinamik ve fiziksel süreçlerini tam olarak kavramışsınız.";
  else if (score >= 3) feedback = "Tebrikler, iyi bir temeliniz var. Ancak bazı fiziksel kavramları tekrar gözden geçirebilirsiniz.";
  else feedback = "Konuyu pekiştirmek için simülasyonu tekrar incelemenizi tavsiye ederiz.";
  
  document.getElementById('feedback-text').innerText = feedback;
}

function restartSimulation() {
  isQuizMode = false;
  quizUi.classList.add('hidden');
  quizUi.classList.remove('active');
  document.getElementById('quiz-content').classList.remove('hidden');
  document.getElementById('quiz-result').classList.add('hidden');
  
  // Start screen shown again
  startScreen.classList.remove('hidden');
  startScreen.classList.add('active');
  
  currentStage = 0;
  // Let the user click "Start" again.
}

// --- UTILS ---
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function speakText(text) {
  if (isSoundMuted || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel(); 
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'tr-TR';
  utterance.rate = 0.95; 
  utterance.pitch = 1.0; // Normal pitch for academic tone
  window.speechSynthesis.speak(utterance);
}

function toggleSound() {
  isSoundMuted = !isSoundMuted;
  if (isSoundMuted) {
    soundBtn.innerText = "🔇";
    window.speechSynthesis.cancel();
    if (audioCtx && audioCtx.state === 'running') audioCtx.suspend();
  } else {
    soundBtn.innerText = "🔊";
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    speakText(stages[currentStage].subtitle);
  }
}

function playRainSound() {
  if (isSoundMuted || !audioCtx) return;
  const bufferSize = audioCtx.sampleRate * 2; 
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  rainNoiseNode = audioCtx.createBufferSource();
  rainNoiseNode.buffer = buffer;
  rainNoiseNode.loop = true;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 800; // deeper rain
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.2;
  rainNoiseNode.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  rainNoiseNode.start();
}

window.onload = init;

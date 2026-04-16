import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey : "AIzaSyAMaUx0GGxmQKuPCSlIBow0V2iFudAZrPc", 
    authDomain : "zhptk-portal-2026.firebaseapp.com", 
    projectId : "zhptk-portal-2026", 
    storageBucket : "zhptk-portal-2026.firebasestorage.app", 
    messagingSenderId : "49450481804", 
    appId : "1:49450481804:web:557ce5ecf2a2f8c68163a9" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, async (user) => {
    const navBtn = document.getElementById('navAuthBtn');
    // Скрываем старый встроенный дашборд (или можешь вообще удалить блок #dashboard-section из index.html)
    const dash = document.getElementById('dashboard-section'); 
    
    if (user) {
        window.closeAuthModal();
        navBtn.innerHTML = '<i class="fas fa-user-circle"></i> Кабинет';
        navBtn.onclick = null; 
        navBtn.href = "cabinet.html"; // Ссылка на новую страницу
        navBtn.target = "_blank";     // Открываем в новой вкладке
        if(dash) dash.style.display = 'none';
    } else {
        navBtn.innerHTML = '<i class="fas fa-user"></i> Войти';
        navBtn.onclick = window.openAuthModal; 
        navBtn.href = "#";
        navBtn.target = "_self";
        if(dash) dash.style.display = 'none';
    }
});

// Глобальные функции для Firebase
window.registerUser = async function() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPass').value;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        await setDoc(doc(db, "users", userCredential.user.uid), { name, email, role: "student", createdAt: serverTimestamp() });
    } catch (e) { alert(e.message); }
};

window.loginUser = async function() {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    try { await signInWithEmailAndPassword(auth, email, pass); } catch (e) { alert("Ошибка входа"); }
};

window.logoutUser = function() { signOut(auth); };
window.saveStudent = async function(name, phone) {
    await addDoc(collection(db, "applications"), { studentName: name, studentPhone: phone, timestamp: serverTimestamp() });
};

// Глобальные UI-функции (привязка к window необходима, так как скрипт подключен как module)
window.openM = function(title, desc, time) {
    document.getElementById('mTitle').innerText = title; document.getElementById('mDesc').innerText = desc;
    document.getElementById('mTime').innerText = "Срок обучения: " + time; document.getElementById('modalSpec').style.display = 'flex';
};

window.closeM = function() { 
    document.getElementById('modalSpec').style.display = 'none'; 
};

window.openAuthModal = function() { 
    document.getElementById('authModal').style.display = 'flex'; 
};

window.closeAuthModal = function() { 
    document.getElementById('authModal').style.display = 'none'; 
};

window.switchAuthTab = function(tab) {
    const fL = document.getElementById('formLogin'), fR = document.getElementById('formReg');
    const tL = document.getElementById('tabLogin'), tR = document.getElementById('tabReg');
    if(tab === 'login') { fL.style.display = 'flex'; fR.style.display = 'none'; tL.classList.add('active'); tR.classList.remove('active'); }
    else { fR.style.display = 'flex'; fL.style.display = 'none'; tR.classList.add('active'); tL.classList.remove('active'); }
};

window.toggleBot = function() {
    const b = document.getElementById('botWindow');
    b.style.display = (b.style.display === 'flex') ? 'none' : 'flex';
};

window.addStudent = async function() {
    const name = document.getElementById('studentName').value;
    const phone = document.getElementById('studentPhone').value;
    if(!name || !phone) { alert("Заполните поля"); return; }
    try { await window.saveStudent(name, phone); alert("Заявка принята!"); } catch(e) { alert("Ошибка"); }
};

window.botSend = function() {
    const inp = document.getElementById('botInp'); const val = inp.value.toLowerCase();
    if(!val) return;
    const msgs = document.getElementById('botMsgs');
    const uDiv = document.createElement('div'); uDiv.className = 'msg user'; uDiv.innerText = inp.value; msgs.appendChild(uDiv);
    
    let res = "Не понял вопрос. Попробуйте: 'цена', 'документы', 'реквизиты' или 'кодекс'.";
    if(val.includes("цена") || val.includes("сколько")) res = "Очное: 140 000 ₸, Заочное: 90 000 ₸. Предоплата 50% до 10 сентября.";
    if(val.includes("док")) res = "Нужны: Аттестат (оригинал), копия удостоверения, медсправка 075-У, 4 фото 3х4.";
    if(val.includes("реквизит")) res = "БИН 990140001302, ИИК KZ876017171000000065, АО 'Народный Банк Казахстана'.";
    if(val.includes("кодекс") || val.includes("чест")) res = "Студенты обязаны соблюдать дисциплину, деловой стиль одежды, уважать преподавателей и вести ЗОЖ.";
    if(val.includes("адрес") || val.includes("где")) res = "Область Ұлытау, г. Жезказган. Подробности на zhptk.edu.kz.";

    setTimeout(() => {
        const bDiv = document.createElement('div'); bDiv.className = 'msg bot'; bDiv.innerText = res;
        msgs.appendChild(bDiv); msgs.scrollTop = msgs.scrollHeight;
    }, 600);
    inp.value = '';
};

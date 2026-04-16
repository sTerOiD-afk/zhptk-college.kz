import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Твои доступы
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

// Проверка сессии при загрузке кабинета
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

// Логика выхода
window.logoutCab = function() {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
};

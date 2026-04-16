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
    if (user) {
        // Получаем документ пользователя из БД
        const docSnap = await getDoc(doc(db, "users", user.uid));
        
        if(docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById('cabName').innerText = data.name || "Студент";
            
            // Если в Firestore добавлены эти поля, они заменят дефолтный текст. 
            // Если полей нет, останется красивый плейсхолдер из HTML.
            if(data.group) document.getElementById('cabGroup').innerText = data.group;
            if(data.specialty) document.getElementById('cabSpec').innerText = data.specialty;
            if(data.course) document.getElementById('cabCourse').innerText = data.course;
            if(data.gpa) document.getElementById('cabGPA').innerText = data.gpa;
        } else {
            document.getElementById('cabName').innerText = "Новый Абитуриент";
            document.getElementById('cabStatus').innerText = "Обработка документов";
        }
        
        document.getElementById('cabEmail').innerText = user.email;
    } else {
        // Если кто-то попытается зайти по прямой ссылке без авторизации — редирект
        window.location.href = "index.html";
    }
});

// Логика выхода
window.logoutCab = function() {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
};

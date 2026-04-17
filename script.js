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

// ===== ОТСЛЕЖИВАНИЕ СОСТОЯНИЯ ВХОДА =====
onAuthStateChanged(auth, async (user) => {
    const navBtn = document.getElementById('navAuthBtn');
    const dash = document.getElementById('dashboard-section');
    
    if (user) {
        if (typeof window.closeAuthModal === 'function') {
            window.closeAuthModal();
        }
        navBtn.innerHTML = '<i class="fas fa-user-circle"></i> Кабинет';
        navBtn.href = "cabinet.html"; 
        navBtn.target = "_blank"; 
        navBtn.onclick = null; 
        
        if (dash) {
            dash.style.display = 'block';
            document.getElementById('dashEmail').innerText = user.email;
            // Здесь можно добавить получение имени из Firestore, если оно там есть
            document.getElementById('dashName').innerText = user.displayName || "Студент";
        }
    } else {
        navBtn.innerHTML = '<i class="fas fa-user"></i> Войти';
        navBtn.onclick = window.openAuthModal; 
        navBtn.href = "#";
        navBtn.target = "_self";
        if (dash) dash.style.display = 'none';
    }
});

// ===== ФУНКЦИЯ ОТПРАВКИ ЗАЯВКИ =====
window.addStudent = async function() {
    const nameInput = document.getElementById('studentName');
    const phoneInput = document.getElementById('studentPhone');

    if (!nameInput.value.trim() || !phoneInput.value.trim()) {
        alert("Пожалуйста, заполните ФИО и Телефон!");
        return;
    }

    try {
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = "Отправка...";
        btn.disabled = true;

        const docRef = await addDoc(collection(db, "applications"), {
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
            timestamp: serverTimestamp(),
            status: "new"
        });

        console.log("Успех! ID заявки: ", docRef.id);
        alert("Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");
        
        nameInput.value = '';
        phoneInput.value = '';

        btn.innerText = originalText;
        btn.disabled = false;

    } catch (error) {
        console.error("Ошибка при отправке заявки: ", error);
        alert("Ошибка. Проверьте правила доступа Firestore в консоли Firebase.");
        
        const btn = event.target;
        btn.innerText = "Отправить";
        btn.disabled = false;
    }
};

// ===== ЛОГИКА ЧАТ-БОТА =====
window.botSend = function() {
    const inp = document.getElementById('botInp');
    const val = inp.value.toLowerCase().trim();
    if (!val) return;

    const msgs = document.getElementById('botMsgs');
    const uDiv = document.createElement('div');
    uDiv.className = 'msg user';
    uDiv.innerText = inp.value;
    msgs.appendChild(uDiv);

    let res = "Не понял вопрос 🤔 Попробуйте: цена, документы, адрес, специальности.";

    if (val.match(/цена|стоимость|сколько|плат/i)) {
        res = "💰 Очное: 140 000 ₸\n💰 Заочное: 90 000 ₸\nПредоплата 50% до 10 сентября.";
    } else if (val.match(/документ|что нужно|поступить/i)) {
        res = "📄 Нужно:\n• Аттестат\n• Удостоверение\n• Медсправка 075-У\n• 4 фото 3x4";
    } else if (val.match(/адрес|где/i)) {
        res = "📍 г. Жезказган, ул. Байконурова, 19\n📞 8 (705) 267-12-34";
    } else if (val.match(/специальност|професси/i)) {
        res = "🎓 Специальности: ПО, Электроснабжение, Строительство, Автотранспорт, ЧС.";
    }

    setTimeout(() => {
        const bDiv = document.createElement('div');
        bDiv.className = 'msg bot';
        bDiv.innerText = res;
        msgs.appendChild(bDiv);
        msgs.scrollTop = msgs.scrollHeight;
    }, 500);

    inp.value = '';
};

// ===== УПРАВЛЕНИЕ МОДАЛКАМИ И ИНТЕРФЕЙСОМ =====
window.openAuthModal = function() {
    document.getElementById('authModal').style.display = 'flex';
};

window.closeAuthModal = function() {
    document.getElementById('authModal').style.display = 'none';
};

window.switchAuthTab = function(type) {
    const loginForm = document.getElementById('formLogin');
    const regForm = document.getElementById('formReg');
    const tabLogin = document.getElementById('tabLogin');
    const tabReg = document.getElementById('tabReg');

    if (type === 'login') {
        loginForm.style.display = 'block';
        regForm.style.display = 'none';
        tabLogin.classList.add('active');
        tabReg.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        regForm.style.display = 'block';
        tabLogin.classList.remove('active');
        tabReg.classList.add('active');
    }
};

window.openM = function(title, desc, time) {
    document.getElementById('mTitle').innerText = title;
    document.getElementById('mDesc').innerText = desc;
    document.getElementById('mTime').innerText = "Срок обучения: " + time;
    document.getElementById('modalSpec').style.display = 'flex';
};

window.closeM = function() {
    document.getElementById('modalSpec').style.display = 'none';
};

window.toggleBot = function() {
    const bot = document.getElementById('botWindow');
    const inp = document.getElementById('botInp');
    bot.style.display = (bot.style.display === 'flex') ? 'none' : 'flex';
    if (bot.style.display === 'flex') setTimeout(() => inp.focus(), 200);
};

window.logoutUser = function() {
    signOut(auth).then(() => {
        location.reload();
    });
};

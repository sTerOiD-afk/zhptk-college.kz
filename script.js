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
    const dash = document.getElementById('dashboard-section');
    
    if (user) {
        // Проверяем существование функции перед вызовом, чтобы избежать ошибки при быстрой загрузке
        if (typeof window.closeAuthModal === 'function') {
            window.closeAuthModal();
        }
        navBtn.innerHTML = '<i class="fas fa-user-circle"></i> Кабинет';
        // Указываем ссылку на новую страницу кабинета
        navBtn.href = "cabinet.html"; 
        // Заставляем открываться в новом окне/вкладке
        navBtn.target = "_blank"; 
        navBtn.onclick = null; 
        
        // Скрываем старый дэшборд на главной странице (если он еще остался)
        if (dash) dash.style.display = 'none';
    } else {
        navBtn.innerHTML = '<i class="fas fa-user"></i> Войти';
        navBtn.onclick = window.openAuthModal; 
        navBtn.href = "#";
        navBtn.target = "_self";
        if (dash) dash.style.display = 'none';
    }
});

// Глобальные функции для Firebase
window.botSend = function() {
    const inp = document.getElementById('botInp');
    const val = inp.value.toLowerCase().trim();
    if (!val) return;

    const msgs = document.getElementById('botMsgs');

    // сообщение пользователя
    const uDiv = document.createElement('div');
    uDiv.className = 'msg user';
    uDiv.innerText = inp.value;
    msgs.appendChild(uDiv);

    let res = "Не понял вопрос 🤔 Попробуйте: цена, документы, адрес, специальности, сроки.";

    // ===== ОТВЕТЫ =====

    // 💰 Цена
    if (val.match(/цена|стоимость|сколько|плат/i)) {
        res = "💰 Очное: 140 000 ₸\n💰 Заочное: 90 000 ₸\nПредоплата 50% до 10 сентября.";
    }

    // 📄 Документы
    else if (val.match(/документ|что нужно|поступить|поступлен/i)) {
        res = "📄 Нужно:\n• Аттестат\n• Удостоверение личности\n• Медсправка 075-У\n• 4 фото 3x4";
    }

    // 📍 Адрес
    else if (val.match(/адрес|где|находит/i)) {
        res = "📍 г. Жезказган, ул. Байконурова, 19\n📞 8 (705) 267-12-34";
    }

    // 🎓 Специальности
    else if (val.match(/специальност|професси|направлен/i)) {
        res = "🎓 Специальности:\n• Программное обеспечение\n• Электроснабжение\n• Строительство\n• Автотранспорт\n• ЧС";
    }

    // ⏳ Срок обучения
    else if (val.match(/срок|учиться|сколько лет/i)) {
        res = "⏳ Срок обучения: 3 года 10 месяцев.";
    }

    // 📅 Сроки поступления
    else if (val.match(/когда поступ|сроки|дедлайн/i)) {
        res = "📅 Прием документов:\nОчное: 20 июня – 25 августа\nЗаочное: до 20 сентября";
    }

    // 💳 Оплата
    else if (val.match(/оплата|рассрочка|платеж/i)) {
        res = "💳 Можно оплатить в 2 этапа:\n50% до 10 сентября\n50% до 10 января.";
    }

    // 🏦 Реквизиты
    else if (val.match(/реквизит|банк|бин/i)) {
        res = "🏦 БИН: 990140001302\nИИК: KZ876017171000000065\nБанк: Halyk Bank";
    }

    // 🌐 Сайт
    else if (val.match(/сайт|официальный/i)) {
        res = "🌐 https://zhptk.edu.kz/";
    }

    // 📸 Instagram
    else if (val.match(/инст|instagram/i)) {
        res = "📸 https://www.instagram.com/zhptk.kz/";
    }

    // 📝 Онлайн заявка
    else if (val.match(/заявк|онлайн|подать/i)) {
        res = "📝 Подать онлайн:\nhttps://college.smartnation.kz/kz/tko";
    }

    // 👨‍🏫 Преподаватели
    else if (val.match(/преподавател|учител/i)) {
        res = "👨‍🏫 В колледже работают более 50 преподавателей, включая магистров и специалистов высшей категории.";
    }

    // 🏫 Общежитие
    else if (val.match(/общежити|жилье/i)) {
        res = "🏫 Информацию об общежитии уточняйте в приемной комиссии.";
    }

    // 📞 Контакты
    else if (val.match(/телефон|номер|связ/i)) {
        res = "📞 Телефон: 8 (705) 267-12-34\n📧 Email: jezatk@mail.ru";
    }

    // ===== ВЫВОД =====
    setTimeout(() => {
        const bDiv = document.createElement('div');
        bDiv.className = 'msg bot';
        bDiv.innerText = res;
        msgs.appendChild(bDiv);
        msgs.scrollTop = msgs.scrollHeight;
    }, 500);

    inp.value = '';
}; // Закрывающая скобка добавлена сюда

window.openAuthModal = function() {
    document.getElementById('authModal').style.display = 'flex';
};

window.closeAuthModal = function() {
    document.getElementById('authModal').style.display = 'none';
};

window.toggleBot = function() {
    const bot = document.getElementById('botWindow');
    const inp = document.getElementById('botInp');

    bot.style.display = (bot.style.display === 'flex') ? 'none' : 'flex';

    if (bot.style.display === 'flex') {
        setTimeout(() => inp.focus(), 200);
    }
};

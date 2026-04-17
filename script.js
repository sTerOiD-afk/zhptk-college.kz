<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";


// CONFIG
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "zhptk-portal-2026.firebaseapp.com",
    projectId: "zhptk-portal-2026",

    // ИСПРАВЛЕНО
    storageBucket: "zhptk-portal-2026.appspot.com",

    messagingSenderId: "49450481804",
    appId: "1:49450481804:web:557ce5ecf2a2f8c68163a9"
};


// INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


console.log("Firebase подключен");


/* =========================
   AUTH STATE
========================= */

onAuthStateChanged(auth, (user) => {

    const navBtn = document.getElementById("navAuthBtn");

    if (user) {

        console.log("Пользователь вошел:", user.email);

        navBtn.innerHTML =
            '<i class="fas fa-user-circle"></i> Кабинет';

        navBtn.href = "cabinet.html";
        navBtn.target = "_blank";
        navBtn.onclick = null;

    } else {

        console.log("Пользователь не авторизован");

        navBtn.innerHTML =
            '<i class="fas fa-user"></i> Войти';

        navBtn.onclick = window.openAuthModal;
        navBtn.href = "#";
        navBtn.target = "_self";

    }

});


/* =========================
   REGISTER
========================= */

window.registerUser = async function () {

    try {

        const name =
            document.getElementById("regName").value.trim();

        const email =
            document.getElementById("regEmail").value.trim();

        const pass =
            document.getElementById("regPass").value.trim();


        if (!name || !email || !pass) {

            alert("Заполните все поля");
            return;

        }

        if (pass.length < 6) {

            alert("Пароль минимум 6 символов");
            return;

        }


        console.log("Создание пользователя...");


        // AUTH

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                pass
            );

        const user = userCredential.user;


        console.log("User UID:", user.uid);


        // FIRESTORE

        await setDoc(
            doc(db, "users", user.uid),
            {
                fio: name,
                email: email,
                role: "Абитуриент",
                createdAt: serverTimestamp()
            }
        );


        console.log("Данные записаны в Firestore");


        alert("Регистрация успешна");


        if (window.closeAuthModal) {

            window.closeAuthModal();

        }

    }
    catch (error) {

        console.error("REGISTER ERROR:", error);

        let message = "Ошибка регистрации";


        if (error.code === "auth/email-already-in-use")
            message = "Email уже используется";

        if (error.code === "auth/invalid-email")
            message = "Неверный email";

        if (error.code === "auth/weak-password")
            message = "Слабый пароль";

        if (error.code === "permission-denied")
            message = "Нет доступа к базе данных";


        alert(message);

    }

};



/* =========================
   LOGIN
========================= */

window.loginUser = async function () {

    try {

        const email =
            document.getElementById("loginEmail").value.trim();

        const pass =
            document.getElementById("loginPass").value.trim();

        const err =
            document.getElementById("loginErr");


        if (!email || !pass) {

            err.innerText =
                "Введите Email и пароль";

            err.style.display =
                "block";

            return;

        }


        await signInWithEmailAndPassword(
            auth,
            email,
            pass
        );


        err.style.display = "none";


        if (window.closeAuthModal) {

            window.closeAuthModal();

        }

    }
    catch (error) {

        console.error("LOGIN ERROR:", error);

        const err =
            document.getElementById("loginErr");


        let message =
            "Ошибка входа";


        if (error.code ===
            "auth/user-not-found")

            message =
            "Пользователь не найден";


        if (error.code ===
            "auth/wrong-password")

            message =
            "Неверный пароль";


        if (error.code ===
            "auth/invalid-email")

            message =
            "Неверный email";


        err.innerText =
            message;

        err.style.display =
            "block";

    }

};



/* =========================
   LOGOUT
========================= */

window.logoutUser = async function () {

    try {

        await signOut(auth);

        alert("Вы вышли из аккаунта");

    }
    catch (error) {

        console.error("LOGOUT ERROR:", error);

    }

};



/* =========================
   TEST FIRESTORE
========================= */

window.testDB = async function () {

    try {

        await setDoc(
            doc(db, "test", "ping"),
            {
                time: Date.now()
            }
        );

        console.log("Firestore работает");

    }
    catch (error) {

        console.error("DB ERROR:", error);

    }

};
</script>

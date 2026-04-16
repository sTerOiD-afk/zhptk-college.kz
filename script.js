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

//
// ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
//

window.openCabinet = function () {

    document.getElementById("landing-content")
        .style.display = "none";

    document.getElementById("dashboard-section")
        .style.display = "block";

    window.scrollTo(0, 0);

};

window.goHome = function () {

    document.getElementById("landing-content")
        .style.display = "block";

    document.getElementById("dashboard-section")
        .style.display = "none";

};

//
// ПРОВЕРКА АВТОРИЗАЦИИ
//

onAuthStateChanged(auth, async (user) => {

    const navBtn =
        document.getElementById('navAuthBtn');

    const dash =
        document.getElementById('dashboard-section');

    if (user) {

        window.closeAuthModal();

        navBtn.innerHTML =
            '<i class="fas fa-user-circle"></i> Кабинет';

        navBtn.onclick =
            openCabinet;

        navBtn.href =
            "#";

        dash.style.display =
            "none";

        const docSnap =
            await getDoc(
                doc(db, "users", user.uid)
            );

        document.getElementById(
            'dashName'
        ).innerText =
            docSnap.exists()
                ? docSnap.data().name
                : "Абитуриент";

        document.getElementById(
            'dashEmail'
        ).innerText =
            user.email;

    }

    else {

        navBtn.innerHTML =
            '<i class="fas fa-user"></i> Войти';

        navBtn.onclick =
            window.openAuthModal;

        navBtn.href =
            "#";

        dash.style.display =
            "none";

        goHome();

    }

});

//
// РЕГИСТРАЦИЯ
//

window.registerUser = async function() {

    const name =
        document.getElementById('regName').value;

    const email =
        document.getElementById('regEmail').value;

    const pass =
        document.getElementById('regPass').value;

    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                pass
            );

        await setDoc(
            doc(
                db,
                "users",
                userCredential.user.uid
            ),
            {
                name,
                email,
                role: "student",
                createdAt: serverTimestamp()
            }
        );

        alert("Аккаунт создан");

    }

    catch (e) {

        alert(e.message);

    }

};

//
// ВХОД
//

window.loginUser = async function() {

    const email =
        document.getElementById('loginEmail').value;

    const pass =
        document.getElementById('loginPass').value;

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            pass
        );

        openCabinet();

    }

    catch (e) {

        alert("Ошибка входа");

    }

};

//
// ВЫХОД
//

window.logoutUser = function () {

    signOut(auth);

};

//
// ЗАЯВКА
//

window.saveStudent = async function(name, phone) {

    await addDoc(
        collection(db, "applications"),
        {
            studentName: name,
            studentPhone: phone,
            timestamp: serverTimestamp()
        }
    );

};

//
// МОДАЛКА СПЕЦИАЛЬНОСТЕЙ
//

window.openM = function(title, desc, time) {

    document.getElementById('mTitle')
        .innerText = title;

    document.getElementById('mDesc')
        .innerText = desc;

    document.getElementById('mTime')
        .innerText =
            "Срок обучения: " + time;

    document.getElementById(
        'modalSpec'
    ).style.display = 'flex';

};

window.closeM = function() {

    document.getElementById(
        'modalSpec'
    ).style.display = 'none';

};

//
// МОДАЛКА ВХОДА
//

window.openAuthModal = function() {

    document.getElementById(
        'authModal'
    ).style.display = 'flex';

};

window.closeAuthModal = function() {

    document.getElementById(
        'authModal'
    ).style.display = 'none';

};

//
// ПЕРЕКЛЮЧЕНИЕ ТАБОВ
//

window.switchAuthTab = function(tab) {

    const fL =
        document.getElementById(
            'formLogin'
        );

    const fR =
        document.getElementById(
            'formReg'
        );

    const tL =
        document.getElementById(
            'tabLogin'
        );

    const tR =
        document.getElementById(
            'tabReg'
        );

    if (tab === 'login') {

        fL.style.display =
            'flex';

        fR.style.display =
            'none';

        tL.classList.add(
            'active'
        );

        tR.classList.remove(
            'active'
        );

    }

    else {

        fR.style.display =
            'flex';

        fL.style.display =
            'none';

        tR.classList.add(
            'active'
        );

        tL.classList.remove(
            'active'
        );

    }

};

//
// БОТ
//

window.toggleBot = function() {

    const b =
        document.getElementById(
            'botWindow'
        );

    b.style.display =
        (b.style.display === 'flex')
            ? 'none'
            : 'flex';

};

window.addStudent = async function() {

    const name =
        document.getElementById(
            'studentName'
        ).value;

    const phone =
        document.getElementById(
            'studentPhone'
        ).value;

    if (!name || !phone) {

        alert("Заполните поля");

        return;

    }

    try {

        await window.saveStudent(
            name,
            phone
        );

        alert("Заявка принята!");

    }

    catch (e) {

        alert("Ошибка");

    }

};

window.botSend = function() {

    const inp =
        document.getElementById(
            'botInp'
        );

    const val =
        inp.value.toLowerCase();

    if (!val) return;

    const msgs =
        document.getElementById(
            'botMsgs'
        );

    const uDiv =
        document.createElement(
            'div'
        );

    uDiv.className =
        'msg user';

    uDiv.innerText =
        inp.value;

    msgs.appendChild(uDiv);

    let res =
        "Не понял вопрос";

    if (val.includes("цена"))
        res =
            "Очное: 140 000 ₸";

    if (val.includes("док"))
        res =
            "Нужны: Аттестат, удостоверение, медсправка";

    if (val.includes("адрес"))
        res =
            "г. Жезказган";

    setTimeout(() => {

        const bDiv =
            document.createElement(
                'div'
            );

        bDiv.className =
            'msg bot';

        bDiv.innerText =
            res;

        msgs.appendChild(
            bDiv
        );

        msgs.scrollTop =
            msgs.scrollHeight;

    }, 600);

    inp.value = "";

};

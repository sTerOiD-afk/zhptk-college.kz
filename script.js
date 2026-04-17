<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ЖВПТК 2026 — Премиальный портал</title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Manrope:wght@300;500;800&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary: #007aff;
            --secondary: #6366f1;
            --accent: #00f2fe;
            --dark: #020617;
            --surface: #0f172a;
            --glass: rgba(255, 255, 255, 0.03);
            --border: rgba(255, 255, 255, 0.1);
        }

        * { box-sizing: border-box; transition: 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
        body {
            font-family: 'Manrope', sans-serif;
            background: var(--dark);
            color: #e2e8f0;
            margin: 0;
            overflow-x: hidden;
            scroll-behavior: smooth;
        }

        .cyber-bg {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            z-index: -1; 
            background: linear-gradient(-45deg, #020617, #0f172a, #1a1025, #082f49);
            background-size: 400% 400%;
            animation: gradientBG 20s ease infinite;
        }

        .aurora {
            position: absolute; width: 150%; height: 150%;
            background: radial-gradient(circle at 50% 50%, rgba(0, 242, 254, 0.05), transparent 50%);
            top: -25%; left: -25%; animation: rotate 40s linear infinite;
        }

        .auth-btn {
            text-decoration: none;
            padding: 10px 20px;
            display: inline-block;
            background: var(--primary); 
            color: white !important; 
            border-radius: 20px !important;
        }

        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        nav {
            position: fixed; top: 0; width: 100%; height: 80px;
            background: rgba(2, 6, 23, 0.8); backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border); display: flex;
            justify-content: center; align-items: center; z-index: 1000; gap: 20px;
            flex-wrap: wrap;
        }
        nav a { color: #94a3b8; text-decoration: none; font-weight: 700; font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; padding: 10px 15px; cursor: pointer; }
        nav a:hover, nav a.active { color: var(--accent); background: var(--glass); border-radius: 12px; }

        .welcome-screen { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; position: relative; z-index: 10; padding: 0 20px; }
        .welcome-title { font-size: clamp(3rem, 6vw, 6rem); margin: 0; font-weight: 800; font-family: 'Space Grotesk'; animation: fadeInDown 1.2s ease; }
        .welcome-subtitle { color: var(--accent); letter-spacing: 4px; font-weight: 700; font-size: clamp(1rem, 2vw, 2rem); margin-top: 15px; animation: fadeInUp 1.2s ease 0.3s both; }
        .scroll-down { position: absolute; bottom: 40px; color: var(--accent); font-size: 2rem; animation: bounce 2s infinite; text-decoration: none; opacity: 0.8; }
        .scroll-down:hover { color: white; opacity: 1; }

        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-20px); } 60% { transform: translateY(-10px); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        .container { max-width: 1200px; margin: auto; padding: 60px 20px; }
        .section-title { font-size: 2.8rem; text-align: center; margin-bottom: 50px; font-weight: 800; background: linear-gradient(to right, #fff, var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-family: 'Space Grotesk'; }

        #dashboard-section { 
            display: none; 
            padding-top: 120px;
            margin-bottom: 80px;
        }
        .dashboard-card { background: var(--glass); border: 1px solid var(--primary); border-radius: 40px; padding: 50px; backdrop-filter: blur(25px); position: relative; }
        .user-avatar { width: 80px; height: 80px; background: linear-gradient(135deg, var(--primary), var(--accent)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: #fff; margin-bottom: 20px; }
        .user-info { margin-bottom: 30px; }
        .user-info h3 { font-size: 2rem; margin: 0; font-family: 'Space Grotesk'; color: #fff; }
        .user-info p { color: var(--accent); margin-top: 5px; font-size: 1.1rem; }
        .btn-danger { background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #ef4444; padding: 10px 20px; border-radius: 12px; cursor: pointer; font-weight: bold; }

        .info-menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 80px; }
        .info-menu-card { background: var(--glass); border: 1px solid var(--border); padding: 30px 20px; border-radius: 25px; text-align: center; text-decoration: none; color: white; display: flex; flex-direction: column; align-items: center; gap: 15px; backdrop-filter: blur(10px); }
        .info-menu-card i { font-size: 2.5rem; color: var(--accent); }
        .info-menu-card:hover { background: rgba(0, 122, 255, 0.1); border-color: var(--primary); transform: translateY(-8px); }

        .card-main { background: var(--glass); border: 1px solid var(--border); border-radius: 40px; padding: 50px; backdrop-filter: blur(25px); margin-bottom: 60px; position: relative; overflow: hidden; }

        .timeline { border-left: 2px solid var(--primary); margin: 30px 0 30px 20px; padding-left: 30px; }
        .t-item { margin-bottom: 25px; position: relative; }
        .t-item::before { content: ""; position: absolute; left: -39px; top: 6px; width: 16px; height: 16px; background: var(--accent); border-radius: 50%; border: 4px solid var(--dark); box-shadow: 0 0 15px var(--accent); }
        .t-item b { font-size: 1.3rem; color: var(--accent); display: block; margin-bottom: 5px; }

        .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; }
        .spec-box { background: var(--glass); border: 1px solid var(--border); border-radius: 35px; padding: 35px; }
        .spec-box h3 { font-size: 1.6rem; color: var(--primary); margin-top: 0; display: flex; align-items: center; gap: 15px; }
        .spec-list { list-style: none; padding: 0; margin-top: 20px; }
        .spec-list li { padding: 12px 18px; border-radius: 15px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; background: rgba(255,255,255,0.02); }
        .spec-list li:hover { background: var(--primary); color: white; transform: translateX(10px); }

        .hero-banner { background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 40px; padding: 60px; text-align: center; margin: 80px 0; box-shadow: 0 30px 60px rgba(0,0,0,0.5); }

        .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(15px); display: none; justify-content: center; align-items: center; z-index: 5000; }
        .modal-card { background: #0a0a0a; border: 1px solid var(--primary); width: 90%; max-width: 500px; padding: 40px; border-radius: 40px; position: relative; max-height: 90vh; overflow-y: auto; }
        .close-modal { position: absolute; top: 20px; right: 25px; color: #fff; font-size: 1.5rem; cursor: pointer; }

        .auth-tabs { display: flex; gap: 10px; margin-bottom: 25px; }
        .auth-tab { flex: 1; padding: 10px; text-align: center; background: var(--glass); border-radius: 12px; cursor: pointer; color: #94a3b8; font-weight: bold; }
        .auth-tab.active { background: var(--primary); color: white; }

        .auth-form { display: flex; flex-direction: column; gap: 15px; }
        .auth-form input { padding: 15px; border-radius: 15px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: white; }
        .auth-form button { padding: 15px; border-radius: 15px; background: var(--accent); color: var(--dark); border: none; font-weight: bold; font-size: 1.1rem; cursor: pointer; }

        #bot-trigger { position: fixed; bottom: 40px; right: 40px; width: 70px; height: 70px; background: var(--primary); border-radius: 50%; color: white; border: none; font-size: 1.8rem; cursor: pointer; z-index: 6000; box-shadow: 0 15px 40px rgba(0, 122, 255, 0.4); }
        .bot-window { position: fixed; bottom: 125px; right: 40px; width: 380px; height: 500px; background: #0a0a0a; border: 1px solid var(--border); border-radius: 30px; display: none; flex-direction: column; z-index: 6000; overflow: hidden; }
        .bot-header { background: var(--primary); padding: 20px; font-weight: 800; display: flex; justify-content: space-between; }
        .bot-msgs { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; font-size: 0.9rem; }
        .msg.bot { background: var(--glass); align-self: flex-start; padding: 12px; border-radius: 15px; }
        .msg.user { background: var(--primary); align-self: flex-end; padding: 12px; border-radius: 15px; }
        .bot-input { padding: 15px; border-top: 1px solid var(--border); display: flex; gap: 10px; }
        .bot-input input { background: var(--glass); border: 1px solid var(--border); color: white; padding: 12px; border-radius: 20px; flex: 1; outline: none; }

        .honor-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-top: 25px; }
        .honor-item { background: var(--glass); padding: 15px; border-radius: 15px; border: 1px solid var(--border); font-size: 0.9rem; line-height: 1.4; }
        .honor-item i { color: var(--accent); margin-right: 10px; }

        .requisites-box { font-family: monospace; background: rgba(0,0,0,0.3); padding: 20px; border-radius: 20px; border: 1px solid var(--border); margin-top: 20px; text-align: left; font-size: 0.9rem; }
    </style>
</head>
<body>

    <div class="cyber-bg"><div class="aurora"></div></div>

    <nav>
        <a href="#about" class="nav-link">О колледже</a>
        <a href="#specialties" class="nav-link">Специальности</a>
        <a href="#admission" class="nav-link">Поступление</a>
        <a href="#contacts" class="nav-link">Контакты</a>
        <a href="#" onclick="openAuthModal()" id="navAuthBtn" class="auth-btn">
            <i class="fas fa-user"></i> Войти
        </a>
    </nav>

    <div id="landing-content">
        <header class="welcome-screen">
            <h1 class="welcome-title">ЖВПТК <span style="color: var(--accent)">2026</span></h1>
            <p class="welcome-subtitle">ZHEZKAZGAN HIGHER POLYTECHNIC COLLEGE</p>
            <a href="#info-menu" class="scroll-down"><i class="fas fa-chevron-down"></i></a>
        </header>

        <div class="container" id="info-menu">
            <div class="info-menu-grid">
                <a href="#about" class="info-menu-card"><i class="fas fa-university"></i><h3>О колледже</h3></a>
                <a href="#specialties" class="info-menu-card"><i class="fas fa-graduation-cap"></i><h3>Специальности</h3></a>
                <a href="#admission" class="info-menu-card"><i class="fas fa-file-invoice"></i><h3>Поступление</h3></a>
                <a href="#honor-section" class="info-menu-card"><i class="fas fa-scroll"></i><h3>Кодекс чести</h3></a>
            </div>

            <section id="dashboard-section">
                <h2 class="section-title">Личный кабинет</h2>
                <div class="dashboard-card">
                    <div class="user-avatar"><i class="fas fa-user-graduate"></i></div>
                    <div class="user-info">
                        <h3 id="dashName">Загрузка...</h3>
                        <p id="dashEmail">student@email.com</p>
                        <div style="margin-top: 15px; display: inline-block; padding: 5px 15px; background: rgba(16, 185, 129, 0.2); color: #10b981; border-radius: 20px; font-size: 0.9rem;">
                            <i class="fas fa-check-circle"></i> Статус: Абитуриент
                        </div>
                    </div>
                    <div style="margin-top: 40px;">
                        <button class="btn-danger" onclick="logoutUser()"><i class="fas fa-sign-out-alt"></i> Выйти из аккаунта</button>
                    </div>
                </div>
            </section>

            <section id="about">
                <div class="card-main">
                    <h2 class="section-title" style="text-align: left; margin-bottom: 20px;">История и статус</h2>
                    <p style="line-height: 1.8; color: #cbd5e1;">
                        КГКП «Жезказганский высший политехнический колледж» свыше 65 лет функционирует в области предоставления образовательных услуг. 
                        В ведомственном отношении колледж относится к Министерству просвещения РК. Общий стаж деятельности — 69 лет, произведено более 60 выпусков. 
                        Учебный процесс обеспечивают 59 преподавателей (37 высшей и первой категории, 6 магистров).
                    </p>
                    
                    <div class="timeline">
                        <div class="t-item"><b>1953</b> <span>Основан Джезказганский вечерний строительный техникум.</span></div>
                        <div class="t-item"><b>1997</b> <span>Создание аграрно-технического колледжа (слияние 3-х учебных заведений).</span></div>
                        <div class="t-item"><b>2005</b> <span>Переименован в Жезказганский политехнический колледж.</span></div>
                        <div class="t-item"><b>2021</b> <span>Присвоен статус Высшего политехнического колледжа.</span></div>
                    </div>
                </div>
            </section>

            <section id="honor-section" style="margin-bottom: 80px;">
                <h2 class="section-title">Кодекс чести студента</h2>
                <div class="honor-grid">
                    <div class="honor-item"><i class="fas fa-star"></i>Стать достойным гражданином и профессионалом.</div>
                    <div class="honor-item"><i class="fas fa-shield-alt"></i>Сохранять честь и достоинство колледжа.</div>
                    <div class="honor-item"><i class="fas fa-users"></i>Уважать преподавателей и избегать конфликтов.</div>
                    <div class="honor-item"><i class="fas fa-tshirt"></i>Соблюдать культуру общения и деловой стиль.</div>
                    <div class="honor-item"><i class="fas fa-clock"></i>Соблюдать дисциплину и не мешать занятиям.</div>
                    <div class="honor-item"><i class="fas fa-heart"></i>Участвовать в общественной жизни и инициативах.</div>
                    <div class="honor-item"><i class="fas fa-running"></i>ЗОЖ: без алкоголя, наркотиков и табака.</div>
                </div>
            </section>

            <h2 class="section-title" id="specialties">Направления обучения</h2>
            <div class="grid-3">
                <div class="spec-box">
                    <h3><i class="fas fa-laptop-code"></i> IT и Энергетика</h3>
                    <ul class="spec-list">
                        <li onclick="openM('06130100 Программное обеспечение', 'Разработка программ, сайтов и работа с компьютерными системами.', '3г. 10м.')">Программное обеспечение <i class="fas fa-chevron-right"></i></li>
                        <li onclick="openM('07130200 Электроснабжение', 'Обслуживание электрических сетей, подстанций и энергосистем.', '3г. 10м.')">Электроснабжение <i class="fas fa-chevron-right"></i></li>
                        <li onclick="openM('07130400 Теплотехническое оборудование', 'Обслуживание котельных, тепловых сетей и систем отопления.', '3г. 10м.')">Теплотехнические системы <i class="fas fa-chevron-right"></i></li>
                    </ul>
                </div>
                <div class="spec-box">
                    <h3><i class="fas fa-truck"></i> Транспорт и ЧС</h3>
                    <ul class="spec-list">
                        <li onclick="openM('07161300 Автомобильный транспорт', 'Диагностика, ремонт и эксплуатация автомобилей.', '3г. 10м.')">Тех. обслуживание авто <i class="fas fa-chevron-right"></i></li>
                        <li onclick="openM('10410200 Ж/Д Транспорт', 'Управление движением поездов и организация перевозок на ЖД.', '3г. 10м.')">Организация перевозок (ЖД) <i class="fas fa-chevron-right"></i></li>
                        <li onclick="openM('10320200 Защита в ЧС', 'Действия при пожарах, авариях и обеспечение безопасности.', '3г. 10м.')">Защита в ЧС <i class="fas fa-chevron-right"></i></li>
                    </ul>
                </div>
                <div class="spec-box">
                    <h3><i class="fas fa-tools"></i> Строительство и Газ</h3>
                    <ul class="spec-list">
                        <li onclick="openM('07320100 Строительство', 'Строительство, ремонт и эксплуатация зданий и сооружений.', '3г. 10м.')">Строительство зданий <i class="fas fa-chevron-right"></i></li>
                        <li onclick="openM('07321200 Газоснабжение', 'Монтаж и эксплуатация систем газоснабжения.', '3г. 10м.')">Системы газоснабжения <i class="fas fa-chevron-right"></i></li>
                        <li onclick="openM('1202000 Автоперевозки', 'Управление движением на автомобильном транспорте.', '3г. 10м.')">Логистика автотранспорта <i class="fas fa-chevron-right"></i></li>
                    </ul>
                </div>
            </div>

            <div id="admission" class="card-main" style="margin-top: 80px;">
                <h2 class="section-title">Приемная кампания 2026</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; text-align: left;">
                    <div>
                        <h3 style="color: var(--accent);"><i class="fas fa-file-alt"></i> Документы:</h3>
                        <ul style="line-height: 2; color: #94a3b8;">
                            <li>• Аттестат или диплом (оригинал)</li>
                            <li>• Удостоверение личности (копия)</li>
                            <li>• Медсправка (086-У или 075-У)</li>
                            <li>• 4 фотографии (3×4)</li>
                            <li>• Сертификат ЕНТ (при наличии)</li>
                        </ul>
                        <p style="color: var(--primary); font-weight: bold;">Сроки: Очное (20.06 - 25.08), Заочное (до 20.09)</p>
                    </div>
                    <div>
                        <h3 style="color: var(--accent);"><i class="fas fa-tenge"></i> Стоимость и оплата:</h3>
                        <p>Очное: <b>140 000 ₸</b> / Заочное: <b>90 000 ₸</b></p>
                        <p style="font-size: 0.9rem; color: #94a3b8;">* Предоплата 50% до 10 сентября, остаток до 10 января.</p>
                        <div class="requisites-box">
                            БИН: 990140001302<br>
                            ИИК: KZ876017171000000065<br>
                            БИК: HSBKKZKX<br>
                            Банк: АО «Народный Банк Казахстана»
                        </div>
                    </div>
                </div>

                <div class="hero-banner" style="margin-top: 50px; padding: 40px;">
                    <h3>Оставить быструю заявку</h3>
                    <input id="studentName" placeholder="ФИО" style="padding:12px; margin:5px; border-radius:10px; background: var(--glass); color: white; border: 1px solid var(--border); width: 250px;">
                    <input id="studentPhone" placeholder="Телефон" style="padding:12px; margin:5px; border-radius:10px; background: var(--glass); color: white; border: 1px solid var(--border); width: 250px;">
                    <button onclick="addStudent()" style="padding:12px 30px; border:none; border-radius:10px; background:var(--accent); cursor:pointer; color: #020617; font-weight: bold;">Отправить</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="modalSpec" onclick="closeM()">
        <div class="modal-card" onclick="event.stopPropagation()">
            <h2 id="mTitle" style="color: var(--accent); margin-top: 0;"></h2>
            <p id="mDesc" style="line-height: 1.8; color: white;"></p>
            <div style="background: var(--glass); padding: 20px; border-radius: 20px; border: 1px solid var(--primary); margin-top: 25px;"><b id="mTime" style="color: white;"></b></div>
            <button style="padding: 15px; width: 100%; border: none; cursor: pointer; margin-top: 30px; border-radius: 15px; background: var(--primary); color: white; font-weight: bold;" onclick="closeM()">Закрыть</button>
        </div>
    </div>

    <div class="modal" id="authModal" onclick="closeAuthModal()">
        <div class="modal-card" onclick="event.stopPropagation()">
            <span class="close-modal" onclick="closeAuthModal()">&times;</span>
            <div class="auth-tabs">
                <div class="auth-tab active" id="tabLogin" onclick="switchAuthTab('login')">Вход</div>
                <div class="auth-tab" id="tabReg" onclick="switchAuthTab('reg')">Регистрация</div>
            </div>
            <div id="formLogin" class="auth-form">
                <input type="email" id="loginEmail" placeholder="Email">
                <input type="password" id="loginPass" placeholder="Пароль">
                <button onclick="loginUser()">Войти</button>
                <p id="loginErr" style="color: #ef4444; font-size: 0.8rem; display: none;"></p>
            </div>
            <div id="formReg" class="auth-form" style="display: none;">
                <input type="text" id="regName" placeholder="ФИО">
                <input type="email" id="regEmail" placeholder="Email">
                <input type="password" id="regPass" placeholder="Пароль">
                <button onclick="registerUser()">Создать аккаунт</button>
            </div>
        </div>
    </div>

    <button id="bot-trigger" onclick="toggleBot()"><i class="fas fa-robot"></i></button>
    <div class="bot-window" id="botWindow">
        <div class="bot-header"><span>Smart-Ассистент</span><span onclick="toggleBot()" style="cursor:pointer">&times;</span></div>
        <div class="bot-msgs" id="botMsgs">
            <div class="msg bot">Здравствуйте! Спросите меня про Цену, Документы, Адрес, Специальности, Срок обучения, Сроки поступления, Оплата, Реквизиты, Сайт, Instagram, Онлайн заявка, Преподаватели, Общежитие, Контакты. </div>
        </div>
        <div class="bot-input">
            <input type="text" id="botInp" placeholder="Напишите вопрос..." onkeypress="if(event.key==='Enter') botSend()">
        </div>
    </div>
    
    <section id="contacts" style="margin-top: 80px;">
        <div class="card-main">
            <h2 class="section-title">Контакты</h2>
            
            <div style="line-height: 2; font-size: 1.1rem; padding-left: 20px;">
                <p><i class="fas fa-map-marker-alt" style="color: var(--accent); margin-right: 10px;"></i> г. Жезказган, ул. Байконурова, 19</p>
                <p><i class="fas fa-phone" style="color: var(--accent); margin-right: 10px;"></i> Тел: 8 (705) 267-12-34</p>
                <p><i class="fas fa-envelope" style="color: var(--accent); margin-right: 10px;"></i> Email: jezatk@mail.ru</p>
            </div>

            <div style="margin-top: 35px; display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">
                <a href="https://zhptk.edu.kz/" target="_blank" class="auth-btn">🌐 Официальный сайт</a>
                <a href="https://www.instagram.com/zhptk.kz/" target="_blank" class="auth-btn">📸 Instagram</a>
                <a href="https://college.smartnation.kz/kz/tko" target="_blank" class="auth-btn">📝 Подать заявление онлайн</a>
            </div>
        </div>
    </section>

    <script type="module">
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
                if (typeof window.closeAuthModal === 'function') {
                    window.closeAuthModal();
                }
                navBtn.innerHTML = '<i class="fas fa-user-circle"></i> Кабинет';
                navBtn.href = "cabinet.html"; 
                navBtn.target = "_blank"; 
                navBtn.onclick = null; 
                
                if (dash) dash.style.display = 'none';
            } else {
                navBtn.innerHTML = '<i class="fas fa-user"></i> Войти';
                navBtn.onclick = window.openAuthModal; 
                navBtn.href = "#";
                navBtn.target = "_self";
                if (dash) dash.style.display = 'none';
            }
        });

        window.openM = function(title, desc, time) {
            document.getElementById('mTitle').innerText = title;
            document.getElementById('mDesc').innerText = desc;
            document.getElementById('mTime').innerText = "Срок обучения: " + time;
            document.getElementById('modalSpec').style.display = 'flex';
        };

        window.closeM = function() {
            document.getElementById('modalSpec').style.display = 'none';
        };

        window.switchAuthTab = function(tabId) {
            document.getElementById('tabLogin').classList.remove('active');
            document.getElementById('tabReg').classList.remove('active');
            document.getElementById('formLogin').style.display = 'none';
            document.getElementById('formReg').style.display = 'none';

            if (tabId === 'login') {
                document.getElementById('tabLogin').classList.add('active');
                document.getElementById('formLogin').style.display = 'flex';
            } else {
                document.getElementById('tabReg').classList.add('active');
                document.getElementById('formReg').style.display = 'flex';
            }
        };

        // --- НАСТОЯЩАЯ ЛОГИКА РЕГИСТРАЦИИ ---
        window.registerUser = async function() {
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const pass = document.getElementById('regPass').value;

            if (!name || !email || !pass) {
                alert("Пожалуйста, заполните все поля!");
                return;
            }

            try {
                // 1. Создаем пользователя в Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
                const user = userCredential.user;

                // 2. Сохраняем имя пользователя в базу данных Firestore
                await setDoc(doc(db, "users", user.uid), {
                    fio: name,
                    email: email,
                    role: "Абитуриент", // Роль по умолчанию
                    createdAt: serverTimestamp()
                });

                alert("Регистрация успешно завершена!");
                
                // Закрываем модальное окно после успеха
                if (typeof window.closeAuthModal === 'function') {
                    window.closeAuthModal();
                }

            } catch (error) {
                console.error("Ошибка регистрации:", error.code, error.message);
                alert("Ошибка: " + error.message);
            }
        };

        // --- НАСТОЯЩАЯ ЛОГИКА ВХОДА ---
        window.loginUser = async function() {
            const email = document.getElementById('loginEmail').value;
            const pass = document.getElementById('loginPass').value;
            const errText = document.getElementById('loginErr');

            if (!email || !pass) {
                errText.innerText = "Введите Email и пароль";
                errText.style.display = "block";
                return;
            }

            try {
                // Пытаемся войти
                await signInWithEmailAndPassword(auth, email, pass);
                errText.style.display = "none";
                
                // Закрываем окно при успешном входе
                if (typeof window.closeAuthModal === 'function') {
                    window.closeAuthModal();
                }
            } catch (error) {
                console.error("Ошибка входа:", error);
                errText.innerText = "Неверный Email или пароль!";
                errText.style.display = "block";
            }
        };

        // --- НАСТОЯЩАЯ ЛОГИКА ВЫХОДА ---
        window.logoutUser = async function() {
            try {
                await signOut(auth);
                alert("Вы успешно вышли из аккаунта");
            } catch (error) {
                console.error("Ошибка при выходе:", error);
            }
        };

        window.addStudent = function() {
            const name = document.getElementById('studentName').value;
            if(name) {
                alert("Заявка для " + name + " успешно отправлена!");
                document.getElementById('studentName').value = '';
                document.getElementById('studentPhone').value = '';
            } else {
                alert("Пожалуйста, введите ваше имя.");
            }
        };

        window.botSend = function() {
            const inp = document.getElementById('botInp');
            const val = inp.value.toLowerCase().trim();
            if (!val) return;

            const msgs = document.getElementById('botMsgs');

            const uDiv = document.createElement('div');
            uDiv.className = 'msg user';
            uDiv.innerText = inp.value;
            msgs.appendChild(uDiv);

            let res = "Не понял вопрос 🤔 Попробуйте: цена, документы, адрес, специальности, сроки.";

            if (val.match(/цена|стоимость|сколько|плат/i)) {
                res = "💰 Очное: 140 000 ₸\n💰 Заочное: 90 000 ₸\nПредоплата 50% до 10 сентября.";
            } else if (val.match(/документ|что нужно|поступить|поступлен/i)) {
                res = "📄 Нужно:\n• Аттестат\n• Удостоверение личности\n• Медсправка 075-У\n• 4 фото 3x4";
            } else if (val.match(/адрес|где|находит/i)) {
                res = "📍 г. Жезказган, ул. Байконурова, 19\n📞 8 (705) 267-12-34";
            } else if (val.match(/специальност|професси|направлен/i)) {
                res = "🎓 Специальности:\n• Программное обеспечение\n• Электроснабжение\n• Строительство\n• Автотранспорт\n• ЧС";
            } else if (val.match(/срок|учиться|сколько лет/i)) {
                res = "⏳ Срок обучения: 3 года 10 месяцев.";
            } else if (val.match(/когда поступ|сроки|дедлайн/i)) {
                res = "📅 Прием документов:\nОчное: 20 июня – 25 августа\nЗаочное: до 20 сентября";
            } else if (val.match(/оплата|рассрочка|платеж/i)) {
                res = "💳 Можно оплатить в 2 этапа:\n50% до 10 сентября\n50% до 10 января.";
            } else if (val.match(/реквизит|банк|бин/i)) {
                res = "🏦 БИН: 990140001302\nИИК: KZ876017171000000065\nБанк: Halyk Bank";
            } else if (val.match(/сайт|официальный/i)) {
                res = "🌐 https://zhptk.edu.kz/";
            } else if (val.match(/инст|instagram/i)) {
                res = "📸 https://www.instagram.com/zhptk.kz/";
            } else if (val.match(/заявк|онлайн|подать/i)) {
                res = "📝 Подать онлайн:\nhttps://college.smartnation.kz/kz/tko";
            } else if (val.match(/преподавател|учител/i)) {
                res = "👨‍🏫 В колледже работают более 50 преподавателей, включая магистров и специалистов высшей категории.";
            } else if (val.match(/общежити|жилье/i)) {
                res = "🏫 Информацию об общежитии уточняйте в приемной комиссии.";
            } else if (val.match(/телефон|номер|связ/i)) {
                res = "📞 Телефон: 8 (705) 267-12-34\n📧 Email: jezatk@mail.ru";
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

        window.toggleBot = function() {
            const bw = document.getElementById('botWindow');
            if(bw.style.display === 'flex') {
                bw.style.display = 'none';
            } else {
                bw.style.display = 'flex';
            }
        };

        window.openAuthModal = function() {
            document.getElementById('authModal').style.display = 'flex';
        };

        window.closeAuthModal = function() {
            document.getElementById('authModal').style.display = 'none';
        };
    </script>
</body>
</html>

const sphereContainer = document.querySelector('.sphere-container');
const answer = document.querySelector('.answer');
const question = document.querySelector('.question');
const submitBtn = document.querySelector('.submit-btn');
const historyBtn = document.querySelector('.history-btn');
const historyModal = document.querySelector('.history-modal');
const closeBtn = document.querySelector('.close');
const historyList = document.querySelector('.history-list');
const clearAllBtn = document.querySelector('.clear-all-btn');

const answers = [
    "Звезды сходятся в вашу пользу",
    "Туманное будущее ждет вас",
    "Судьба улыбается вам",
    "Ответ скрыт в глубинах космоса",
    "Мистические силы говорят 'да'",
    "Нити судьбы переплетаются неожиданным образом",
    "Вероятность успеха: 78.3%",
    "Энергии Вселенной неоднозначны",
    "Карты Таро предсказывают удачу",
    "Знаки указывают на отрицательный исход",
    "Медитируйте над этим вопросом еще",
    "Удача на вашей стороне: 92.7%",
    "Космические ветры нестабильны",
    "Ваша аура сияет ярче обычного",
    "Духи советуют подождать",
    "Энергетический потенциал растет",
    "Кристальный шар видит благоприятный исход",
    "Астральные проекции требуют дополнительного анализа",
    "Предсказание неоднозначно, но перспективно",
    "Мистические силы советуют действовать незамедлительно",
    "Ваши звезды ярко горят",
    "Луна поддерживает ваши начинания",
    "Солнце светит на ваш путь",
    "Вселенная шепчет вам 'да'",
    "Космическая энергия на вашей стороне",
    "Гороскоп предвещает удачу",
    "Фортуна улыбается вам",
    "Звездная пыль приносит удачу",
    "Гадание на кофейной гуще благоприятно",
    "Чакры сбалансированы",
    "Ваш путь освещен",
    "Древние руны говорят 'да'",
    "Судьба пишет вам благоприятный сценарий",
    "Астральная энергия благоприятна",
    "Космические силы направляют вас",
    "Ваше время настало",
    "Тени предсказывают успех",
    "Ваше будущее светлое",
    "Звездные карты на вашей стороне",
    "Потоки энергии указывают на успех",
    "Ваши духовные наставники поддерживают вас",
    "Кармические циклы благоприятны",
    "Ваше внутреннее свечение усиливается",
    "Вселенная раскрывает свои тайны для вас",
    "Звезды благоволят вам",
    "Духи шепчут вам 'да'",
    "Космические вибрации положительны",
    "Ваш астральный путь ясен",
    "Время на вашей стороне",
    "Ваше предчувствие верно",
    "Галактические силы поддерживают вас",
    "Карма на вашей стороне",
    "Звезды предвещают удачу",
    "Вы на правильном пути",
    "Ваша энергия гармонична",
    "Аура чиста и сильна",
    "Ваши намерения поддержаны Вселенной",
    "Космос отвечает 'да'",
    "Ваше внутреннее светило сияет",
    "Астральные течения благоприятны",
    "Магические силы на вашей стороне",
    "Ваш путь освещен звездами",
    "Судьба указывает вам 'да'",
    "Ваше духовное равновесие идеальное",
    "Космическая энергия благоприятна",
    "Ваши мечты сбываются",
    "Горизонты ясны и открыты",
    "Ваши вибрации высоки",
    "Звезды говорят 'да'",
    "Духи природы на вашей стороне",
    "Астральная проекция показывает успех",
    "Ваши намерения чисты и поддержаны",
    "Ваша духовная сила растет",
    "Космическая гармония поддерживает вас",
    "Ваши усилия будут вознаграждены",
    "Ваши звездные карты благоприятны",
    "Ваше энергетическое поле чисто",
    "Ваши интуитивные чувства сильны",
    "Ваш духовный путь ясен",
    "Ваше внутреннее свечение ярко",
    "Ваша судьба благоприятна",
    "Космос улыбается вам",
    "Ваши намерения ясны и чисты",
    "Вселенная поддерживает ваши начинания",
    "Ваши духовные наставники рядом",
    "Звезды предсказывают успех",
    "Ваш путь освещен космическим светом",
    "Ваше внутреннее свечение усиливается",
    "Духовные силы говорят 'да'",
    "Ваши намерения будут реализованы",
    "Вселенская любовь поддерживает вас",
    "Ваше будущее благоприятно",
    "Ваши звезды светят ярче",
    "Духовная энергия на вашей стороне",
    "Ваши намерения ясны и сильны",
    "Звезды благосклонны к вам",
    "Ваше духовное свечение усиливается",
    "Ваши звезды указывают на успех",
    "Ваше будущее светлое и ясное",
    "Звездные карты благоприятны",
    "Ваш путь ясен и светел"
];


let history = JSON.parse(localStorage.getItem('predictionHistory')) || [];

function revealAnswer() {
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    answer.textContent = '';
    answer.classList.add('reveal-answer');

    setTimeout(() => {
        typewriterEffect(answer, randomAnswer, 30);
    }, 500);

    history.unshift({question: question.value, answer: randomAnswer});
    if (history.length > 10) history.pop();
    updateHistoryList();
    saveHistory();
}

function resetSphere() {
    answer.classList.remove('reveal-answer');
}

function askQuestion() {
    if (question.value.trim() !== '') {
        resetSphere();
        sphereContainer.style.animation = 'none';
        void sphereContainer.offsetWidth; // Trigger reflow
        sphereContainer.style.animation = 'analyzeShake 0.5s cubic-bezier(.36,.07,.19,.97) both';
        setTimeout(() => {
            revealAnswer();
            sphereContainer.style.animation = 'float 6s ease-in-out infinite';
        }, 500);
    } else {
        alert('Пожалуйста, задайте вопрос мистическому шару.');
    }
}

submitBtn.addEventListener('click', askQuestion);

question.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        askQuestion();
    }
});

question.addEventListener('focus', resetSphere);

function updateGlow() {
    const sphere = document.querySelector('.sphere');
    const sphereInner = document.querySelector('.sphere-inner');
    const glowIntensity = 20 + Math.random() * 20;
    const glowColor1 = `rgba(0, 255, 255, ${0.1 + Math.random() * 0.2})`;
    const glowColor2 = `rgba(255, 0, 255, ${0.1 + Math.random() * 0.2})`;

    sphere.style.boxShadow = `0 0 ${glowIntensity}px ${glowColor1}, 0 0 ${glowIntensity * 1.5}px ${glowColor2}`;
    sphereInner.style.boxShadow = `0 0 ${glowIntensity * 0.7}px ${glowColor1}, 0 0 ${glowIntensity}px ${glowColor2}`;
}

setInterval(updateGlow, 100);

function createNeuralNetwork() {
    const neuralNetwork = document.querySelector('.neural-network');
    const numberOfNeurons = 30; // Reduced number for mobile

    for (let i = 0; i < numberOfNeurons; i++) {
        const neuron = document.createElement('div');
        neuron.classList.add('neuron');
        neuron.style.width = `${Math.random() * 3 + 1}px`; // Smaller neurons
        neuron.style.height = neuron.style.width;
        neuron.style.left = `${Math.random() * 100}%`;
        neuron.style.top = `${Math.random() * 100}%`;
        neuron.style.animationDelay = `${Math.random() * 2}s`;
        neuralNetwork.appendChild(neuron);
    }
}

createNeuralNetwork();

const analyzeShakeKeyframes = `
@keyframes analyzeShake {
  10%, 90% { transform: translate3d(-1px, 1px, 0) rotateX(3deg) rotateY(-3deg); }
  20%, 80% { transform: translate3d(2px, -2px, 0) rotateX(-3deg) rotateY(3deg); }
  30%, 50%, 70% { transform: translate3d(-2px, 2px, 0) rotateX(3deg) rotateY(-3deg); }
  40%, 60% { transform: translate3d(2px, -2px, 0) rotateX(-3deg) rotateY(3deg); }
}`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = analyzeShakeKeyframes;
document.head.appendChild(styleSheet);

function updateEnergyField() {
    const energyField = document.querySelector('.energy-field');
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + 180) % 360;
    energyField.style.background = `
    radial-gradient(circle, 
      hsla(${hue1}, 100%, 50%, 0.2) 0%, 
      hsla(${hue2}, 100%, 50%, 0.2) 50%, 
      rgba(255,255,255,0) 70%)
  `;
}

setInterval(updateEnergyField, 3000);

function animateNeuralConnections() {
    const neurons = document.querySelectorAll('.neuron');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < neurons.length; i++) {
            for (let j = i + 1; j < neurons.length; j++) {
                const distance = Math.hypot(
                    neurons[i].offsetLeft - neurons[j].offsetLeft,
                    neurons[i].offsetTop - neurons[j].offsetTop
                );
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(neurons[i].offsetLeft, neurons[i].offsetTop);
                    ctx.lineTo(neurons[j].offsetLeft, neurons[j].offsetTop);
                    ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 100})`;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(drawConnections);
    }

    drawConnections();
}

animateNeuralConnections();

window.addEventListener('resize', () => {
    const canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function updateHistoryList() {
    historyList.innerHTML = '';
    history.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('history-item');
        li.innerHTML = `
      <div>Вопрос: ${item.question}</div>
      <div>Ответ: ${item.answer}</div>
      <button class="delete-btn" data-index="${index}">Удалить</button>
    `;
        historyList.appendChild(li);
    });
}

historyBtn.addEventListener('click', () => {
    historyModal.style.display = 'block';
    updateHistoryList();
});

closeBtn.addEventListener('click', () => {
    historyModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == historyModal) {
        historyModal.style.display = 'none';
    }
});

function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

historyList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        history.splice(index, 1);
        updateHistoryList();
        saveHistory();
    }
});

clearAllBtn.addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите очистить всю историю предсказаний?')) {
        history = [];
        updateHistoryList();
        saveHistory();
    }
});

function saveHistory() {
    localStorage.setItem('predictionHistory', JSON.stringify(history));
}

// Загрузка истории при запуске
updateHistoryList();

// Добавляем обработку касаний для мобильных устройств
let touchStartX = 0;
let touchEndX = 0;

sphereContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

sphereContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        // Свайп влево
        askQuestion();
    }
}

// Оптимизация для мобильных устройств
function optimizeForMobile() {
    if (window.innerWidth <= 600) {
        // Уменьшаем количество нейронов
        const neurons = document.querySelectorAll('.neuron');
        neurons.forEach((neuron, index) => {
            if (index > 15) {
                neuron.remove();
            }
        });

        // Уменьшаем частоту обновления свечения
        clearInterval(window.glowInterval);
        window.glowInterval = setInterval(updateGlow, 200);
    }
}

window.addEventListener('resize', optimizeForMobile);
optimizeForMobile();
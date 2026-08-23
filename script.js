// 1. Укажи дату вашего знакомства или начала отношений (Год, Месяц - 1, День)
// Внимание: месяцы в JS считаются с 0 (Январь = 0, Февраль = 1, ..., Декабрь = 11)
const startDate = new Date(2026, 1, 1); 

function updateCounter() {
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    document.getElementById('days-count').innerText = diffDays;
}

updateCounter();

// 2. Кнопка с сюрпризом и сердечками
const hugBtn = document.getElementById('hugBtn');
const message = document.getElementById('message');

hugBtn.addEventListener('click', () => {
    // Показываем секретное сообщение
    message.classList.add('show');

    // Запускаем салют из сердечек
    for (let i = 0; i < 30; i++) {
        setTimeout(createHeart, i * 100);
    }
});

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Рандомный выбор эмодзи
    const hearts = ['❤️', '💖', '✨', '🌸', '💕'];
    heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // От 3 до 5 секунд
    
    document.body.appendChild(heart);

    setTimeout(() => { 
        heart.remove(); 
    }, 5000);
}


// Логика для переворота карточек и вопросов с замком
const cards = document.querySelectorAll('.flip-card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        // Если уже перевернута — ничего не делаем
        if (card.classList.contains('flipped')) return;

        // Если карточка заблокирована
        if (card.classList.contains('locked')) {
            const question = card.getAttribute('data-question');
            const correctAnswer = card.getAttribute('data-answer').toLowerCase().trim();

            const userAnswer = prompt(`🔒 Эта карточка заблокирована!\nОтветь на вопрос: ${question}`);

            if (userAnswer && userAnswer.toLowerCase().trim() === correctAnswer) {
                alert('Правильно! 🎉 Карточка открыта!');
                card.classList.remove('locked');
                card.classList.add('flipped');
            } else if (userAnswer !== null) {
                alert('Упс! Неправильный ответ 😜 Попробуй ещё раз!');
            }
        } else {
            // Обычная карточка — просто переворачиваем
            card.classList.add('flipped');
        }
    });
});
// Theme switching logic
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '☀️';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '🌙';
    }
});

class LottoNumber extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        this.render(number);
    }

    render(number) {
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: inline-block; /* Allow animation delay to work */
                transform: scale(0);
                animation: pop-in 0.5s forwards;
            }
            .ball {
                width: 60px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5em;
                font-weight: bold;
                border-radius: 50%;
                color: white;
                background: linear-gradient(145deg, #89f7fe, #66a6ff);
                box-shadow: 0 4px 10px rgba(102, 166, 255, 0.5);
            }
            @keyframes pop-in {
                to {
                    transform: scale(1);
                }
            }
        `;

        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.textContent = number;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(ball);
    }
}

customElements.define('lotto-number', LottoNumber);

document.getElementById('generate-button').addEventListener('click', () => {
    const numbersContainer = document.getElementById('numbers-container');
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    let delay = 0;
    for (const number of Array.from(numbers).sort((a, b) => a - b)) {
        const lottoNumber = document.createElement('lotto-number');
        lottoNumber.setAttribute('number', number);
        lottoNumber.style.animationDelay = `${delay}s`;
        numbersContainer.appendChild(lottoNumber);
        delay += 0.1;
    }
});

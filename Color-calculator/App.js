const panel1 = document.getElementById('panel1');
const panel2 = document.getElementById('panel2');
const resultPanel = document.getElementById('resultPanel');
const refreshBtn = document.getElementById('refreshBtn');
let turn = 1; // 1 — первая панель, 2 — вторая

const colorMap = {
    "черный": "#000000",
    "белый": "#ffffff",
    "красный": "#ff0000",
    "жёлтый": "#ffd600",
    "зелёный": "#21c721",
    "синий": "#2196f3"
};

let color1 = null;
let color2 = null;

function hexToRgb(hex) {
    // Удаляем #
    hex = hex.replace(/^#/, '');
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r, g, b];
}

function rgbToHex([r, g, b]) {
    return "#" + [r, g, b].map(x => {
        let hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('');
}

function mixColors(hex1, hex2) {
    let rgb1 = hexToRgb(hex1);
    let rgb2 = hexToRgb(hex2);
    let mixed = rgb1.map((v, i) => Math.round((v + rgb2[i]) / 2));
    return rgbToHex(mixed);
}

function updateResult() {
    if (color1 && color2) {
        const mixed = mixColors(color1, color2);
        resultPanel.style.background = mixed;
        resultPanel.style.color = "#111";
        resultPanel.textContent = "Результат: " + mixed.toUpperCase();
    } else {
        resultPanel.style.background = "#eeeeee";
        resultPanel.style.color = "#111";
        resultPanel.textContent = "Нет результата";
    }
}

document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const colorName = btn.getAttribute('data-color');
        const colorValue = colorMap[colorName];

        if (turn === 1) {
            color1 = colorValue;
            panel1.style.background = colorValue;
            panel1.textContent = colorName.charAt(0).toUpperCase() + colorName.slice(1);
            turn = 2;
        } else {
            color2 = colorValue;
            panel2.style.background = colorValue;
            panel2.textContent = colorName.charAt(0).toUpperCase() + colorName.slice(1);
            turn = 1;
        }
        updateResult();
    });
    refreshBtn.addEventListener('click', () => {
        // Сбросим состояние, не перезагружая страницу
        color1 = null;
        color2 = null;
        panel1.style.background = "#cccccc";
        panel2.style.background = "#cccccc";
        panel1.textContent = "Нет цвета";
        panel2.textContent = "Нет цвета";
        turn = 1;
        updateResult();
    });
});

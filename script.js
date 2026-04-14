const surahName = document.getElementById('surahName');
const audioPlayer = document.getElementById('audioPlayer');
const searchInput = document.getElementById('searchInput');
const surahList = document.getElementById('surahList');

let surahs = [];
let surahIndex = 0;

searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const items = surahList.getElementsByTagName('li');

    Array.from(items).forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(filter) ? '' : 'none';
    });
});

async function fetchSurahs() {
    try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        const allData = await response.json();
        surahs = allData.data;
        renderSurahList(surahs);
    } catch (err) {
        console.error(err);
        surahName.innerText = 'Error loading data';
    }
}

function renderSurahList(data) {
    surahList.innerHTML = '';
    data.forEach((x, index) => {
        let li = document.createElement('li');
        li.innerHTML = `
            <span>${x.number}. ${x.name}</span>
            <small>${x.englishName}</small>
        `;
        li.addEventListener('click', () => playSurah(index));
        surahList.appendChild(li);
    });
}

function playSurah(index) {
    surahIndex = index;
    const s = surahs[index];
    const surahNumber = String(s.number).padStart(3, '0');
    const audioUrl = `https://server11.mp3quran.net/yasser/${surahNumber}.mp3`;
    
    surahName.innerText = s.name;
    audioPlayer.src = audioUrl;
    audioPlayer.play();
}

fetchSurahs();
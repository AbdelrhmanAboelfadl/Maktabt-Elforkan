// ===========================================تعريف المتغيرات===============================================

const reciters = document.querySelector("#reciters");
const rewaya = document.querySelector("#system");
rewaya.innerHTML = `<option value="" disabled selected hidden>اختر الرواية</option>`;
const suwars = document.querySelector("#sora");
suwars.innerHTML += `<option value="" disabled selected hidden>اختر السورة</option>`;
const player = document.querySelector("#player");
const apiUrl = 'https://www.mp3quran.net/api/v3';
const endPoint = 'reciters';
const language = 'ar';
let boxOfPop = document.querySelector(".pop-box");
const reciters2 = document.querySelector("#reciters2");
const rewaya2 = document.querySelector("#system2");
rewaya2.innerHTML = `<option value="" disabled selected hidden>اختر الرواية</option>`;
const suwars2 = document.querySelector("#sora2");
suwars2.innerHTML += `<option value="" disabled selected hidden>اختر السورة</option>`;
const player2 = document.querySelector("#player2");

// =======================================================================================================

// =============================================section2==================================================

async function getMoushaf(reciter) {
    const res = await fetch(`${apiUrl}/${endPoint}?language=${language}&reciter=${reciter}`);
    const data = await res.json();
    const mushaf = data.reciters[0].moshaf;
    rewaya.innerHTML = `<option value="" disabled selected hidden>اختر الرواية</option>`;
    mushaf.forEach((item) => {
        rewaya.innerHTML += `
        <option value="${item.id}" data-server="${item.server}" data-list="${item.surah_list}">${item.name}</option>
        `
    });
    rewaya.addEventListener("change", (e) => {
        const selectedMoshaf = rewaya.options[rewaya.selectedIndex];
        const soraServer = selectedMoshaf.dataset.server;
        const soraList = selectedMoshaf.dataset.list;
        getSura(soraServer,soraList);
    });
};
async function getReciters() {
    const res = await fetch(`${apiUrl}/${endPoint}?language=${language}`);
    const data = await res.json();
};
async function getSura(soraServer,soraList) {
    const res = await fetch(`https://mp3quran.net/api/v3/suwar`);
    const data = await res.json();
    const soraNames = data.suwar;
    soraList = soraList.split(",");
    suwars.innerHTML = `<option value="" disabled selected hidden>اختر السورة</option>`
    soraList.forEach((sora) => {
        const padSura = sora.padStart(3, "0");
        soraNames.forEach((soraName) => {
            if (soraName.id == sora) {
                suwars.innerHTML += `
                    <option value="${soraServer}${padSura}.mp3">${soraName.name}</option>
                `
            }
        })
    })
};
getReciters();
suwars.addEventListener("change", (e) => {
    const selectedSora = suwars.options[suwars.selectedIndex];
    playSora(selectedSora.value);
});
function playSora(soraMp3) {
    player.pause(); 
    player.src = soraMp3;
    player.load();
    player.play();
};

// ==================================================================================================

boxOfPop.addEventListener("click", (e) => {
    e.stopPropagation();
});

// =============================================section3==================================================

async function getReciters2() {
    const res = await fetch(`${apiUrl}/${endPoint}?language=${language}`);
    const data = await res.json();
    reciters2.innerHTML = `<option value="" disabled selected hidden>اختر القارئ</option>`;
    data.reciters.forEach(item => {
        reciters2.innerHTML += `<option value="${item.id}">${item.name}</option>`;
    });

    reciters2.addEventListener("change", async (e) => {
        const res = await fetch(`${apiUrl}/${endPoint}?language=${language}&reciter=${e.target.value}`);
        const data2 = await res.json();
        const mushaf = data2.reciters[0].moshaf;
        rewaya2.innerHTML = `<option value="" disabled selected hidden>اختر الرواية</option>`;
        mushaf.forEach((item) => {
            rewaya2.innerHTML += `
                <option value="${item.id}" data-server="${item.server}" data-list="${item.surah_list}">${item.name}</option>
            `;
        });

        rewaya2.addEventListener("change", async (ev) => {
            const selectedMoshaf = rewaya2.options[rewaya2.selectedIndex];
            const soraServer = selectedMoshaf.dataset.server;
            const soraList = selectedMoshaf.dataset.list.split(",");
            const res3 = await fetch(`https://mp3quran.net/api/v3/suwar`);
            const data3 = await res3.json();
            suwars2.innerHTML = `<option value="" disabled selected hidden>اختر السورة</option>`;
            data3.suwar.forEach((soraName) => {
                soraList.forEach((sora) => {
                    const padSura = sora.padStart(3, "0");
                    if (soraName.id == sora) {
                        suwars2.innerHTML += `<option value="${soraServer}${padSura}.mp3">${soraName.name}</option>`;
                    }
                });
            });
        });
    });

    suwars2.addEventListener("change", (e) => {
        const selectedSora = suwars2.options[suwars2.selectedIndex];
        player2.pause();
        player2.src = selectedSora.value;
        player2.load();
        player2.play();
        player2.addEventListener("play", () => {
            $(".imgTitleBox").addClass("play");
        });
    
        player2.addEventListener("pause", () => {
            $(".imgTitleBox").removeClass("play");
        });
});
};

getReciters2();

// =======================================================================================================

$(document).ready(function () {
    $('#pagepiling').pagepiling({
    direction: 'vertical',
    navigation: false,
    scrollingSpeed: 700,
    anchors: ['section1', 'section2', 'section3'],
    afterLoad: function(anchorLink, index) {
        $(".navbar-nav li").removeClass("active");

        if (anchorLink === 'section1') {
        $(".navbar-nav li a[href='#section1']").parent().addClass("active");
        } 
        else if (anchorLink === 'section2') {
        $(".navbar-nav li a[href='#section2']").parent().addClass("active");
        } 
        else if (anchorLink === 'section3') {
        $(".navbar-nav li a[href='#section3']").parent().addClass("active");
        }
    }
    });
    $(".nav-link").click(function(e) {
    e.preventDefault();
    let target = $(this).attr("href").replace("#", "");
    $.fn.pagepiling.moveTo(target);
    });
});

$(".navbar-nav li").click(function () {
    addActiveToNavItem(this);
});

window.addEventListener("load",() => {
    setTimeout(function () {
        $(".loading").fadeOut(3000);
},3000)
})
// =======================================================================================================

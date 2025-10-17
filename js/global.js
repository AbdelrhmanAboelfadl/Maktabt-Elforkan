function addActiveToNavItem(that) {
    $(document).ready(function() {
    $(".navbar-nav li").removeClass("active").delay(500); 
    $(that).addClass("active");
    
});
};
function getData() {
    const reciters = document.querySelector("#reciters");
    const rewaya = document.querySelector("#system");
    const apiUrl = 'https://www.mp3quran.net/api/v3';
    const endPoint = 'reciters';
    const language = 'ar';
    rewaya.innerHTML = `<option value="" disabled selected hidden>اختر الرواية</option>`;
    async function getMoushaf(reciter) {
        const res = await fetch(`${apiUrl}/${endPoint}?language=${language}&reciter=${reciter}`);
        const data = await res.json();
        const mushaf = data.reciters[0].moshaf;
        mushaf.forEach((item) => {
            rewaya.innerHTML += `
            <option value="${item.id}">${item.name}</option>
            `
        })
        
    };
    async function getReciters() {
        const res = await fetch(`${apiUrl}/${endPoint}?language=${language}`);
        const data = await res.json();
        reciters.innerHTML = `<option value="" disabled selected hidden>اختر القارئ</option>`;
        data.reciters.forEach(item => {
            reciters.innerHTML += `
            <option value="${item.id}">${item.name}</option>
            `
        });
        reciters.addEventListener("change", (e) => {
            getMoushaf(e.target.value);
        });
    };
    getReciters();
    
}
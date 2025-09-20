const KEY = "C7YEDE0K7X5dbDWTpdkiZAjpbDPSyW7AiGdV2XwS";

async function getPhotoOfTheDay() {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${KEY}`);
    const data = await response.json();
    const imageElement = document.getElementById('apod-image');
    const titleElement = document.getElementById('apod-title');
    const dateElement = document.getElementById('apod-date');
    imageElement.src = data.url;
    titleElement.textContent = data.title;
    dateElement.textContent = data.date;
}

function clearBodyExceptNavbarFooter (){
    const body = document.body;

    const navbar = document.getElementById("navbar");
    const footer = document.getElementById("footer");

    body.innerHTML = '';

    body.appendChild(navbar);
    body.appendChild(footer);
}

async function showGallery(count = 7) {
    const gallery = document.createElement('div')
    gallery.id = 'gallery';
    gallery.style.display = "flex";
    gallery.style.flexWrap = "wrap";
    gallery.style.justifyContent = "center";
    gallery.style.margin = "20px";
    document.body.insertBefore(gallery, document.getElementById('footer'));
    
    for(i = 0; i < count; i++){
        const randomDate = new Date(
            2015 + Math.floor(Math.random() * 9),
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 20) + 1
        ).toISOString().split("T")[0];

        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${KEY}&date=${randomDate}`);
        const data = await response.json()

        const imgContainer = document.createElement('div');
        imgContainer.style.margin = '10px';
        imgContainer.style.textAlign = 'center';

        const img = document.createElement('img')
        img.src = data.url;
        img.alt = data.tittle;
        img.style.width = '300px'

        const tittle = document.createElement('p')
        tittle.textContent = data.tittle;
        tittle.style.fontWeight = 'bold';

        imgContainer.appendChild(img);
        imgContainer.appendChild(tittle);
        gallery.appendChild(imgContainer)
    }
}

function activateGallery(){
    clearBodyExceptNavbarFooter();
    showGallery();
}
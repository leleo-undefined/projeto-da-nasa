const KEY = "C7YEDE0K7X5dbDWTpdkiZAjpbDPSyW7AiGdV2XwS";


// js da página photo

async function getPhotoOfTheDay() {
    try{
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${KEY}`);
        const data = await response.json();
        const imageElement = document.getElementById('apod-image');
        const titleElement = document.getElementById('apod-title');
        const dateElement = document.getElementById('apod-date');
        imageElement.src = data.url;
        titleElement.textContent = data.title;
        dateElement.textContent = data.date;
    }
    catch (error){
        console.log(`Ops...${error}`);
    }
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
    try{
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
    catch(error){
        console.log(`Ops..${error}`)
    }
}

// js da página de marte

async function getPhotoOfMars() {
    try {
        const imageElement = document.getElementById('mars-image');
        const titleElement = document.getElementById('mars-title');
        const dateElement = document.getElementById('mars-date');

        let date = new Date();
        let photo = null;

        for (let i = 0; i < 7; i++) {
            const formattedDate = date.toISOString().split("T")[0];
            const resp = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formattedDate}&api_key=${KEY}`);
            const data = await resp.json();

            if (data.photos.length > 0) {
                photo = data.photos[0]; 
                break;
            }

            date.setDate(date.getDate() - 1); 
        }

        if (photo) {
            imageElement.src = photo.img_src;
            titleElement.textContent = `Taken by ${photo.camera.full_name} (${photo.rover.name})`;
            dateElement.textContent = `Earth date: ${photo.earth_date}`;
        } else {
            console.log('No photos available in the last 7 days.');
        }
    } catch (error) {
        console.log(`Ops... ${error}`);
    }
}


async function showMarsGallery(count = 7) {
    try {
        const gallery = document.createElement('div');
        gallery.id = 'gallery';
        gallery.style.display = "flex";
        gallery.style.flexWrap = "wrap";
        gallery.style.justifyContent = "center";
        gallery.style.margin = "20px";
        document.body.insertBefore(gallery, document.getElementById('footer'));

        for (let i = 0; i < count; i++) {
            let photo = null;
            let attempts = 0;

            while (!photo && attempts < 10) {
                const date = new Date();
                date.setDate(date.getDate() - Math.floor(Math.random() * 7));
                const formattedDate = date.toISOString().split("T")[0];

                const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formattedDate}&api_key=${KEY}`);
                const data = await response.json();

                if (data.photos.length > 0) {
                    photo = data.photos[Math.floor(Math.random() * data.photos.length)];
                }
                attempts++;
            }

            if (photo) {
                const imgContainer = document.createElement('div');
                imgContainer.style.margin = '10px';
                imgContainer.style.textAlign = 'center';

                const img = document.createElement('img');
                img.src = photo.img_src;
                img.alt = `${photo.camera.full_name} - ${photo.rover.name}`;
                img.style.width = '300px';

                const title = document.createElement('p');
                title.textContent = `${photo.camera.full_name} (${photo.rover.name}) - ${photo.earth_date}`;
                title.style.fontWeight = 'bold';

                imgContainer.appendChild(img);
                imgContainer.appendChild(title);
                gallery.appendChild(imgContainer);
            }
        }
    } catch (error) {
        console.log(`Ops..${error}`);
    }
}

// js da página meteors

async function showMeteors() {
    const today = new Date().toISOString().split("T")[0];
    try {
        const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${KEY}`);
        const data = await resp.json();

    const date = Object.keys(data.near_earth_objects)[0];
    const asteroids = data.near_earth_objects[date];

        for (let i = 0; i < 3; i++) {
        const asteroid = asteroids[i];
        const diameter = asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(0);
        const approach = asteroid.close_approach_data[0].close_approach_date;
        const velocity = parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(0);

        document.getElementById(`name${i+1}`).textContent = asteroid.name;
        document.getElementById(`diameter${i+1}`).textContent = `Diameter: ${diameter} m`;
        document.getElementById(`date${i+1}`).textContent = `Close Approach: ${approach}`;
        document.getElementById(`velocity${i+1}`).textContent = `Velocity: ${velocity} km/h`;
    }
    } catch (error) {
        console.log(`Ops... ${error}`)
    }
}




// funções de ativação de galeria

function activateGallery(){
    clearBodyExceptNavbarFooter();
    showGallery();
}

function activateMarsGalery(){
    clearBodyExceptNavbarFooter();
    showMarsGallery()
}


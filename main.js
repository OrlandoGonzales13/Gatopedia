
// //---------------------------axios
// const api = axios.create({
//     baseURL: 'https://api.thecatapi.com/v1',
// });

// api.defaults.headers.common['X-API-key'] = 'live_coUMi4qq4ze9zcuCVnNBP7Rx71uZJ2wXy1sOuseK2hHxSEY6kiJ1ImyNvRPiCat9';

// //----------------------------------


const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3';

const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';

const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';


const API_URL_FAVOTITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const spanError = document.getElementById('error')

async function loadRandomMichis() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const img3 = document.getElementById('img3');
        const btn3 = document.getElementById('btn3');

        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        btn1.onclick = () => saveFavouriteMichi(data[0].id)
        btn2.onclick = () => saveFavouriteMichi(data[1].id)
        btn3.onclick = () => saveFavouriteMichi(data[2].id)
    }
}

async function loadFavouriteMichis() {
    const res = await fetch(API_URL_FAVORITES,
        {
            method: 'GET',
            headers: {
                'X-API-KEY': 'live_coUMi4qq4ze9zcuCVnNBP7Rx71uZJ2wXy1sOuseK2hHxSEY6kiJ1ImyNvRPiCat9'
            },
        });
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        const section = document.getElementById('favoriteMichis')
        section.innerHTML = "";

        const h2 = document.createElement('h2');
        h2.classList.add('mb-4', 'text-center');
        h2.innerText = 'Michis favoritos';
        section.appendChild(h2);

        const row = document.createElement('div');
        row.classList.add('row', 'justify-content-center');

        data.forEach(michi => {
            const col = document.createElement('div');
            col.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-4');

            const article = document.createElement('article');
            article.classList.add('card', 'text-center', 'h-100');

            const img = document.createElement('img');
            img.src = michi.image.url;
            img.classList.add('card-img-top');
            img.style.height = '200px';
            img.style.objectFit = 'cover';

            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-danger', 'mt-2');
            btn.innerText = 'Eliminar Gato';
            btn.onclick = () => deleteFavouriteMichi(michi.id);

            article.appendChild(img);
            article.appendChild(btn);
            col.appendChild(article);
            row.appendChild(col);
        });

        section.appendChild(row);
    }
}

async function saveFavouriteMichi(id) {
    // const { data, status } = await api.post('/favourites', {
    //     image_id: id,
    // });

    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'live_coUMi4qq4ze9zcuCVnNBP7Rx71uZJ2wXy1sOuseK2hHxSEY6kiJ1ImyNvRPiCat9'
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        loadFavouriteMichis();
    }
}

async function deleteFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'live_coUMi4qq4ze9zcuCVnNBP7Rx71uZJ2wXy1sOuseK2hHxSEY6kiJ1ImyNvRPiCat9'
        },
    });
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        loadFavouriteMichis()
    }
}

async function uploadMichiPhoto() {
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form);

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',
            'X-API-KEY': 'live_coUMi4qq4ze9zcuCVnNBP7Rx71uZJ2wXy1sOuseK2hHxSEY6kiJ1ImyNvRPiCat9'
        },
        body: formData,
    })
    const data = await res.json();

    if (res.status !== 201) {
        spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
    }
    else {
        console.log("Foto de michi cargada :)");
        console.log({ data });
        console.log(data.url);
        saveFavouriteMichi(data.id)
    }
}

loadRandomMichis();
loadFavouriteMichis();
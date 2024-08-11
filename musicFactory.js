document.addEventListener('DOMContentLoaded', async (event) => {
    const url = 'https://spotify23.p.rapidapi.com/search/?q=haryanvi&type=multi&offset=0&limit=100&numberOfTopResults=50';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b25036622emsh59117c5d50e9e77p186ebajsn276bd221a1fe',
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        let content = "";
        result.tracks.items.map((element, index) => {
            let songTitle = element.data.albumOfTrack.name
            content += `
                <div class="card" onclick="playTrack('${element.data.id}')">
                    <img src="${element.data.albumOfTrack.coverArt.sources[0].url}" alt="Album Art">
                    <div class="card-body">
                        <p>${songTitle.length<12?songTitle:songTitle.slice(0,12)+"..."}</p>
                    </div>
                </div>
            `;
        });

        document.querySelector('.musicAlbum').innerHTML = content;
    } catch (error) {
        console.error(error);
    }
});

document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    let query = document.getElementById('query').value;
    let selectedOption = document.getElementById('options').value;

    const url = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=${selectedOption}&offset=0&limit=100&numberOfTopResults=50`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b25036622emsh59117c5d50e9e77p186ebajsn276bd221a1fe',
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        let content = "";
        result.tracks.items.map((element, index) => {
            content += `
                <div class="card" onclick="playTrack('${element.data.id}')">
                    <img src="${element.data.albumOfTrack.coverArt.sources[0].url}" alt="Album Art">
                    <div class="card-body">
                        <h6>${element.data.albumOfTrack.name}</h6>
                    </div>
                </div>
            `;
        });

        document.querySelector('.musicAlbum').innerHTML = content;
    } catch (error) {
        console.error(error);
    }
});

async function playTrack(songId) {
    const url = `https://spotify23.p.rapidapi.com/tracks/?ids=${songId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b25036622emsh59117c5d50e9e77p186ebajsn276bd221a1fe',
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.tracks && result.tracks.length > 0) {
            const previewUrl = result.tracks[0].preview_url;
            const img = result.tracks[0].album.images[0].url;

            if (previewUrl) {
                document.getElementById('player-image').src = img;
                document.getElementById('player').src = previewUrl;
                document.getElementById('player').play();
            } else {
                console.error('Preview URL not available.');
            }
        } else {
            console.error('Track not found.');
        }
    } catch (error) {
        console.error(error);
    }
}

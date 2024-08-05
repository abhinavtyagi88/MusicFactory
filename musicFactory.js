document.addEventListener('DOMContentLoaded', async (event) => {
            
	const url = 'https://spotify23.p.rapidapi.com/search/?q=haryanvi&type=multi&offset=0&limit=100&numberOfTopResults=50';
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '60559c5a31msh6988ab81089220cp1eb108jsn07f5201babb7',
			'x-rapidapi-host': 'spotify23.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);

		let content = "";
		result.tracks.items.map((element, index) => {
			const card = document.createElement("div");
			content += `
					<div class="card m-3"  onclick="playTrack('${element.data.id}')">
						<img id='card-img' src="${element.data.albumOfTrack.coverArt.sources[0].url}" class="card-img-top"  alt="...">
						<div class="card-body">
							<p class="card-text h6">${element.data.albumOfTrack.name}</p>
						</div>
					</div>
			`;
		});

		document.querySelector('.musicAlbum').innerHTML = content;

	} catch (error) {
		console.error(error);
	}
});

// search Functionality
document.addEventListener('submit', async (event) => {
	event.preventDefault();

	let query = document.getElementById('query').value;
	let selectedOption = document.getElementById('options').value;
	console.log("Query:",query,"\nselectedOption:",selectedOption);
	

	const url = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=${selectedOption}&offset=0&limit=100&numberOfTopResults=50`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '60559c5a31msh6988ab81089220cp1eb108jsn07f5201babb7',
			'x-rapidapi-host': 'spotify23.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);

		let content = "";
		result.tracks.items.map((element, index) => {
			const card = document.createElement("div");
			content += `
					<div class="card m-3"  onclick="playTrack('${element.data.id}')">
						<img src="${element.data.albumOfTrack.coverArt.sources[0].url}" class="card-img-top"  alt="...">
						<div class="card-body">
							<p class="card-text">${element.data.albumOfTrack.name}</p>
						</div>
					</div>
			`;
		});

		document.querySelector('.musicAlbum').innerHTML = content;

	} catch (error) {
		console.error(error);
	}
});


// function called on click
async function playTrack(songId) {
	console.log(songId);
	const url = `https://spotify23.p.rapidapi.com/tracks/?ids=${songId}`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '60559c5a31msh6988ab81089220cp1eb108jsn07f5201babb7',
			'x-rapidapi-host': 'spotify23.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options)
		const result = await response.json()
		console.log(result);
		if (result.tracks && result.tracks.length > 0) {
			const previewUrl = result.tracks[0].preview_url
			const img = result.tracks[0].album.images[0].url

			console.log(img);


			if (previewUrl) {
                let playerImg = document.getElementById('player-image')
				let player = document.getElementById('player')
				player.src = previewUrl
				playerImg.src = img 

				player.play()


			} else {
				console.error('Preview URL not available.')
			}
		} else {
			console.error('Track not found.')
		}
	} catch (error) {
		console.error(error);
	}
}
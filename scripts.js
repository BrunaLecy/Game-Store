const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd9dfa16811msh0e9d0e98b213792p1c5d02jsn16081abded03',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

function fetchApiData(){
	fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
	.then(response => response.json())
	.then(data => {
		
		const dados = document.querySelector('#fill_list');

		let data1="";
		data.map((values) => {
			data1+=` <div class="container">
				<h5 class="titulo">${values.title}</h5>
				<img src=${values.thumbnail} alt="img" class="imagem">
				<p class="descricao">Description: ${values.short_description}</p>
				<p class="jogoUrl">Game URL: ${values.game_url}</p>
				<p class="generoJogo">Genre: ${values.genre}</p>
				<p class="plataforma">Plataform: ${values.platform}</p>
				<p class="publicacao">Publisher: ${values.publisher}</p>
				<p class="desenvolvedor">Developer: ${values.developer}</p>
				<p class="dataLancamento">Release Date: ${values.release_date}</p>
				<p class="perfilUrl">Profile URL: ${values.freetogame_profile_url}</p>
			</div>`;
		});
		document.getElementById("container").innerHTML=data1;
	})
}

async function filtrar() {
	const genero = document.getElementById('selectGenero');
	if(genero.value === "") {
		console.log("genero obrigatório")

		let data1 =` <div class="mensagem">
			<p class="descricao">A seleção de genero é obrigatória</p>
		</div>`
		document.getElementById("mensagem").innerHTML=data1;
		return
	}
	var generoValue = genero.options[genero.selectedIndex].value;
	console.log(generoValue)

	const plataforma = document.getElementById('selectPlataforma');
	var plataformaValue = plataforma.options[plataforma.selectedIndex].value;
	console.log(plataformaValue)

	//fetch('https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=browser', options)
	var fetchString = plataformaValue === "" ? 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=' + generoValue + '&sort-by=release-date' :
		'https://free-to-play-games-database.p.rapidapi.com/api/games?platform=' + plataformaValue + '&category=' + generoValue + '&sort-by=release-date'

	fetch(fetchString, options)
	.then(response => response.json())
	.then(data => {
		let data1="";

		console.log(data)
		if(data.status_message) {
				data1+=` <div class="container">
				<p class="descricao">Result not found: ${data.status_message}</p>
			</div>`
		} else {
			const dados = document.querySelector('#fill_list');

			// console.log("antes")
			// console.log(data)
			data = randomValueOf(data);
			// console.log("depois")
			// console.log(data)

			// requisitosMemoriaMB = await getMemory(data.id)
			// console.log("Requisitos em MB: " + requisitosMemoriaMB)

			data1+=` <div class="container">
				<h5 class="titulo">${data.title}</h5>
				<img src=${data.thumbnail} alt="img" class="imagem">
				<p class="id">ID: ${data.id}</p>
				<p class="descricao">Description: ${data.short_description}</p>
				<p class="jogoUrl">Game URL: ${data.game_url}</p>
				<p class="generoJogo">Genre: ${data.genre}</p>
				<p class="plataforma">Plataform: ${data.platform}</p>
				<p class="publicacao">Publisher: ${data.publisher}</p>
				<p class="desenvolvedor">Developer: ${data.developer}</p>
				<p class="dataLancamento">Release Date: ${data.release_date}</p>
				<p class="perfilUrl">Profile URL: ${data.freetogame_profile_url}</p>
			</div>`;
		}
		
		document.getElementById("container").innerHTML=data1;

		data1 =`<div id="mensagem"></div>`;
		document.getElementById("mensagem").innerHTML=data1;
		
	}).catch(error => {
		console.log(error)
		throw(error);
	})
}

// async function getMemory(id) {
// 	fetch('https://free-to-play-games-database.p.rapidapi.com/api/game?id=' + id, options)
// 		.then(response => response.json())
// 		.then(data => {
// 			console.log(data.minimum_system_requirements.memory)
// 			var num = data.minimum_system_requirements.memory.replace(/[^0-9]/g,'');
// 			console.log(num)
	
// 			if(data.minimum_system_requirements.memory.includes('MB')) {
// 				// já está em MB
// 			} else if (data.minimum_system_requirements.memory.includes('GB')) {
// 				console.log("entrou")
// 				num = num * 1024
// 			}
			
// 			return num;
// 		})
// }

function randomValueOf( obj ) {
    var keys = Object.keys(obj);
    var len = keys.length;
    var rnd = Math.floor(Math.random()*len);
    var key = keys[rnd];
    return obj[key];
}
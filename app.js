const inputSearch = document.getElementById('input-search');
const divPicture = document.getElementById('picture');
const pictureBox = document.getElementById('picturebox')
const greenBoxUno = document.getElementById('greenBox1');
const onOffButton = document.getElementById('onOffButton');
const rightCross = document.getElementById('rightcross');
const leftCross = document.getElementById('leftcross');
const splash = document.getElementById('splash');
const btnSearch = document.getElementById('btn');
const errorMessage = document.getElementById('error-message');
const btnCancel = document.getElementById('btn-cancel');
const btnStop = document.getElementById('btn-stop');
const btnResume = document.getElementById('btn-resume');

// const glassIndicator = document.getElementById('buttonGlass');
const utterance = new SpeechSynthesisUtterance();
utterance.voice = window.speechSynthesis.getVoices()[5];
const arrayAlmacenamiento = [];
const arraySpeciesPokemon = [];
const typePokemonEn = [];
let count = 0;

const typePokemonEnPlusId = typePokemonEn.map(e=>{
    const container = {};
    container.id = count
    container.names = e.names
    count++
    return container
});


// let typeEs = '';
// let typeGeneraEs = '';
// let TypeDetailEs = '';
let posicionActual = 0;
let crossActiva = false;
let canSearch = false



// cargar primero el dom y despues ejecuta el async
document.addEventListener('DOMContentLoaded',()=>{
    almacenamientoPokemon('http://pokeapi.co/api/v2/pokemon?limit=150'); 
    onPokedex();
    nextPokemon();
    backPokemon();
})

// datoss de pokemons
const almacenamientoPokemon = async(url) =>{
    try {
        
        const res = await fetch(url);
        const data = await res.json();

        for (let i = 0; i < data.results.length; i++) {
            const res = await fetch(data.results[i].url);
            const pokemon = await res.json();
            arrayAlmacenamiento.push(pokemon)
            
        }
        
        for (let index = 0; index < arrayAlmacenamiento.length; index++) {
            const res = await fetch(arrayAlmacenamiento[index].types[0].type.url);
            const data = await res.json();
            typePokemonEn.push(data);
            
            
        }
      
        for (let i = 0; i < arrayAlmacenamiento.length; i++) {
            const res = await fetch(arrayAlmacenamiento[i].species.url);
            const species = await res.json();
            arraySpeciesPokemon.push(species);
        }


        return    
    } catch (error) {
        console.log(error)
    }
}


// para obtener el id. hice un map del array y le agregue el id pero tengo problemas para llamarlo despues de que se haga el push al primer array porque creo que pasa antes de que termine el fetch

const getIDPokemon = (pokemon)=>{
    const id = typePokemonEnPlusId.find(e=>e.id === pokemon.id)
    return id[0].names
}
console.log(typePokemonEnPlusId[0]);
// let typePokemonEnPlusId = []
// PRENDER POKEDEX
const onPokedex =()=>{
    onOffButton.addEventListener('click',()=>{
        divPicture.classList.toggle('onoff');
        onOffButton.classList.toggle('onoff');
        btnSearch.classList.toggle('onoff');
        splash.style.animation = "pokemon 3s ease";
        
       
        if(onOffButton.classList.contains('onoff')){
      
            // console.log(typePokemonEnPlusId[0]);
            setTimeout(()=>{
                printData(arrayAlmacenamiento[0]);
                // console.log(typePokemonEn);
                
                

                // NO BORRAR---------------------------------------------------------------
                speechName(generarTexto(arrayAlmacenamiento[0].name,getTypePokemonEs(typePokemonEn[0]),getTypeGenera(arraySpeciesPokemon[0]),getDetails(arraySpeciesPokemon[0])));
                search()
                // btnSearch.disabled = false;
            },3000)
        }
       else{
            crossActiva =false;
            pictureBox.innerHTML = '';
            greenBoxUno.textContent ='';
            posicionActual = 0
            splash.style.animation = "none";
            errorMessage.textContent = '';
            // btnSearch.disabled = true;
            
        }
})
}

//imprime la imagen en el cuadro 
const printData = (data)=>{
    pictureBox.innerHTML = `<img src=${data.sprites.other.dream_world.front_default} class="animada" alt="un pokemon">`;
    greenBoxUno.textContent = data.name.toUpperCase();
}
// NEXT POKEMON
const nextPokemon = ()=>{
    
    rightCross.addEventListener('click',()=>{
        if(onOffButton.classList.contains('onoff') && crossActiva){
            if((arrayAlmacenamiento.length-1) > posicionActual){
                printData(arrayAlmacenamiento[posicionActual+1]);
                speechName(generarTexto(arrayAlmacenamiento[posicionActual+1].name,getTypePokemonEs(typePokemonEn[posicionActual+1]),getTypeGenera(arraySpeciesPokemon[posicionActual+1]),getDetails(arraySpeciesPokemon[posicionActual+1])));
                posicionActual++;
            }
        } 
    })
}
// BACK POKEMON
const backPokemon = ()=>{
    leftCross.addEventListener('click',()=>{
        if(onOffButton.classList.contains('onoff') && crossActiva){
            if(posicionActual> 0){
                printData(arrayAlmacenamiento[posicionActual-1]);
                speechName(generarTexto(arrayAlmacenamiento[posicionActual-1].name,getTypePokemonEs(typePokemonEn[posicionActual-1]),getTypeGenera(arraySpeciesPokemon[posicionActual-1]),getDetails(arraySpeciesPokemon[posicionActual-1])));
                posicionActual--
            }
        }
        
    })
}

// BUSCADOR
const search = ()=>{
            btnSearch.addEventListener('click',()=>{
                
                pictureBox.innerHTML = `<img src="./assets/img/pokeball.png" alt="pokeball" class="pokeball" id="pokeball">`

                errorMessage.innerHTML = '';
                const textoIngresado = inputSearch.value.toLowerCase()
                // el metodo find devuelve el elemento encontrado o sino devuelve undefined
               const pokemonExists =  arrayAlmacenamiento.find(e=>e.name === textoIngresado)
               const pokemonExistArraySpecies = arraySpeciesPokemon.find(e=>e.name === textoIngresado)
               console.log(typePokemonEnPlusId);
                if(textoIngresado === ''){
                    pictureBox.innerHTML = `<img src="./assets/img/caraTriste.png"  alt="caraTriste" class="caraTriste" id="caraTriste">`
                    errorMessage.textContent = 'Ingresa el nombre de un pokémon';
                       
                }
                else if(pokemonExists !== undefined & textoIngresado !== ''){
   
                    setTimeout(()=>{
                        printData(pokemonExists)
                        speechName(generarTexto(pokemonExists.name,'sarasa',getTypeGenera(pokemonExistArraySpecies),getDetails(pokemonExistArraySpecies)))
                        },200,)
                        errorMessage.innerHTML = '';
                        inputSearch.value = '';
                    }
                else{
                    pictureBox.innerHTML = `<img src="./assets/img/caraTriste.png" alt="caraTriste" class="caraTriste" id="caraTriste">`
                    errorMessage.innerHTML = `El pokémon ${textoIngresado} no existe`   
                    }
                
                
            })
        }
        
    
   

//funcion para reproducir el nombre del pokemon por audio
function speechName(text){
    utterance.text = text ;
    utterance.rate = 5;
    crossActiva = false;
    btnSearch.disabled = true
    //esto es para que se pueda clickear el siguiente pokemon una vez que termine el audio y no antes
    utterance.addEventListener('end',()=>{
        crossActiva = true;
        btnSearch.disabled = false
    })
    const crossClicked = ()=>{
        if(speechSynthesis.paused){
            crossActiva=true;
            speechSynthesis.resume
            speechSynthesis.cancel()
        }
    }
    leftCross.addEventListener('click',()=>{
        crossClicked();
        backPokemon()
    })
    rightCross.addEventListener('click',()=>{
        crossClicked();
        nextPokemon()
    })
    
    speechSynthesis.speak(utterance);
    // cancelar por completo el speech
    const cancelSpeech = ()=>{
        speechSynthesis.resume()
        speechSynthesis.cancel()
    }
    btnCancel.addEventListener('click', cancelSpeech)

    if(speechSynthesis.speaking){
        onOffButton.addEventListener('click',cancelSpeech)
        
    }
    // else{
    //     crossActiva = true;
    //     btnSearch.disabled = false
    // }
    // stop speech
    const stopSpeech = ()=>{
       if(speechSynthesis.speaking) speechSynthesis.pause();
    }
    btnStop.addEventListener('click',stopSpeech);
    // // resume speech
    const resumeSpeech = ()=>{
        if(speechSynthesis.paused) speechSynthesis.resume()
    }
    btnResume.addEventListener('click',resumeSpeech)
}
// generar texto
const generarTexto = (name,type,genera,details) =>{
    const texto = `${name}. Pokémon tipo ${type}. Pertenece a la especie ${genera}. ${details}`
    return texto
}

// obteniendo el typo de pokemon en espaniol porque por defalt viene en ingles
const getTypePokemonEs = (type)=>{
    const typeSpanish = type.names.find(e => e.language.name === 'es');
    return typeSpanish.name
}
    // optener el genera del pokemon en espaniol porque por default viene en ingles
const getTypeGenera = (pokemon)=>{ 
    const typeSpanish = pokemon.genera.find(e=> e.language.name === 'es')
   
    return typeSpanish.genus
}
    
// obtener los details de solo los primeros 3 details que sean en espaniol.
const getDetails = (pokemon)=>{
    
    const typeSpanish = pokemon.flavor_text_entries.filter(e=> e.language.name === 'es')
    const typeSpanishNoSpaces = typeSpanish.map(e=>e.flavor_text.replace(/\n/g," "))
    return `${typeSpanishNoSpaces[0]} ${typeSpanishNoSpaces[1]} ${typeSpanishNoSpaces[2]}`
}
// console.log(arrayAlmacenamiento);


//funcion que devuelve la voz seleccionada 0 y 1:mujer español, 2:hombre español

// function getVoice(voiceIdx){
//     const voices = window.speechSynthesis.getVoices();
//     if(voiceIdx >= 0 && voiceIdx <voices.length)
//         return voices[voiceIdx];
//     else
//         return voices[0];

// }

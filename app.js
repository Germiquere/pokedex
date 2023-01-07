const inputSearch = document.getElementById('input-search');
const divPicture = document.getElementById('picture');
const pictureBox = document.getElementById('picturebox')
const greenBoxUno = document.getElementById('greenBox1');
const onOffButton = document.getElementById('onOffButton');
const rightCross = document.getElementById('rightcross');
const leftCross = document.getElementById('leftcross');
const splash = document.getElementById('splash');
const btnSearch = document.getElementById('btn');
const errorMessage = document.getElementById('error-message')
const btnCancel = document.getElementById('btn-cancel')

// const glassIndicator = document.getElementById('buttonGlass');
const utterance = new SpeechSynthesisUtterance();
utterance.voice = window.speechSynthesis.getVoices()[5];
const arrayAlmacenamiento = [];
const arraySpeciesPokemon = [];
let typeEs = '';
let typeGeneraEs = '';
let TypeDetailEs = '';
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
        
        for (let i = 0; i < arrayAlmacenamiento.length; i++) {
            const res = await fetch(arrayAlmacenamiento[i].species.url);
            const species = await res.json();
            arraySpeciesPokemon.push(species);
        }


        return    
    } catch (error) {
        console.log(error)
    }
    // finally{

    // }
}

// PRENDER POKEDEX
const onPokedex =()=>{
    onOffButton.addEventListener('click',()=>{
        divPicture.classList.toggle('onoff');
        onOffButton.classList.toggle('onoff');
        btnSearch.classList.toggle('onoff');
        splash.style.animation = "pokemon 3s ease";
        if(onOffButton.classList.contains('onoff')){
           console.log(getTypePokemon(arrayAlmacenamiento[0].types[0].type.url))

            setTimeout(()=>{
                printData(arrayAlmacenamiento[0]);
                getTypeGenera(arraySpeciesPokemon[0]);
                getDetails(arraySpeciesPokemon[0])
                speechName(generarTexto(arrayAlmacenamiento[0].name,typeEs,typeGeneraEs,TypeDetailEs));
                search()
                btnSearch.disabled = false;
            },3000)
        }
       else{
            crossActiva =false;
            pictureBox.innerHTML = '';
            greenBoxUno.textContent ='';
            posicionActual = 0
            splash.style.animation = "none";
            errorMessage.textContent = '';
            btnSearch.disabled = true;
            
        }
})
}

//imprime la imagen en el cuadro 
const printData = (data)=>{
    pictureBox.innerHTML = `<img src=${data.sprites.other.dream_world.front_default} alt="un pokemon">`;
    greenBoxUno.textContent = data.name.toUpperCase();
    // glassIndicator.style.background = '-webkit-radial-gradient(var(--green-miniButton-glass-color-dos), var(--green-miniButton-glass-color-uno))' ;
    crossActiva =true;
}
// NEXT POKEMON
const nextPokemon = ()=>{
    
    rightCross.addEventListener('click',()=>{
        // getTypePokemon(arrayAlmacenamiento[posicionActual+2].types[0].type.url);
        // console.log(getTypePokemon(arrayAlmacenamiento[posicionActual+1].types[0].type.url));
        if(onOffButton.classList.contains('onoff') && crossActiva){
            
            if((arrayAlmacenamiento.length-1) > posicionActual){
                // esto funciona pero no esta bien. Me esta trayendo la promesa un ciclo mas tarde y no se porque.
                getTypePokemon(arrayAlmacenamiento[posicionActual+2].types[0].type.url);
            getTypeGenera(arraySpeciesPokemon[posicionActual+1]);
            getDetails(arraySpeciesPokemon[posicionActual+1])
                // getTypePokemon(arrayAlmacenamiento[posicionActual+2].types[0].type.url);
                printData(arrayAlmacenamiento[posicionActual+1]);
                // console.log(getTypePokemon(arrayAlmacenamiento[posicionActual+1].types[0].type.url));
                speechName(generarTexto(arrayAlmacenamiento[posicionActual+1].name,typeEs,typeGeneraEs,TypeDetailEs));
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
                getTypePokemon(arrayAlmacenamiento[posicionActual-1].types[0].type.url);
                getTypeGenera(arraySpeciesPokemon[posicionActual-1]);
                getDetails(arraySpeciesPokemon[posicionActual-1])
                printData(arrayAlmacenamiento[posicionActual-1]);
                speechName(speechName(generarTexto(arrayAlmacenamiento[posicionActual-1].name,typeEs,typeGeneraEs,TypeDetailEs)));
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
                console.log(textoIngresado);
                // el metodo find devuelve el elemento encontrado o sino devuelve undefined
               const pokemonExists =  arrayAlmacenamiento.find(e=>e.name === textoIngresado)
               const pokemonExistArraySpecies = arraySpeciesPokemon.find(e=>e.name === textoIngresado)
              
               
                
                    if(textoIngresado === ''){
                        pictureBox.innerHTML = `<img src="./assets/img/caraTriste.png" alt="caraTriste" class="caraTriste" id="caraTriste">`
                        errorMessage.textContent = 'Ingresa el nombre de un pokémon';
                        console.log(errorMessage);
                        console.log('vacio');
                       
                    }
                    else if(pokemonExists !== undefined & textoIngresado !== ''){
                        console.log('dentro del else if');
                        getTypePokemon(pokemonExists.types[0].type.url);
                        console.log(pokemonExists.types[0].type.url);
                        getTypeGenera(pokemonExistArraySpecies);
                        console.log(pokemonExistArraySpecies);
                        
                        getDetails(pokemonExistArraySpecies)
                        console.log(pokemonExistArraySpecies);
                       
                        setTimeout(()=>{
                            printData(pokemonExists)
                           
                            speechName(generarTexto(pokemonExists.name,typeEs,typeGeneraEs,TypeDetailEs))
                            // typeEs = '';
                            // typeGeneraEs = '';
                            // typeMoveEs = '';
                            // TypeDetailEs = '';  
                        },200,)
                           
            
                        errorMessage.innerHTML = ''
                    }
                    else{
                        pictureBox.innerHTML = `<img src="./assets/img/caraTriste.png" alt="caraTriste" class="caraTriste" id="caraTriste">`
                        errorMessage.innerHTML = `El pokémon ${textoIngresado} no existe`
                        console.log('dentro del else');
                    }
                
                
            })
        }
        
    
   

//funcion para reproducir el nombre del pokemon por audio
function speechName(text){
    const cancelSpeech = ()=>{
        speechSynthesis.cancel()
    }
    btnCancel.addEventListener('click', cancelSpeech)
    utterance.text = text ;
    utterance.rate = 5;
    //esto es para que se pueda clickear el siguiente pokemon una vez que termine el audio
    utterance.addEventListener('end',()=>{
        crossActiva = true;
        btnSearch.disabled = false
    })
    crossActiva = false;
    btnSearch.disabled = true
    // btnSearch.setAttribute('disabled',true)
    // utterance.voice = getVoice(2);
    speechSynthesis.speak(utterance);
    // const iMSpeaking = speechSynthesis.speaking
    
}
// generar texto
const generarTexto = (name,type,genera,details) =>{
    const texto = `${name}. Pokémon tipo ${type}. Pertenece a la especie ${genera}. ${details}`
    return texto
}


    
// optener el tipo de pokemon en espaniol porque por default viene en ingles
const getTypePokemon = async(url) =>{
    try {
        const res = await fetch(url);
        const  data = await res.json()
        const typeSpanish = data.names.find(e=> e.language.name === 'es')
        typeEs = typeSpanish.name
    }catch (error) {
        console.log(error);
    }  
    }
    // optener el genera del pokemon en espaniol porque por default viene en ingles
const getTypeGenera = (pokemon)=>{ 
    const typeSpanish = pokemon.genera.find(e=> e.language.name === 'es')
   
    typeGeneraEs = typeSpanish.genus
}
    
// obtener los details de solo los primeros 3 details que sean en espaniol.
const getDetails = (pokemon)=>{
    
    const typeSpanish = pokemon.flavor_text_entries.filter(e=> e.language.name === 'es')
    const typeSpanishNoSpaces = typeSpanish.map(e=>e.flavor_text.replace(/\n/g," "))
    TypeDetailEs = `${typeSpanishNoSpaces[0]} ${typeSpanishNoSpaces[1]} ${typeSpanishNoSpaces[2]}`
    // console.log(`${typeSpanish[0].flavor_text} ${typeSpanish[1].flavor_text} ${typeSpanish[2].flavor_text}`);
}
//funcion que devuelve la voz seleccionada 0 y 1:mujer español, 2:hombre español
// function getVoice(voiceIdx){
//     const voices = window.speechSynthesis.getVoices();
//     if(voiceIdx >= 0 && voiceIdx <voices.length)
//         return voices[voiceIdx];
//     else
//         return voices[0];

// }

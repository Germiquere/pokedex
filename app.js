// const inputSearch = document.getElementById('input-search');
const divPicture = document.getElementById('picture');
const pictureBox = document.getElementById('picturebox')
const greenBoxUno = document.getElementById('greenBox1');
const onOffButton = document.getElementById('onOffButton');
const rightCross = document.getElementById('rightcross');
const leftCross = document.getElementById('leftcross');
const splash = document.getElementById('splash');
const glassIndicator = document.getElementById('buttonGlass');

const arrayAlmacenamiento = [];
let posicionActual = 0;
let crossActiva = false;

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
        onOffButton.classList.toggle('onoff')
        //se ejecuta el splash screen con el logo de pokemon
        splash.style.animation = "pokemon 3s ease";
        //si el boton de encendido esta en ON entonces muestra el primer pokemon y habilita el cross button
        if(onOffButton.classList.contains('onoff')){            
            setTimeout(printData,3000,arrayAlmacenamiento[0]);            
        }else{
            crossActiva =false;
            pictureBox.innerHTML = '';
            greenBoxUno.textContent ='';
            posicionActual = 0
            splash.style.animation = "none";
            
        }
    })
}

//imprime la imagen en el cuadro 
const printData = (data)=>{
    pictureBox.innerHTML = `<img src=${data.sprites.other.dream_world.front_default} alt="un pokemon">`;
    greenBoxUno.textContent = data.name.toUpperCase();
    
    glassIndicator.style.background = '-webkit-radial-gradient(var(--green-miniButton-glass-color-dos), var(--green-miniButton-glass-color-uno))' ;
    crossActiva =true;
}
// NEXT POKEMON
const nextPokemon = ()=>{
    rightCross.addEventListener('click',()=>{
        if(onOffButton.classList.contains('onoff') && crossActiva){
            if((arrayAlmacenamiento.length-1) > posicionActual){
                printData(arrayAlmacenamiento[posicionActual+1]);
                speechName(greenBoxUno.innerHTML);
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
                speechName(greenBoxUno.innerHTML);
                posicionActual--
            }
        }
        
    })
}

//funcion para reproducir el nombre del pokemon por audio
function speechName(name){
    const utterance = new SpeechSynthesisUtterance(name);
    utterance.rate = 1;
    //esto es para que se pueda clickear el siguiente pokemon una vez que termine el audio
    utterance.addEventListener('end',()=>{
        crossActiva = true;
    })
    crossActiva = false;
    utterance.voice = getVoice(2);
    speechSynthesis.speak(utterance);
    
}

//funcion que devuelve la voz seleccionada 0 y 1:mujer español, 2:hombre español
function getVoice(voiceIdx){
    const voices = window.speechSynthesis.getVoices();
    if(voiceIdx >= 0 && voiceIdx <voices.length)
        return voices[voiceIdx];
    else
        return voices[0];
}

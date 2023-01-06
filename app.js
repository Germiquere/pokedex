const inputSearch = document.getElementById('input-search');
const divPicture = document.getElementById('picture');
const pictureBox = document.getElementById('picturebox')
const greenBoxUno = document.getElementById('greenBox1');
const onOffButton = document.getElementById('onOffButton');
const rightCross = document.getElementById('rightcross');
const leftCross = document.getElementById('leftcross');
const splash = document.getElementById('splash');
const btnSearch = document.getElementById('yellowBox2');
const errorMessage = document.getElementById('error-message')
// cargar primero el dom y despues ejecuta el async
document.addEventListener('DOMContentLoaded',()=>{
    almacenamientoPokemon('http://pokeapi.co/api/v2/pokemon?limit=150'); 
    onPokedex();
    nextPokemon();
    backPokemon();
})

const arrayAlmacenamiento = []
let posicionActual= 0

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
        onOffButton.classList.toggle('onoff');
        btnSearch.classList.toggle('onoff');
        splash.style.animation = "pokemon 3s ease";
        if(onOffButton.classList.contains('onoff')){
            setTimeout(()=>{
                printData(arrayAlmacenamiento[0]);
                search()
            },3000)
        }else{
            
            pictureBox.innerHTML = '';
            greenBoxUno.textContent ='';
            posicionActual = 0
            splash.style.animation = "none";
            
        }
    })
}
const printData = (data)=>{
    pictureBox.innerHTML = `<img src=${data.sprites.other.dream_world.front_default} alt="un pokemon">`;
    greenBoxUno.textContent = data.name.toUpperCase();

}
// NEXT
const nextPokemon = ()=>{
    rightCross.addEventListener('click',()=>{
        if(onOffButton.classList.contains('onoff')){
            if((arrayAlmacenamiento.length-1) > posicionActual){
                printData(arrayAlmacenamiento[posicionActual+1]);
                posicionActual++
            }
        
       
        }
        
    })
}
// BACK
const backPokemon = ()=>{
    leftCross.addEventListener('click',()=>{
        if(onOffButton.classList.contains('onoff')){
            if(posicionActual> 0){
                printData(arrayAlmacenamiento[posicionActual-1]);
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
        if(textoIngresado === ''){
            pictureBox.innerHTML = `<img src="./assets/img/caraTriste.png" alt="caraTriste" class="caraTriste" id="caraTriste">`
            errorMessage.textContent = 'Ingresa el nombre de un pokémon';
            console.log(errorMessage);
            console.log('vacio');
        }
        else if(pokemonExists !== undefined & textoIngresado !== ''){
            console.log('dentro del else if');
            setTimeout(printData,200,pokemonExists);
            errorMessage.innerHTML = ''
        }
        else{
            pictureBox.innerHTML = `<img src="./assets/img/caraTriste.png" alt="caraTriste" class="caraTriste" id="caraTriste">`
            errorMessage.innerHTML = `El pokémon ${textoIngresado} no existe`
            console.log('dentro del else');
        }
    })
}

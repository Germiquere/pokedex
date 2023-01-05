// const inputSearch = document.getElementById('input-search');
const divPicture = document.getElementById('picture');
const pictureBox = document.getElementById('picturebox')
const greenBoxUno = document.getElementById('greenBox1');
const onOffButton = document.getElementById('onOffButton');
const rightCross = document.getElementById('rightcross');
const leftCross = document.getElementById('leftcross');
const splash = document.getElementById('splash')
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
// const reStartAnimation = (()=>{
//     splash.style.animation = "";
//  })
// PRENDER POKEDEX
const onPokedex =()=>{
    onOffButton.addEventListener('click',()=>{
        divPicture.classList.toggle('onoff');
        onOffButton.classList.toggle('onoff')
        // console.log(arrayAlmacenamiento[0]);
        // divPicture.innerHTML = `<img src="./assets/img/pokemon.png" alt="un pokemon" id="splash">`;
        splash.style.animation = "pokemon 3s ease";
        // splash.classList.toggle('splash')
        if(onOffButton.classList.contains('onoff')){

            // splash.classList.add('splash')
            setTimeout(printData,3000,arrayAlmacenamiento[0])
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
// console.log(arrayAlmacenamiento);
// const search = () =>{
 
//     divPicture.innerHTML = `
//     <section class="d-flex flex-column align-items-center justify-content-center d-none"  id="loading">
//                 <strong class="mb-2">Cargando</strong>
//                 <div class="spinner-border " role="status" aria-hidden="true"></div>
//             </section>`;
//     loadingDAta()
//     // img.classList.remove('display')
//     const textoIngresado = inputSearch.value.toLowerCase()
//     if(textoIngresado.length>0 ){

//         let elemento = []
//         arrayAlmacenamiento.forEach(p=>{
//             if(p.name.includes(textoIngresado)){
//                 elemento = p  
//             }
//     })

//     if(elemento.name === textoIngresado){
//       setTimeout(()=>{
//         loadingDAta()
//         printData(elemento)
//       },3000)
//     }
  
// }
    
// }
// const loadingDAta = ()=>{
//     const loading = document.getElementById('loading');
//     loading.classList.toggle('d-none');
// }

// inputSearch.addEventListener('keyup',search)

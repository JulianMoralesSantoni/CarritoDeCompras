//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
// Listeners
cargarEventListener();
function cargarEventListener(){

    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito =[];
        limpiarHTML(); //eliminamos todo el html
    } )
}
//Funciones

function agregarCurso(e){

    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        leerDatosdelCurso(curso);
    }

}

//elimina un curso del carrito

function eliminarCurso (e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //eliminamos el curso por su data-id
        articulosCarrito = articulosCarrito.filter( curso => {curso.id !== cursoId});
        carritoHTML();

    }


}

function leerDatosdelCurso(curso){
    //console.log(curso);
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //revisa si un elemento ya existe en el carrito
    
    if(articulosCarrito.some( curso => curso.id === infoCurso.id)){
        //actualiza la cantidad
        const cursos = articulosCarrito.map (curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else {
                return curso; //retorna objetos que no son duplicados
            }

        })
        articulosCarrito = [...cursos];
    }else{
        //agrega un nuevo curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }




    console.log(articulosCarrito);
    carritoHTML();

}

function carritoHTML (){
    articulosCarrito.forEach((curso)=>{
        
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>  
             <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad} </td>
        <td>
             <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
   `;

        contenedorCarrito.appendChild(row);
    })

}

function limpiarHTML(){
    contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
console.log('Hello, World!');

const carrito = document.querySelector('#carrito');

const listadoCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')

const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let carritoCompra= [];



registrarEventListeners();
function registrarEventListeners() {

    listadoCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCarrito);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carritoCompra = []; // resetear el arreglo;

        limpiarHTML();
    });
}


function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) { 
        const cursoSeleccion =  e.target.parentElement.parentElement;
       
        leerDatos(cursoSeleccion);
    }
}


//Eliminar cursos del carrito
function eliminarCarrito(e){

    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        
        carritoCompra = carritoCompra.filter( curso => curso.id !== cursoId );
        
        carritoHTML();        
    } 

}



// Leer los datos
function leerDatos(curso) {
    console.log(curso);


    const informacionCurso =  {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h5').textContent,
        precio: curso.querySelector('.precio').textContent,
        cantidad: 1         
    }
    
    const existeCarrito = carritoCompra.some( curso => curso.id === informacionCurso.id );
    if(existeCarrito) {

        const cursos = carritoCompra.map( curso => {
             if (curso.id === informacionCurso.id ) {
                curso.cantidad++;
                return curso;
             } else {
                return curso;
             }
            })
            carritoCompra = [...cursos];
    } else {
        carritoCompra = [...carritoCompra, informacionCurso];
    }


    // Agregar al carrito;

    carritoHTML();
}

function carritoHTML() {

    limpiarHTML();

    carritoCompra.forEach( curso => {

        const{ imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
          <img src="${imagen}" style="width: 100; height: 4rem; margin: 0.50rem;" alt="...">
        </td>
        <td>
          ${titulo}
        </td>
        <td>
          ${precio}
        </td>
        <td>
          ${cantidad}
        </td>
        <td>
          <a href='#' class='borrar-curso' data-id=${id} > X </a>
        </td>
        
    `
        ;
        contenedorCarrito.appendChild(row);
        console.log(carritoCompra);
    });
}



function limpiarHTML() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

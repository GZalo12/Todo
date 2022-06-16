import { todoList } from "..";
import { Todo } from "../classes";

// Referefencias a html
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
  const htmlTodo = `
  <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''} >
      <label> ${todo.tarea}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
  </li>`;

  // elemento contenedorde nuestra lista html
  const div = document.createElement('div');

  div.innerHTML = htmlTodo;

  // indicamos que solo queremos que nos inserte el primer hijo del div, osea la lista li, cuando se inspeccione el codigo ya no nos aparecera el div como principal sino su hijo li, asi solo ahi un retorno de que es li
  divTodoList.append(div.firstElementChild);

  return div.firstElementChild;
}

// Eventos

// keyup, indicamos que cuando la persona presione y suelte una tecla se dispare el evento

// algunas propiedades de los navegadores cam bian,y ciertos nombres varian en comienzo algunos funcionan con mayusculas y otros en minusculas, como ejemplo 'keyup', en otros navegadores comienza con mayusculaprimero 'Keyup
txtInput.addEventListener('keyup', (event) => {
  // validacion para que cuando se precione enter se dispare nuestra funcion y como segunda validacion, indicamos que lo que se mande a evaluar tiene que sr mayor a 0, esto para que en caso de que el usuario no mande nada se ignore la peticion
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    console.log(txtInput.value);
    // mandamos lo que se el user halla escrito en nuestro campo  de etxto a evaluar a nuesra funcion Todo
    const nuevoTodo = new Todo(txtInput.value);
    // impoortamos nuestro metodo todoList y manamos por referencias lo que optenemos del text donde escribio el usuario
    todoList.nuevoTodo(nuevoTodo);
    // console.log(todoList);
    
    // mandamos a llamar el metodo para poder realizar la insercion de los datos via html en una lista li
    crearTodoHtml(nuevoTodo);

    // indicamos que ua vez realizado la agregacion y insertado nuestro texto, nuestro value sea igual a algo vacio 
    txtInput.value= '';
  }
});


divTodoList.addEventListener('click', (event) =>{
  
  // target nos proporciona la etiqueta y sus propiedades a las cuales se les dio click  // localName nos proporciona solo su nombre principal de la etiqueta a la cual se le dio click
  // console.log(event.target.localName);
  const nombreElemento = event.target.localName;  //input, lable, button
  const todoElemento   = event.target.parentElement.parentElement;
  const todoId         = todoElemento.getAttribute('data-id');
      
  // realizamos una validacion para determinar sise hizo un clik en el elemento inputosea para marcar la tarea como completada
  if (nombreElemento.includes('input')) {
    // mandamos a llamar nuestra clase externa y mandamos los datos de nuestro elemento por el id, recordar que cuando se haga click en el check por defecto es falso pero cuando de hace click pasa a ser verdadero
    todoList.marcarCompletado(todoId);

    // elemento classList y agregando el elemento toggle, podemos crear o modificar alguna classe de algun elmento para agregar algun parametro
    todoElemento.classList.toggle('completed');

    // segunda validacion para determinar en dado el caso que el usuario precione la X se dispara la validacion y el llamado para eliminar el todo, como para eliminar el todo es un button preguntamos si es precionado
  }else if(nombreElemento.includes('button')){
    // eliminamos el todo de forma interna del array
    todoList.eliminarTodo(todoId);

    // eliminamso el todo de la vista html
    divTodoList.removeChild(todoElemento);
  }

  // console.log(todoList);
});

// Boton borrar todos los completados
btnBorrar.addEventListener('click',()=>{
  // mandamos a llamar nuestra clase eliminar completado, que nos retorna todos los que no esten completados, en esta parte del codigono tiene ningun efecto 
  todoList.eliminarCompletados();  

  // ciclo para realizar un abarrido de nuestro array de elementos, comenzamos de atras asia delante esto por en dado caso de no saber la totalidad de nuestro array, espesificamos la opcion de que ocupamos el hijo de nuestra etiqueta ul childrem y vamos en decremento hasta llegar al primero 
  for(let i = divTodoList.children.length -1; i >= 0; i--){
    const elemento = divTodoList.children[i];
    
    // preguntamos si nuestra etiqueta ya cuenta cin la clase completed para eliminar
    if(elemento.classList.contains('completed')){
      // eliminamos los hijos que contengan esa clase cmpleted
      divTodoList.removeChild(elemento);
    }
  }
});

ulFiltros.addEventListener('click', (event) => {
  const filtro = event.target.text;
  // preguntamos si la variable filtro contiene informacion que no sea falsa o undefine y si es verdadera se retorna el valor 
  if (!filtro) {return;}
  console.log(filtro);


  // barremos y eliminamos el remarcado cuando precionamos un button, eliminamos su clase selected, ya que solo esta remarcado el cuadro del bottun que es primero 
  anchorFiltros.forEach(elem => elem.classList.remove('selected'));
  // agregamos la clase selected al boton que sea precionado asi ya no estara solo fijo en uno si no que el que se precione se remarcara
  event.target.classList.add('selected');

  
  for(const elemento of divTodoList.children){
    elemento.classList.remove('hidden');  //elimiamos la clase hidden
    // preguntamos si nuestro elemento cuenta con la clase completed
    const completado = elemento.classList.contains('completed');

    // cuando se preciona Todos no entra en en switch y por logica miestras va el ciclo for cuando se preciona Todos se elimina la classe hidden de todos los elementos hasta quedar el array limpio y como estaba originalmente
    // la classe Hidden se utiliza para remover o cualtar elementos 



    switch (filtro) {
      case 'Pendientes':
            // validamos si completados esta agregado, de ser que si se les agrega la clase  
            if(completado){ 
              elemento.classList.add('hidden');
            }
      break;
      
      case 'Completados':
        // validacion si completados no esta agregado, a los elementos que no cuenten con completed se agrega la clase 
          if(!completado){ 
            elemento.classList.add('hidden');
          }
      break;
    
      default:
        break;
    }
  }
});

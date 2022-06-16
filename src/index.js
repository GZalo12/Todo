import './styles.css';
// importando la hoja de ruta 
import {Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);


console.log('todos', todoList.todos);




// const tarea = new Todo('Aprender javascript');

// todoList.nuevoTodo(tarea);

//  tarea.completado = true; 

// console.log(todoList);

// crearTodoHtml(tarea);



// implementando el manejo del localStorage, funciona de forma permanente para armacenar datos, aun que se cierre el navegador o la ventana queda guardada la informacion de forma permanente, esto depende de cada navegador
// setItem agrega un item que muestra como informacion cuando se entra a la informacion de la pagina de forma local
// localStorage.setItem('mi-key','ABC1ssss23');

// guarda informacion en forma de sesion, lo que significa que cuando se cierre el navegador se eliminan los datos
// sessionStorage.setItem('mi-key','ABC1ssss23');

// ejecutamos el removimiento de nuestro item creado anteriormente despues de unas milesimas se degundos como se muestra a continuacion 
// setTimeout(()=>{
//   localStorage.removeItem('mi-key');
// }, 5500 );
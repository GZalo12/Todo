import { Todo } from "./todo.class";


export class TodoList{
  constructor(){
    // array donde se iran almacenando nuestros metodos que vallamos creando 
    // this.todos = [];
    this.cargarLocalStorage();
  }
  
  nuevoTodo(todo){
    this.todos.push(todo);

    this.guardarLocalStorage();
  }

  eliminarTodo(id){
    // aplicamos una funcion filter, preguntamos si el id es diferente a nuestro id que tenemos almacenado en nuestro array, cuando exista una coincidencia nos va a retornar una array nuesvo excluyendo la coincidencia que hallamos tenido, por que el array nuevo reemplazara a nuestro viejo array 
    this.todos =  this.todos.filter(todo => todo.id != id)

    this.guardarLocalStorage();
  }

  marcarCompletado(id){
    // realizamos un recorrido por todo nuestro array hasta encontrar el valor igualitorio para marcarlo como completado y aplicar su propiedades 
    for (const todo of this.todos) {
      // console.log(id, todo.id);
      // se utiliza doble == por que puede que los datos lleguen en estring y otros en nueros, y lo que se realiza es que sean compatibles, si se utilizara === tendrian que ser un dato exacto en propiedades
      if (todo.id == id) {
        // negamos los datos, para que cuando mendemos a llama4r la funcion que viene por defecto falso, pasa a ser verdadero
        todo.completado = !todo.completado;

        this.guardarLocalStorage(); 
        break;
      }
    }
  }

  eliminarCompletados(){
    // filtramos para optener todos los elementos que no esten completados
    this.todos = this.todos.filter(todo => !todo.completado);

    this.guardarLocalStorage();
  };

  guardarLocalStorage(){
    // tenemos que comvertir nuestro array de todos a texto legible ya que si se manda directo el navegador lo representa como un objeto que no es legible
    // tenemos que tranformar nuestro array a JSON para que nuestro navegador lopueda leer
    localStorage.setItem('todo', JSON.stringify( this.todos));
  };

  // cargamos los datos cada vea que se actualice o cierre la pagina se guardan en un array de la memoria local
  cargarLocalStorage(){
    // getitems retorna el item si es que existe ya ingresado en el localStorage
    // validamos que exista informacion en el localStorage mediante el getitems
    // if(localStorage.getItem('todo')){
      // nos arroja elementos en string por que los datos fueron pasados para convertirlos en archivo JSON tenemos que volverlos a pasar a su estado original, revertir lo que se le hizo 
      // this.todos = JSON.parse( localStorage.getItem('todo') );
      // console.log('cargar:', this.todos);
      // console.log(typeof this.todos);
    // }else{  // en caso de no existir informacion
    //   this.todos = [];
    // }


    //codigo simplificado operador ternario
    this.todos = (localStorage.getItem('todo')) 
                  ? this.todos = JSON.parse( localStorage.getItem('todo')) 
                  : [];

    // mapeamos nuestra clase y nuestra propiedad static, para realizar la devoluvion de un nuevo array que es el ya mapeado  toda la inrformacion que nos devolvera sera todo lo que tengamos ingresado en el storage ya sea todos completados, eliinaddos 
    this.todos = this.todos.map(Todo.fromJson);
    
  };

}
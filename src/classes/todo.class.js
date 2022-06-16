export class Todo{
  
  // se utiliza 1a destruccturacion de array para obtener los datos que deseamos 
  static fromJson({id, tarea, completado, creado}){
    const tempTodo = new Todo(tarea); //llamamos a nuestra clase padre

    // obtenemos la informacion que tenemos en el constructor mediante la llamada anterior y guardamos la informacion de los datos es las nuevas instancias creadas 
    tempTodo.id         = id;
    tempTodo.completado = completado;
    tempTodo.creado     = creado; 

    return tempTodo;
  }

  constructor(tarea){
    this.tarea = tarea;

    this.id =  new Date().getTime();  //getTime numero en milisegundo de los datos de la fecha 
    this.completado = false;
    this.creado = new Date();
  }

  imprimirClase(){
    console.log(`${this.tarea} - ${this.id}`);
  }
}
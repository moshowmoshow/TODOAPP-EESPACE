import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ITodo } from '../interfaces/itodo';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {
 //  private _dataSource: Array<ITodo> = [];

  constructor() {
    console.log('Hello TodoProvider Provider');
  }

  add(todo: ITodo) {
    //  this._dataSource.push(todo);

    // get our processed todo from localstorage
    let data = this._getTODO();
    data.push(todo);

    // save it back to our localstorage
    this._setTodo(data);
    // console.log("Our List", this._dataSource);
  }

  delete(todo: ITodo) {
    //this._dataSource.splice(this._dataSource.findIndex(searchedTodo => searchedTodo === todo), 1);

    //get data from local storage and delete

    let data = this._getTODO();
  
   // console.log(data.findIndex(searchedTodo => searchedTodo.date === todo.date));
     data.splice(data.findIndex(searchedTodo => searchedTodo.date === todo.date), 1);
     
     //put data back into local storage

    this._setTodo(data);

  }

  list(completed: boolean = false): Array<ITodo> {
    let data = this._getTODO();
    return data.filter((todo: ITodo) => todo.completed === completed);
  }

  update(todo: ITodo) {
    
    let data = this._getTODO();
    let index = data.findIndex(saved => saved.date === todo.date);
    console.log(index);
    data[index] = todo;
    //set back to local storage
    this._setTodo(data);
  }

  /**
   * get our todo from localstorage and process the string formatted value 
   * to Javascript Object
   */
  private _getTODO(): Array<ITodo> {
    return JSON.parse(window.localStorage.getItem('todos')) || [];
  }

  /**
   * this is used to save/ update our content of our window localstorage for key `todos`
   * @param todos 
   */
  private _setTodo(todos: Array<ITodo>): void {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }

}

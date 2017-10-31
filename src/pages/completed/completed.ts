import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ITodo } from '../../interfaces/itodo';
import { TodoProvider } from '../../providers/todo';

/**
 * Generated class for the CompletedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html',
})
export class CompletedPage {
  todos: ITodo[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _viewCtrl: ViewController, private _todoProvider: TodoProvider) {
    this.todos = this._todoProvider.list(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
  }

  close() {
    this._viewCtrl.dismiss();
  }

  notCompleted(todo: ITodo) {
    todo.completed = false;
    this._todoProvider.update(todo);
    // update our list
    this.todos = this._todoProvider.list(true);
  }
}

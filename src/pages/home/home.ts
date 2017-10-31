import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { CompletedPage } from '../completed/completed';
import { TodoProvider } from '../../providers/todo';
import { ITodo } from '../../interfaces/itodo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: ITodo[] = []; // to hold all our todo from provider

  constructor(public navCtrl: NavController, private _alertCtrl: AlertController,
    private _modalCtrl: ModalController, private _todoProvider: TodoProvider) {
    this.todos = this._todoProvider.list();
  }

  /**
   * This is to show alert prompt to enter new task
   */
  addNew() {
    let prompt = this._alertCtrl.create({
      title: 'New Task',
      //  message: "Enter your new task",
      inputs: [
        {
          name: 'task',
          placeholder: 'Enter your new task'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            this.saveTask(data.task);
          }
        }
      ]
    });
    prompt.present();
  }



  /**
   * this is used to save new task to our task list
   * @param title 
   */

  private deleteTodo(todo) {
    console.log(todo);
    this._todoProvider.delete(todo);

    // update our list
    this.todos = this._todoProvider.list();
    
        console.log("done with refresh");
  }
  private saveTask(title: string) {
    console.log("You just added ", title);
    this._todoProvider.add({
      title: title,
      date: new Date(),
      completed: false
    });

    // update our list
    this.todos = this._todoProvider.list();

    console.log("done with refresh");

  }

  showCompletedTasks() {
    let modal = this._modalCtrl.create(CompletedPage);
    modal.present();

    modal.onWillDismiss(data => {
      // update our list
      this.todos = this._todoProvider.list();
    });

  }

  markAsCompleted(todo: ITodo) {
    console.log("Todo is changed", todo);
    this._todoProvider.update(todo);
    // update our list
    this.todos = this._todoProvider.list();
  }

}

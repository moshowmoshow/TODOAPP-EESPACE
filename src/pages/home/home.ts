import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private _alertCtrl: AlertController) {

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
  private saveTask(title: string) {
    console.log("You just added ", title);
  }

}

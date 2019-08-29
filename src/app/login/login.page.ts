import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email
  password

  constructor(public quizService:QuizService, public alertController: AlertController) { }

  ngOnInit() {
  }

  login(){
    this.quizService.logIn(this.email,this.password)
  }

  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'enter email'
        }],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              
              
            }
          }, {
            text: 'Ok',
            handler: (email) => {
              this.quizService.resetPassword(email.email)
              console.log(email);
            }
          }
        ]
      });
  
      await alert.present();
    }

}

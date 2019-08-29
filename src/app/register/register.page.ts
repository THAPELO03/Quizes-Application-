import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name;
  password;
  email;
  age;
  gender;
  confirmPassword;
  //registerForm:FormGroup;

  constructor( public quizService:QuizService,
                      //public formBuilder:FormBuilder,
                      private router: Router,
                      public alertController: AlertController,
                      public toastController: ToastController,
                       ){}
                       //{
                       
                       // this.registerForm = formBuilder.group({
                        //  name:["",[Validators.required,Validators.pattern("[a-zA-Z]+$")]],
                       //   email:["",[Validators.required,Validators.pattern("[a-zA-Z0-9.]+@[a-zA-Z0-9-.]+\.[a-z]+$")]],
                       ///   password:["",[Validators.required]],
                        //  gender:["",[Validators.required]],
                        //  age:["",[Validators.required]],
                          
                       // });
                     // }

  ngOnInit() {
  }
  register(){
    console.log(this.email)

    this.quizService.signUp(this.gender,this.age,this.email,this.name,this.password).then((user) =>{
      if(user.operationType =="signIn"){
        this.router.navigate(['/login'])
        this.presentToast();
      } else{
        this.presentAlert(user);
      }
      
    });
  }
   async presentAlert(user){
     const alert = await this.alertController.create({
       header:'Warning',
       message:user,
       buttons:['OK']
     });
     await alert.present();
   }
   async presentToast(){
     const toast= await this.toastController.create({
       message:'Your information has been saved',
       duration:6000,
       color:'primary',
       position:'top'
     });
     toast.present();
   }

  setGender(event){
    this.gender=event.detail.value;
  }

  
}
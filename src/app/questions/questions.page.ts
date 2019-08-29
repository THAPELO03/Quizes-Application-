import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  Questionz=[];
  id;
  Questions;
  ID;
  Answers=[];
  Quiz_ID;
  Answ;
  UserID;
  Option;
  Cat =[];
  UID;
  UnikID;
  correctAnswer=[];

  constructor( public quizService:QuizService, public router:ActivatedRoute,public loadingCtrl:LoadingController) {
    this.id=this.quizService.Return_ID();
    this.Questionz=this.quizService.DatabaseQuiz(this.id);
    this.UID=this.quizService.currentUser();
    this.UnikID=this.quizService.generateID();

    console.log(this.Questionz);
    console.log(this.id);
  }

  //getQuestions(){
   // this.quizService.getQuestions();
  //}
  ngOnInit() {

 //}
 //getScores(event,Questionz){
   //this.Answers=event.detail.value;
   
 }
 setData(event,quiz){
   this.Answ=event.detail.value;
   this.Questions=quiz.Questions;

   let index;
   let newIndex;
   let madeIndex;
   let check=false;
  if(this.Answers.length==0){
    this.Answers.push({
      Questions:this.Questions,
      Answer:this.Answ,
      correctAnswer:"",
      Score:false
    })
    for(var x=0;x < this.Questionz.length;x++){
      for(var y=0;y < this.Questionz[x].value.length;y++){
          if(this.Questionz[x].value[y]==true){
            index= this.Questionz[x].value.indexOf(this.Questionz[x].value[y])
            newIndex= this.Questionz[x].Answer[index];
            this.correctAnswer.push(newIndex);
          }
      }
    }
    this.Answers[0].correctAnswer= this.correctAnswer[this.Answers[0].Questions.indexOf(this.Questions)]
    for(var z=0; z <this.Answers.length;z++){
      if(this.Answers[z].Answer=== this.Answers[z].correctAnswer){
        this.Answers[z].Score=true;
      }else{

      }
    }
    console.log(this.Answers)
  }else{
    let exist=false;
    
    for(var i=0;i < this.Answers.length;i++){
      if(this.Answers[i].Questions== this.Questions){
        this.Answers[i].Answer=this.Answ;
        exist =true;
      }else{

      }
      if(this.Answers[i].Answer===this.Answers[i].correctAnswer){
        this.Answers[i].Score=true;
      }else{
      }
    }
    let findIndex= this.Questionz.find(x=> x.Questions === this.Questions);
    let myIndex= this.Questionz.indexOf(findIndex);
    if(exist==false){
      this.Answers.push({
        Questions:this.Questions,
        Answer:this.Answ,
        correctAnswer:this.correctAnswer[myIndex],
        Score:false
      })
      for(var a= 1;a < this.Answers.length;a++){
        if(this.Answers[a].Answer===this.Answers[a].correctAnswer){
          this.Answers[a].Score=true;
        }
      }
    }
    console.log(this.Answers);
  }
 }

 submit(){
  this.UnikID=this.quizService.generateID();
  this.quizService.submitData(this.Answers,this.UID,this.id,this.UnikID);
 }

}

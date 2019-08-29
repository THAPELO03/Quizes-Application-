import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  myCategories;
  Category;
  id

  catName;
  categoryKey;
  
  constructor( public quizService:QuizService) { 
    this.Category= this.quizService.getCat();
    
    }
   
    setID(list) {
      this.quizService.getID(list)
    }  
  ngOnInit() {
  }

   //getData(){
     // return this.Cat;
    //}

    //getMacat(id){
    //  this.quizService.playQuiz(id);
    //}
}

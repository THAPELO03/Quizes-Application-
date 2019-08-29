import { Injectable } from '@angular/core';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class QuizService {
// Get a reference to the database service
   database = firebase.database();
   UserId
   userEmail
   cat_Data
   cat_name
   name
   Questionz=[];
   Questions;
   Option;
   ID;
   id;
   Answer;
   

  constructor() { }
  private Cat=[];

  logIn(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }).then((categories) =>{
  
      console.log("user is logged in")
    });
  }

 submitData(Answers,UID,ID,UnikID){
   var test_ID;
   for(var b =0; b<Answers.length;b++){
     firebase.database().ref('Results/' + UID+"/" + ID +"/" + UnikID +"/" + Answers[b].Questions).set({
       Answer:Answers[b].Answer,
       correctAnswer:Answers[b].correctAnswer,
       Score:Answers[b].Score
     });
   }
   }
  

  signUp(gender,age,email,name,password){
    return firebase.auth().createUserWithEmailAndPassword(email,password,).then((user) => {
      //// Handle Errors here.///
      //var errorCode = error.code;
      //var errorMessage = error.message;
      //return errorMessage
      this.UserId=user['user'].uid;
      this.userEmail= user['user'].email;

      firebase.database().ref('user/' + this.UserId).set({
        Name : name,
        email : this.userEmail,
        age : age,
        gender: gender,

    }),(error) =>{
      if(error){
        }else{
        }
        };
    return user;
    }).catch((error) =>{
      //--handle errors here--//
      var errorCode=error.code;
      var errorMessage=error.message;
      return errorMessage
    })

    }
    
  
//data for category database
  myCategory=[];

  getCat(){
    var data =firebase.database().ref().child('Categories/');
    data.on('child_added',snap =>{
    this.name= snap.child('catName').val();
    console.log(this.name);
    this.id=snap.child('ID').val();
    console.log(this.id);
    
    this.myCategory.push({
      ID:this.id,
      categories:this.name,
    });
    console.log(this.myCategory);
    });
    return this.myCategory;
  }
  
  Return_ID() {
    return this.UserId;
  }
  getID(list) {
    this.UserId = list.ID;
  }
  

  //Questions.ts code

  DatabaseQuiz(ID){
    var rootRef= firebase.database().ref().child('Questions/' +ID);
    rootRef.once('value',(snapshot)=> {
      const value = snapshot.val();

      for(const key in value){
        this.Questionz.push({
          Questions:key,
          Answer:Object.keys(value[key]),
          value:Object.values(value[key])
        });
        console.log(this.Questionz);
        console.log(key);
        console.log(value);
      }
    });
    return this.Questionz;
  }
  resetPassword(email){
    var auth = firebase.auth();
    
      auth.sendPasswordResetEmail(email).then(() => {
      }).catch((error) => {
      });
    }

    currentUser(){
      var user =firebase.auth().currentUser;
      var name,email,uid,emailVerified;

      if(user !=null){
        name=user.displayName;
        email=user.email;
        uid=user.uid;
      }
      return uid;
    }
    generateID(){
      let unik_id=firebase.database().ref().child('Results').push().key;

      return unik_id;
    }
}

  /////////////////////////////////////////////////////////////////////////////////////////
  //getMacat(){
    //var Cat =firebase.database().ref().child('Categories')
   // Cat.on("child_added",snap =>{
     // this.cat_name= snap.child("catName").val();
     // this.id= snap.child("ID").val();
     // this.Cat.push({
      //  catName:this.cat_name,
       // ID:this.id
      //})
    //})
  //}
  //playQuiz(id){
    //this.ID =id
  //}
  //getQuestions(){
    
    //const rootRef = firebase.database().ref().child('Questions/' + this.ID)
    //rootRef.once('value',(snapshot) => {
      //const value = snapshot.val();

      //for (const key in value){
       // this.Questionz.push({
         // key: key,
         // Option: Object.keys(value[key])
        //});
         // console.log(this.Questionz)
         // console.log(key);
          //console.log(value)
          //this.Option = Object.keys(value[key]);

      //}
    //});
  //}
  

  //logOut(){
    //firebase.auth().signOut().catch((error) => {
      // handlin erres.
     // var errorCode=error.code;
      //var errorCode= error.message
  
  
    //}).then((result) => {
      // An error happened.
    //});
  //}
   
     
      
     // getQues(){
       // return this.Questionz;
     // }
     // GetgetMacat(){
      ///  return this.Cat
      //}
//////////////////////////////////////////////////////////////////////////////////////////


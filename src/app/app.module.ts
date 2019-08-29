import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase'
import { Camera} from '@ionic-native/camera/ngx';



 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyCF9f4hTZTV0iDT3ZbU1Wv9k_XpufrldYU",
  authDomain: "quizapp-708a5.firebaseapp.com",
  databaseURL: "https://quizapp-708a5.firebaseio.com",
  projectId: "quizapp-708a5",
  storageBucket: "",
  messagingSenderId: "451848680053",
  appId: "1:451848680053:web:2ef8d70df77fda3e",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ],

  providers: [
    StatusBar,
    Camera,

    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

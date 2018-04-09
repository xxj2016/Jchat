import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  backgrounds = [
    'assets/imgs/background/background-1.jpg',
    'assets/imgs/background/background-2.jpg',
    'assets/imgs/background/background-3.jpg',
    'assets/imgs/background/background-4.jpg'
  ];
  email: string;
  password: string;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }


  openForgotPassword() {
    console.log('Forgot password clicked');
  }


  openRegister() {
    console.log('Register clicked');
    this.navCtrl.push(RegisterPage);
  }

  showAlert(title: string, message: string) {
     let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
  }

  doLogin() {
    if (this.email == 'a@a.com' && this.password == 'admin123') {
      console.log('user data', this.email, this.password);
      this.showAlert('Successful', 'You are logged in!');
    } else {
      console.log('user data', this.email, this.password);
      this.showAlert('Failed', 'You are not logged in!');
    }
  }

}

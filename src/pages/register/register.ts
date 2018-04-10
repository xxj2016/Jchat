import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  backgrounds = [
    'assets/imgs/background/background-1.jpg',
    'assets/imgs/background/background-2.jpg',
    'assets/imgs/background/background-3.jpg',
    'assets/imgs/background/background-4.jpg'
  ];
  userName: string;
  password: string;
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  openLogin() {
    this.navCtrl.push(HomePage);
  }

  showAlert(title: string, message: string) {
     let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
  }

  doRegister() {
    this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(this.userName + '@domain.xta', this.password)
    .then((data) => {
      console.log('got Data ', data);
      this.showAlert('Successful', 'You are registered!');
      this.userName = '';
      this.password = '';
    })
    .catch( error => {
      console.log('got Error ', error);
      this.showAlert('Failed', error.message);
      
    });
    // if (this.email == 'a@a.com' && this.password == 'admin123') {
    //   console.log('user data', this.email, this.password);
    //   this.showAlert('Successful', 'You are register in!');
    // } else {
    //   console.log('user data', this.email, this.password);
    //   this.showAlert('Failed', 'You are not registered in!');
    // }
  }

}

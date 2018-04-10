import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the LoggedinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {

  email: string;
  username: string;
  message: string;
  s;
  messages: Observable<any[]>;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.email = this.afAuth.auth.currentUser.email;
    this.username = this.afAuth.auth.currentUser.email;
    this.messages = this.db.list('/chat').valueChanges();
  }

  sendMessage() {
    this.db.list('/chat').push({
      username: this.username,
      message: this.message
    }).then( () => {
      this.message = '';
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggedinPage');
  }

}

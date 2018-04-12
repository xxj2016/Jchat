import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController NavParams, Content } from 'ionic-angular';
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
  @ViewChild(Content) content: Content;

  email: string;
  username: string;
  message: string;
  _chatSubscription;
  obser: Observable<any[]>;
  messages: Array<any[]> = [];
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.email = this.afAuth.auth.currentUser.email;
    this.username = this.afAuth.auth.currentUser.email;
    this.obser = this.db.list('/chat').valueChanges();
    this._chatSubscription = this.obser.subscribe( (data)=> {
      this.scrollToBottom();
      this.messages =  data;
      console.log(this.messages);
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom()) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '提示?',
      message: '确定清除所有聊天数据?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('已经取消清除');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.clearMessage();
          }
        }
      ]
    });
    confirm.present();
    }

  sendMessage() {
    this.db.list('/chat').push({
      username: this.username,
      message: this.message
    }).then( () => {
      this.message = '';
    });
  }

  clearMessage() {
    if (this.messages.length > 0) {
      this.db.list('/chat').remove()
      .then( _ => this.showAlert('提示', '清除数据成功！'))
      .catch(err => this.showAlert('失败', err))
    } else {
      this.showAlert('提示', '别逗我了，当前没有数据可以清除')
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoggedinPage');
    this.db.list('chat').push({
      specialMessage: true,
      message: `${this.username} has joined the room`
    })
  }

  ionViewWillLeave(){
    this._chatSubscription.unsubscribe();
    this.db.list('/chat').push({
      specialMessage: true,
      message: `${this.username} has left the room`
    })
  }
}

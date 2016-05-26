import {Injectable} from '@angular/core';
import {FirebaseService} from './firebase.service'


declare var firebase: any;

@Injectable()
export class AuthService {

    auth: any;
    user: Promise<any>;

    constructor(private firebaseService: FirebaseService) {
        this.auth = this.firebaseService.firebase.auth;
        this.init();
    }

    init(){
        this.user = new Promise((resolve, reject) => {
            this.auth().onAuthStateChanged((user) => {
                resolve(user);
            });
        })
    }

    isLoggedIn(): Promise<boolean>{
        return this.user
            .then((user) => {
                return (user);
            })
    }

    login(provider: string): Promise<boolean> {

        var _provider;

        switch (provider){
            case 'twitter':
                _provider = new this.auth.TwitterAuthProvider();
                break;
        }


        return this.auth().signInWithPopup(_provider)
            .then(() => {
                this.init();
                return this.isLoggedIn();
            })
            .catch((error) => {
                return false;
            });
    }

    logout(): Promise<any>{
        return this.auth().signOut().then(() => {
            this.init();
        });
    }

}

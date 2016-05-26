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
            this.firebaseService.firebase.auth().onAuthStateChanged((user) => {
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

        var _provider = new this.auth.TwitterAuthProvider();

        return this.auth().signInWithPopup(_provider)
            .then((result) => {
                // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                // You can use these server side with your app's credentials to access the Twitter API.
                var token = result.credential.accessToken;
                var secret = result.credential.secret;
                // The signed-in user info.
                this.user = result.user;
                console.log(result);

                return this.isLoggedIn();
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                return false;
            });
    }

    logout(): Promise<any>{
        return this.auth().signOut().then(() => {
            this.init();
        });
    }

}

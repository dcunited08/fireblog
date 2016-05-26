import {Injectable} from '@angular/core';
import {environment} from './environment'

declare var firebase: any;

@Injectable()
export class FirebaseService {

    firebase: any;

    constructor() {
        firebase.initializeApp(environment.firebase_config);
        this.firebase = firebase;
    }

}

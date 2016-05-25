import {Injectable} from '@angular/core';
import {Blogpost} from "./blogpost.type";
import {environment} from './environment';

import * as _ from 'lodash';

// import {firebase} from 'firebase';

declare var firebase: any;

@Injectable()
export class BlogpostsService {

    database: any;

    constructor() {
        // Initialize Firebase
        firebase.initializeApp(environment.firebase_config);
        this.database = firebase.database();
    }

    findAll(): Promise<Blogpost[]> {
        return this.database.ref('blogposts').once('value').then((output) => {
            let vals = _.values(output.val());
            return vals;
        });
    }

}

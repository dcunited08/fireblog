import {Injectable} from '@angular/core';
import {Blogpost} from "./blogpost.type";
import {environment} from './environment';
import * as _ from 'lodash';

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
            return _.values(output.val());
        });
    }

    find(id: number): Promise<Blogpost> {
        return this.findAll()
            .then((blogposts) => {
                return _.find(blogposts, {id: id});
            })
    }

}

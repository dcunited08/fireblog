import {Injectable} from '@angular/core';
import {Blogpost} from "./blogpost.type";
import {environment} from './environment';
import * as _ from 'lodash';
import {FirebaseService} from "./firebase.service";


@Injectable()
export class BlogpostsService {

    database: any;

    constructor(private firebaseService: FirebaseService) {
        this.database = this.firebaseService.firebase.database();
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

    save(post: Blogpost){
        console.log(post);
        var update = {};
        if(!post.id){
            post.id = Date.now();
        }
        console.log(post);

        update[post.id] = post;
        return this.database.ref('blogposts').update(update).then((output) => {
            console.log(output);
        });

    }

}

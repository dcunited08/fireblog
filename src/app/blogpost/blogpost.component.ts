import {Component, OnInit, Input} from '@angular/core';
import {Blogpost} from "../blogpost.type";
import {RouteParams, Router} from '@angular/router-deprecated';
import {BlogpostsService} from '../blogposts.service';


@Component({
    moduleId: module.id,
    selector: 'app-blogpost',
    templateUrl: 'blogpost.component.html',
    styleUrls: ['blogpost.component.css']
})
export class BlogpostComponent implements OnInit {

    @Input() blogpost: Blogpost;

    constructor(private _routeParams: RouteParams, private router: Router, private blogpostService: BlogpostsService) {
    }

    ngOnInit() {
        if (this._routeParams.get('id') !== null) {
            let _id = parseInt(this._routeParams.get('id'));
            // console.log(_id);
            this.blogpostService.find(_id)
                .then((post) => {
                    this.blogpost = post;
                });
            this.blogpost = new Blogpost();

        }
    }

    onSelect(post: Blogpost) {
        this.router.navigate( ['Blogpost', { id: post.id }] );
    }

}

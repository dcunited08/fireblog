import {Component, OnInit, Input} from '@angular/core';
import {Blogpost} from "../blogpost.type";
import {RouteParams, Router} from '@angular/router-deprecated';
import {BlogpostsService} from '../blogposts.service';
import {AuthService} from "../auth.service";


@Component({
    moduleId: module.id,
    selector: 'app-blogpost',
    templateUrl: 'blogpost.component.html',
    styleUrls: ['blogpost.component.css']
})
export class BlogpostComponent implements OnInit {

    @Input() blogpost: Blogpost;
    @Input() view: string;

    constructor(private _routeParams: RouteParams,
                private router: Router,
                private blogpostService: BlogpostsService,
                private auth: AuthService) {
    }

    ngOnInit() {
        if (this.blogpost == null) {
            this.blogpost = new Blogpost();
        }

        if (this._routeParams.get('id') !== null) {
            this.loadBlogpost(parseInt(this._routeParams.get('id')));
        }
    }

    loadBlogpost(_id: number) {
        this.blogpostService.find(_id)
            .then((post) => {
                this.blogpost = post;
            });
    }

    onSelect(post: Blogpost) {
        this.router.navigate(['Blogpost', {id: post.id}]);
    }

}

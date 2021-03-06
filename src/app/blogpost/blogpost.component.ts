import {Component, OnInit, Input} from '@angular/core';
import {Blogpost} from "../blogpost.type";
import {RouteParams, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {BlogpostsService} from '../blogposts.service';
import {AuthService} from "../auth.service";
import { NgForm }    from '@angular/common';


@Component({
    moduleId: module.id,
    selector: 'app-blogpost',
    templateUrl: 'blogpost.component.html',
    styleUrls: ['blogpost.component.css'],
    directives: [ROUTER_DIRECTIVES]
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
            this.load(parseInt(this._routeParams.get('id')));
        }

        if (this._routeParams.get('view') !== null) {
            this.view = this._routeParams.get('view');
        }
    }

    load(_id: number) {
        this.blogpostService.find(_id)
            .then((post) => {
                this.blogpost = post;
            });
    }

    onSubmit() {
        this.blogpostService.save(this.blogpost);
    }

    onDelete(){
        this.blogpostService.delete(this.blogpost);
    }

    get diagnostic() { return JSON.stringify(this.blogpost); }

}

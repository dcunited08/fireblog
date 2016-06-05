import {Component, OnInit, Input} from '@angular/core';
import {BlogpostsService} from "../blogposts.service";
import {Blogpost} from '../blogpost.type';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    moduleId: module.id,
    selector: 'app-blogposts',
    templateUrl: 'blogposts.component.html',
    styleUrls: ['blogposts.component.css'],
    directives: [
        ROUTER_DIRECTIVES
    ]
})
export class BlogpostsComponent implements OnInit {

    @Input() blogposts: Blogpost[];

    constructor(private router: Router, private blogpostsService: BlogpostsService) {
    }

    ngOnInit() {
        this.blogpostsService.findAll()
            .then((posts) => {
                this.blogposts = posts;
            });
    }

}

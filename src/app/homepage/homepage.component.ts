import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router-deprecated';

import {BlogpostComponent} from '../blogpost/blogpost.component'
import {Blogpost} from "../blogpost.type";
import {BlogpostsService} from "../blogposts.service";

@Component({
    moduleId: module.id,
    selector: 'app-homepage',
    templateUrl: 'homepage.component.html',
    styleUrls: ['homepage.component.css'],
    directives: [BlogpostComponent]
})
export class HomepageComponent implements OnInit {
    @Input() blogposts: Blogpost[];

    constructor(private router: Router, private blogpostsService: BlogpostsService) {}

    ngOnInit() {
        this.blogpostsService.findAll()
            .then((posts) => {
                this.blogposts = posts;
            });
    }

    gotoDetail(post: Blogpost) {
        let link = ['Blogpost', {id: post.id}];
        this.router.navigate(link);
    }

}

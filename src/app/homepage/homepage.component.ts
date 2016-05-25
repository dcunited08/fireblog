import {Component, OnInit, Input} from '@angular/core';
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

    constructor(private blogpostsService: BlogpostsService) {}

    ngOnInit() {
        this.blogpostsService.findAll()
            .then((posts) => {
                this.blogposts = posts;
            });
    }

}

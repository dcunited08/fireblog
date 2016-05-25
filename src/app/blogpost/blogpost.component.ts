import {Component, OnInit, Input} from '@angular/core';
import {Blogpost} from "../blogpost.type";

@Component({
    moduleId: module.id,
    selector: 'app-blogpost',
    templateUrl: 'blogpost.component.html',
    styleUrls: ['blogpost.component.css']
})
export class BlogpostComponent implements OnInit {

    @Input() blogpost: Blogpost;

    constructor() {
    }

    ngOnInit() {
        console.log(this.blogpost);
    }

}

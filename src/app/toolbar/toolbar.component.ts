import {Component, OnInit, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Blog} from '../blog.type';

@Component({
    moduleId: module.id,
    selector: 'app-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['toolbar.component.css'],
    directives: [ROUTER_DIRECTIVES],

})
export class ToolbarComponent implements OnInit {

    @Input() blog: Blog;

    ngOnInit() {
    }

}

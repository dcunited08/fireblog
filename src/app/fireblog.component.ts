import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {HomepageComponent} from './homepage/homepage.component';
import {LoginComponent} from './login/login.component';
import {Blog} from './blog.type';
import {environment} from './environment'
import {BlogpostsService} from "./blogposts.service";
import {BlogpostComponent} from "./blogpost/blogpost.component";

@Component({
    moduleId: module.id,
    selector: 'fireblog-app',
    templateUrl: 'fireblog.component.html',
    styleUrls: ['fireblog.component.css'],
    directives: [ToolbarComponent, ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        BlogpostsService
    ]
})
@RouteConfig([
    {path: '/home', name: 'Homepage', component: HomepageComponent, useAsDefault: true},
    {path: '/blogpost/:id', name: 'Blogpost', component: BlogpostComponent },
    {path: '/login', name: 'Login', component: LoginComponent}
])
export class FireblogAppComponent {
    blog: Blog;
    title: string;
    constructor() {
        this.title = 'My Blog';
        this.blog = {
            name: environment.name
        };

    }
}

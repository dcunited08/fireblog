import {Component, OnInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AuthService} from '../auth.service'
import {BlogpostComponent} from '../blogpost/blogpost.component'


@Component({
    moduleId: module.id,
    selector: 'app-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'AdminHome', component: AdminHomeComponent, useAsDefault: true},
    {path: '/blogpost', name: 'AdminNewBlogpost', component: BlogpostComponent},
    {path: '/blogpost/:id', name: 'AdminBlogpost', component: BlogpostComponent}
])
export class AdminComponent implements OnInit {

    user: any;

    constructor(private auth: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.auth.isLoggedIn()
            .then((isLoggedIn) => {
                if (!isLoggedIn) {
                    this.router.navigate(['Login']);
                } else {
                    this.auth.user
                        .then((user) => {
                            this.user = user;
                        });
                }
            });
    }

    logout() {
        this.auth.logout()
            .then(() => {
                this.router.navigate(['Homepage']);
            });
    }

}

import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from '@angular/router-deprecated';


@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router) {
        console.log(auth);
    }

    ngOnInit() {
    }

    doLogin(provider: string) {
        console.log(provider);
        this.auth.login(provider)
            .then(() => {
                this.router.navigate(['Admin']);
            })


    }

}

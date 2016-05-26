import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service'


@Component({
    moduleId: module.id,
    selector: 'app-admin-home',
    templateUrl: 'admin-home.component.html',
    styleUrls: ['admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

    constructor(private auth: AuthService) {
    }

    ngOnInit() {
    }

}

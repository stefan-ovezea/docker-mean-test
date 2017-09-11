import { Component, OnInit } from '@angular/core';

import { User } from '../../_models/index';
import { UserService } from '../../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'users.component.html'
})

export class UserComponent implements OnInit {
    users: User[];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.loadAllUsers();
    }

    loadAllUsers() {
        this.userService.getAll()
                        .subscribe(
                            users => {
                                this.users = users;
                            }
                        );
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

}
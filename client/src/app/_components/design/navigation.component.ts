import { Component, OnInit } from "@angular/core";

import { GlobalEventsManager } from "../../_events/events.manager";
import { UserService } from "../../_services/user.service";
import { User } from "../../_models/user";

@Component({
    moduleId: module.id,
    selector: "navbar",
    templateUrl: "navigation.component.html"
})

export class NavbarComponent implements OnInit {
    currentUser: User;
    isTrainer: boolean = false;
    showNavBar: boolean = false;

    constructor(
        private globalEventsManager: GlobalEventsManager,
        private userService: UserService
        ) { 
           
        }
        

    ngOnInit() {
        this.getAllUsers();
        this.globalEventsManager.showNavBarEmitter.subscribe((mode)=>{
                this.showNavBar = mode;
        });
    }

    getAllUsers() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser.role.toLowerCase() == "trainer")
            this.isTrainer = true;

        // this.userService.getAll()
        //                 .subscribe(users => {
        //                     for (let user of users) {
        //                         if(user.username === this.currentUser.username && user.role === "Trainer") {
        //                             this.currentUser.role = "Trainer";
        //                             this.isTrainer = true;
        //                             console.log(this.isTrainer);
        //                         } else {
        //                             this.currentUser.role = "Student";
        //                         }
        //                     }
        //                 });
    }

 
}
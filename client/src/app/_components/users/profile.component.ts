import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
    profile: any;

    constructor() {}

    ngOnInit() {
        this.getProfile();
    }

    getProfile() {
        this.profile = JSON.parse(localStorage.getItem('currentUser'));
    }

}
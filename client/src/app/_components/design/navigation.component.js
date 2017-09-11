"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var events_manager_1 = require("../../_events/events.manager");
var user_service_1 = require("../../_services/user.service");
var NavbarComponent = (function () {
    function NavbarComponent(globalEventsManager, userService) {
        this.globalEventsManager = globalEventsManager;
        this.userService = userService;
        this.isTrainer = false;
        this.showNavBar = false;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getAllUsers();
        this.globalEventsManager.showNavBarEmitter.subscribe(function (mode) {
            _this.showNavBar = mode;
        });
    };
    NavbarComponent.prototype.getAllUsers = function () {
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
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "navbar",
        templateUrl: "navigation.component.html"
    }),
    __metadata("design:paramtypes", [events_manager_1.GlobalEventsManager,
        user_service_1.UserService])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navigation.component.js.map
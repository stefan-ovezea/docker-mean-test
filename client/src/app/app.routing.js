"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./_components/index");
var index_2 = require("./_guards/index");
var appRoutes = [
    { path: '', component: index_1.HomeComponent, canActivate: [index_2.AuthGuard] },
    { path: 'users', component: index_1.UserComponent, canActivate: [index_2.AuthGuard] },
    { path: 'profile', component: index_1.ProfileComponent, canActivate: [index_2.AuthGuard] },
    { path: 'register', component: index_1.RegisterComponent },
    { path: 'login', component: index_1.LoginComponent },
    { path: 'training', component: index_1.TrainingComponent, canActivate: [index_2.AuthGuard] },
    { path: 'createtraining', component: index_1.CreateTrainingComponent, canActivate: [index_2.AuthGuard] },
    { path: 'blockstats', component: index_1.BlockstatsComponent, canActivate: [index_2.AuthGuard] },
    { path: 'details', component: index_1.TrainingDetailsComponent, canActivate: [index_2.AuthGuard] },
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map
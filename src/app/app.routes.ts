import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { Home3DComponent } from './features/home3-d/home3-d.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: Home3DComponent, canActivate: [authGuard]},
];

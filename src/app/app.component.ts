import { Component, Inject, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { Home3DComponent } from './features/home3-d/home3-d.component';
import { LoginComponent } from "./features/login/login.component";
import { AccountService } from './core/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ NavBarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Client3D';
  showNavbar: boolean = false;
  
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.url !== '/';
      }
    });
  }

}

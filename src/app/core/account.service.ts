import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs';
import { User } from '../shared/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7292/api/Account/';
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  login(values: any) {
    let params = new HttpParams();
    params = params.append('useCookies', true);
    
    return this.http.post(this.baseUrl + 'login', values , { params , withCredentials: true });
  }

  getUserInfo() {
    return this.http.get<User>(this.baseUrl + 'userinfo',{ withCredentials: true }).pipe(
      map(user => {
        this.currentUser.set(user);
        console.log(this.currentUser());
        return user;
      })
    )
  }
  
  logout(){
    return this.http.post(this.baseUrl + 'logout',{} , { withCredentials: true })
  }

  getAuthState() {
    return this.http.get<{isAuthenticated: boolean}>(this.baseUrl + 'auth-status',{ withCredentials: true });
  }
}
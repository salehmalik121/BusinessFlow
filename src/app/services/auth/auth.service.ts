import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'superAdmin' | 'accounts' | 'sales' | 'maintenance' | 'inventory';
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  roles: string[];
  tag: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Mock user - replace with actual authentication
    this.setUser({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'accounts' // Change this to test different roles
    });
  }

  setUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }
}
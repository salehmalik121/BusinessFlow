import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService, User, MenuItem } from "../../../services/auth/auth.service";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [CommonModule , RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  loginDetails: any = {};

  currentUser: User | null = null;
  isSidebarCollapsed = false;
  activeMenuItem = 'dashboard';
  tag = 'Welcome Back! Here is an overview of your business operations';
  private destroy$ = new Subject<void>();

  menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/main/dashboard',
      roles: ['superAdmin'],
      tag: 'Welcome Back! Here is an overview of your business operations'
    },
    {
      id: 'accounts',
      label: 'Accounts',
      icon: 'account_balance',
      route: '/main/accounts',
      roles: ['superAdmin', 'accounts'],
      tag: 'Manage Invoicing, VAT filing and finanacial reporting'
    },
    {
      id: 'sales',
      label: 'Sales',
      icon: 'trending_up',
      route: '/main/sales',
      roles: ['superAdmin', 'sales'],
      tag: 'Create quotes, track opportunities and moniter sales performance'
    },
    {
      id: 'maintenance Mangement',
      label: 'Maintenance',
      icon: 'build',
      route: '/main/maintenance',
      roles: ['superAdmin', 'maintenance'],
      tag: 'Service reports, issue tracking and maintenance scheduling'
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: 'inventory',
      route: '/main/inventory',
      roles: ['superAdmin', 'inventory'],
      tag: "Track inventory, QR codes and stock levels accross all locations"
    }
  ];


  constructor(private router: Router, private authService: AuthService){

  }
  ngOnInit(){
    // console.log("hello main");
    // this.loginDetails = localStorage.getItem("loginDetails")

    // if(this.loginDetails === null){
    //   this.router.navigateByUrl('/')
    // }

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
        console.log(user);
        let isRedirect = 0;
        this.menuItems.forEach(menus=>{
          if(menus.roles.includes(user?.role!) && isRedirect ==0 ){
            console.log("wo")
            this.router.navigateByUrl(menus.route);
            this.activeMenuItem = menus.id; 
            isRedirect = 1;
          }
        })

      });

  }

    ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get visibleMenuItems(): MenuItem[] {
    return this.menuItems.filter(item => 
      this.authService.hasAnyRole(item.roles)
    );
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  navigateTo(menuItem: MenuItem): void {
    this.activeMenuItem = menuItem.id;
    this.tag = menuItem.tag;
    this.router.navigateByUrl(menuItem.route);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  getRoleDisplayName(role: string): string {
    switch (role) {
      case 'superAdmin': return 'Super Admin';
      case 'accounts': return 'Accounts Manager';
      case 'sales': return 'Sales Manager';
      case 'maintenance': return 'Maintenance Manager';
      case 'inventory': return 'Inventory Manager';
      default: return role;
    }
  }

}

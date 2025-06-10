import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  activeQuotes: Array<any> = [
    {
      quoteNumber: 'QT-2024-001',
      school: 'GEMS Dubai American Academy',
      service: 'LED Lighting',
      amount: 15750,
      status: 'pending'
    },
    {
      quoteNumber: 'QT-2024-002',
      school: 'GEMS International School',
      service: 'Security Systems',
      amount: 8900,
      status: 'approved'
    }
  ];

  Issues: Array<any> = [
    {
      id: 'ISS-2024-003',
      school: 'GEMS International School',
      description: 'HVAC system making unusual noise',
      priority: 'medium',
      status: 'open',
      actions: ['Assign', 'View']
    },
    {
      id: 'ISS-2024-001',
      school: 'Oak Valley School',
      description: 'Classroom lighting intermittent failure',
      priority: 'high',
      status: 'in-progress',
      actions: ['Resolve', 'View']
    },
    {
      id: 'ISS-2024-002',
      school: 'GEMS Dubai American Academy',
      description: 'Network connectivity issues in computer lab',
      priority: 'high',
      status: 'resolved',
      actions: ['View']
    }
  ];

  inventoryItems: Array<any> = [
    {
      itemCode: 'CBL-002',
      description: 'Ethernet Cable Cat6 - 100ft',
      location: 'Riverside High School',
      stock: 3,
      unitCost: 24.99,
      status: 'low',
      actions: ['View QR', 'Reorder']
    },
    {
      itemCode: 'LED-001',
      description: 'LED Light Fixture - 48W Ceiling Mount',
      location: 'Warehouse',
      stock: 15,
      unitCost: 89.99,
      status: 'available',
      actions: ['View QR', 'Transfer']
    },
    {
      itemCode: 'PWR-004',
      description: 'UPS Battery Backup 1500VA',
      location: 'Mountain View Elementary',
      stock: 2,
      unitCost: 199.99,
      status: 'low',
      actions: ['View QR', 'Reorder']
    },
    {
      itemCode: 'SEC-005',
      description: 'Security Camera IP Dome 4MP',
      location: 'Warehouse',
      stock: 12,
      unitCost: 299.99,
      status: 'available',
      actions: ['View QR', 'Transfer']
    },
    {
      itemCode: 'SWT-003',
      description: 'Network Switch 24-Port Gigabit',
      location: 'Warehouse',
      stock: 8,
      unitCost: 159.99,
      status: 'available',
      actions: ['View QR', 'Transfer']
    }
  ];

  recentInvoices: Array<any> = [
    {
      invoiceNumber: 'INV-2024-001',
      client: 'GEMS International School',
      amount: 5900,
      status: 'paid',
      dueDate: '7/15/2024'
    },
    {
      invoiceNumber: 'INV-2024-002',
      client: 'GEMS Dubai American Academy',
      amount: 5250,
      status: 'pending',
      dueDate: '8/30/2024'
    },
    {
      invoiceNumber: 'INV-2024-003',
      client: 'Sunset Middle School',
      amount: 3400,
      status: 'overdue',
      dueDate: '6/15/2024'
    }
  ];

  constructor() { }
  private qoutes = new BehaviorSubject<any[]>(this.activeQuotes);
  private issues = new BehaviorSubject<any[]>(this.Issues);
  private items = new BehaviorSubject<any[]>(this.inventoryItems);
  private invoices = new BehaviorSubject<any[]>(this.recentInvoices);

  public qoutes$:Observable<any[]> = this.qoutes.asObservable();
  public issues$:Observable<any[]> = this.issues.asObservable();
  public items$:Observable<any[]> = this.items.asObservable();
  public invoices$:Observable<any[]> = this.invoices.asObservable();

  AddQoutes(item:any){
    const currentValues = this.qoutes.getValue();
    this.qoutes.next([...currentValues , item])
  }

  AddIssues(item:any){
    const currentValues = this.issues.getValue();
    this.issues.next([...currentValues , item])
  }

  AddItems(item:any){
    const currentValues = this.items.getValue();
    this.items.next([...currentValues , item])
  }

  AddInvoice(item:any){
    const currentValues = this.invoices.getValue();
    this.items.next([...currentValues , item])
  }

  

}

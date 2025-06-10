import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSharingService } from '../../../../../services/data-sharing.service';
import { CreateQouteDialogComponent } from '../../../../componants/create-qoute-dialog/create-qoute-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { GenerateInvoiceComponent } from '../../../../componants/generate-invoice/generate-invoice.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

   metrics: Array<any> = [
    {
      title: 'Total Revenue',
      value: '$8800.00',
      change: '+12.5% vs last month',
      isPositive: true
    },
    {
      title: 'Active Projects',
      value: '2',
      change: '-2.3% vs last month',
      isPositive: false
    },
    {
      title: 'Pending Issues',
      value: '3',
      change: 'Requires attention',
      isPositive: false
    },
    {
      title: 'Inventory Value',
      value: '$8704.60',
      change: '+6.1% vs last month',
      isPositive: true
    }
  ];

  recentActivity: Array<any> = [
    {
      title: 'Invoice RIV-2024-001 generated for Riverside High School',
      timeAgo: '1 hour ago',
      type: 'invoice'
    },
    {
      title: 'New quote QT-2024-015 created for Mountain View Elementary',
      timeAgo: '3 hours ago',
      type: 'quote'
    },
    {
      title: 'Maintenance issue reported at Oak Valley School',
      timeAgo: '5 hours ago',
      type: 'maintenance'
    },
    {
      title: 'Inventory item "LED Light Fixture" low stock alert',
      timeAgo: '1 day ago',
      type: 'inventory'
    }
  ];

  private _snackBar = inject(MatSnackBar);

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  readonly dialog = inject(MatDialog)

  constructor(private dataSharing : DataSharingService){

  }

  ngOnInit(){
    this.dataSharing.qoutes$.subscribe((value)=>{
      let revenue = 0;
      console.log(value);
      value.forEach(item=>{
        if(item.status != 'pending'){
          revenue += item.amount;
        }
        
      })
      this.metrics[0].value = `$${revenue}`
    })

    this.dataSharing.issues$.subscribe((values)=>{
    let pending = values.filter(value=>value.status == 'open')
    let active = values.filter(value=>value.status == 'in-progress')
    this.metrics[2].value = pending.length;
    this.metrics[1].value = active.length;

    })

    this.dataSharing.items$.subscribe((values)=>{
      let totalAmount = 0;
      values.forEach(value=>{
        let singleItemTotal = value.stock * value.unitCost;
        totalAmount += singleItemTotal;
      })
      this.metrics[3].value = totalAmount;
    })

  }
  getActivityIcon(type: string): string {
    const icons = {
      invoice: '📄',
      quote: '📋',
      maintenance: '🔧',
      inventory: '📦'
    };
    return icons[type as keyof typeof icons] || '📋';
  }

  createQuote(): void {
    console.log('Creating quote...');
    // Implement quote creation logic

        const dialogRef = this.dialog.open(CreateQouteDialogComponent, {
      
    });

  }

  generateInvoice(): void {
    console.log('Generating invoice...');
    const dialogRef = this.dialog.open(GenerateInvoiceComponent, {
      
    });
  }

  serviceReport(): void {
    console.log('Opening service report...');
    // Implement service report logic
    this.openSnackBar("Comming Soon.")
  }

  scanQRCode(): void {
    console.log('Opening QR scanner...');
    // Implement QR code scanning logic
    this.openSnackBar("Comming Soon.")
  }


  openDialog(): void {


  }

    openSnackBar(msg:string) {
    this._snackBar.open(msg, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,
    });
  }


}

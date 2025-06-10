import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSharingService } from '../../../../../services/data-sharing.service';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
    stats: any = {
    totalItems: 5,
    lowStockAlerts: 2,
    totalValue: 6704.60,
    onHold: 1
  };

  inventoryItems: Array<any> = [];

  showQRCode = false;
  selectedItem = '';

  constructor(private dataSharing : DataSharingService){
  }

  ngOnInit(){
    this.dataSharing.items$.subscribe(value=>{
      this.inventoryItems = value;

      this.stats.totalItems = value.length;

      let lowCount = 0;

      value.forEach(item=>{
        if(item.stock < 5){
          lowCount += 1;
        }
      })

      this.stats.lowStockAlerts = lowCount;


      let totalAmount = 0;
      value.forEach(value=>{
        let singleItemTotal = value.stock * value.unitCost;
        totalAmount += singleItemTotal;
      })
      this.stats.totalValue = totalAmount;

    })

  }

  scanQRCode() {
    alert('QR Code scanner would be activated here');
  }

  addItem() {
    alert('Add Item dialog would open here');
  }

  transfer() {
    alert('Transfer dialog would open here');
  }

  reorder() {
    alert('Reorder dialog would open here');
  }

  reports() {
    alert('Reports section would open here');
  }

  performAction(action: string, item: any) {
    if (action === 'View QR') {
      this.showQRCode = true;
      this.selectedItem = item.itemCode;
    } else {
      alert(`${action} action for ${item.itemCode}`);
    }
  }
}

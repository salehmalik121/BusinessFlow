import { Component,inject,model } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import { DataSharingService } from '../../../services/data-sharing.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-generate-invoice',
    imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDatepickerModule
  ],
  templateUrl: './generate-invoice.component.html',
  styleUrl: './generate-invoice.component.css',
  providers: [provideNativeDateAdapter() , DatePipe]
})
export class GenerateInvoiceComponent {

  readonly dialogRef = inject(MatDialogRef<GenerateInvoiceComponent>);
  newInvoice : any = {}

  constructor(private dataSharing: DataSharingService , private datePipe : DatePipe ){

  }

  createInvoice(){

    length = 0;
    let existingInvoices = this.dataSharing.invoices$.subscribe((value)=>{
      length = value.length;
    })


    const rawDate = new Date(this.newInvoice.date);
    const formattedDate = this.datePipe.transform(rawDate, 'M/d/yyyy');
  
    let _newInvoice = {
      invoiceNumber: 'INV-2024-' + length + 1,
      client: this.newInvoice.school,
      amount: this.newInvoice.amount,
      status: 'pending',
      dueDate: formattedDate
    }

    console.log(_newInvoice);

    this.dataSharing.AddInvoice(_newInvoice);

    this.newInvoice = {};

  }

  isFormValid(): boolean {
    return !!(this.newInvoice.school && this.newInvoice.date && this.newInvoice.amount > 0);
  }

}

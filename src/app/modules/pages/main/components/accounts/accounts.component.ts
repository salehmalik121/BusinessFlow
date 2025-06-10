import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { DataSharingService } from '../../../../../services/data-sharing.service';
import { MatDialog } from '@angular/material/dialog';
import { GenerateInvoiceComponent } from '../../../../componants/generate-invoice/generate-invoice.component';



@Component({
  selector: 'app-accounts',
  imports: [CommonModule ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

  readonly dialog = inject(MatDialog)

  accountMetrics: Array<any> = [
    {
      title: 'Outstanding Invoices',
      value: '$5250.00',
      subtitle: 'Pending payment',
      color: 'red',
      action: 'View Details'
    },
    {
      title: 'Monthly Revenue',
      value: '$8900.00',
      subtitle: 'Current month',
      color: 'green',
      action: 'Generate Report'
    },
    {
      title: 'VAT Filing Status',
      value: 'Due Soon',
      subtitle: 'Q1 2024 VAT Return',
      color: 'blue',
      action: 'File Now'
    }
  ];

  recentInvoices: Array<any> = [];

  constructor(private dataSharing : DataSharingService){

  }

  ngOnInit(){
    (<any>pdfMake).addVirtualFileSystem(pdfFonts);
    this.dataSharing.invoices$.subscribe(value=>{
      this.recentInvoices = value;

      let outstandingInvoices = 0;
      let monthlyRevenue = 0;
      value.forEach(value=>{
        if(value.status != 'paid'){
          outstandingInvoices += value.amount;
        }else{
          monthlyRevenue += value.amount;
        }
      })

      this.accountMetrics[0].value = outstandingInvoices;
      this.accountMetrics[1].value = monthlyRevenue;

    })


  }

  handleMetricAction(metric: any): void {
    switch (metric.action) {
      case 'View Details':
        this.viewOutstandingInvoices();
        break;
      case 'Generate Report':
        this.generateMonthlyReport();
        break;
      case 'File Now':
        this.fileVATReturn();
        break;
    }
  }

  generateInvoice(): void {
    console.log('Generating new invoice...');
    // Implement invoice generation logic
    const dialogRef = this.dialog.open(GenerateInvoiceComponent, {
      
    });
  }

  viewInvoice(invoice: any): void {
    console.log('Viewing invoice:', invoice.invoiceNumber);
    // Implement view invoice logic
  }

  downloadInvoice(invoiceData: any): void {
    console.log('Downloading invoice:', invoiceData.invoiceNumber);
    const docDefinition : TDocumentDefinitions = {
      content: [
        { text: 'INVOICE', style: 'header', alignment: 'center', margin: [0, 0, 0, 20] },

        {
          columns: [
            [
              { text: `Invoice Number: ${invoiceData.invoiceNumber}`, style: 'subheader' },
              { text: `Client: ${invoiceData.client}` },
              { text: `Status: ${invoiceData.status.toUpperCase()}` }
            ],
            [
              { text: `Date Issued: ${new Date().toLocaleDateString()}`, alignment: 'right' },
              { text: `Due Date: ${invoiceData.dueDate}`, alignment: 'right' }
            ]
          ],
          margin: [0, 0, 0, 20]
        },

        {
          table: {
            widths: ['*', 'auto'],
            body: [
              [
                { text: 'Description', style: 'tableHeader' },
                { text: 'Amount', style: 'tableHeader' }
              ],
              [
                'Service Fee',
                `$${invoiceData.amount.toFixed(2)}`
              ]
            ]
          },
          layout: 'lightHorizontalLines',
          margin: [0, 0, 0, 20]
        },

        {
          text: `Total Amount: $${invoiceData.amount.toFixed(2)}`,
          style: 'total',
          alignment: 'right',
          margin: [0, 0, 0, 10]
        },

        {
          text: `Status: ${invoiceData.status.toUpperCase()}`,
          color: invoiceData.status === 'paid' ? 'green' : 'red',
          alignment: 'right',
          bold: true
        }
      ],

      styles: {
        header: {
          fontSize: 22,
          bold: true
        },
        subheader: {
          fontSize: 14,
          bold: true
        },
        tableHeader: {
          bold: true,
          fillColor: '#eeeeee'
        },
        total: {
          bold: true,
          fontSize: 14
        }
      }
    };
    pdfMake.createPdf(docDefinition).download();
  }

  sendReminder(invoice: any): void {
    console.log('Sending reminder for invoice:', invoice.invoiceNumber);
    // Implement send reminder logic
  }

  completeInvoice(invoice: any , i: number): void {
    console.log('Completing invoice:', invoice.invoiceNumber);
    this.recentInvoices[i].status = 'paid'
    this.updateMetric();
  }

  viewOutstandingInvoices(): void {
    console.log('Viewing outstanding invoices...');
    // Implement view outstanding invoices logic
  }

  generateMonthlyReport(): void {
    console.log('Generating monthly report...');
    // Implement monthly report generation logic
  }

  fileVATReturn(): void {
    console.log('Filing VAT return...');
    // Implement VAT filing logic
  }

  updateMetric(): void {
      let outstandingInvoices = 0;
      let monthlyRevenue = 0;
      this.recentInvoices.forEach(value=>{
        if(value.status != 'paid'){
          outstandingInvoices += value.amount;
        }else{
          monthlyRevenue += value.amount;
        }
      })

      this.accountMetrics[0].value = outstandingInvoices;
      this.accountMetrics[1].value = monthlyRevenue;
  }

}

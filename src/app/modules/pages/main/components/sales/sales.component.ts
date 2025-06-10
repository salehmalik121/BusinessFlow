import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataSharingService } from '../../../../../services/data-sharing.service';

@Component({
  selector: 'app-sales',
  imports: [CommonModule,FormsModule ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {

  constructor(private dataSharing : DataSharingService){

  }

 salesMetrics: Array<any> = [
    {
      title: 'Active Quotes',
      value: '2',
      subtitle: 'Pending responses',
      color: 'blue'
    },
    {
      title: 'Monthly Target',
      value: '18%',
      subtitle: '$78,000 of $100,000',
      color: 'green',
      progress: 78
    },
    {
      title: 'Conversion Rate',
      value: '65%',
      subtitle: 'Average quote success',
      color: 'orange'
    }
  ];

  activeQuotes: Array<any> = [];

  newQuote = {
    school: '',
    service: '',
    amount: 0
  };

  ngOnInit(){
    this.dataSharing.qoutes$.subscribe((value:any[])=>{
      this.activeQuotes = value;

      let pendingQoutes = value.filter(q=>q.status == 'pending')
      this.salesMetrics[0].value = pendingQoutes.length;


      let approvedQoutes = value.filter(q=>q.status == 'approved')
      let earning = 0;
      approvedQoutes.forEach(q=>{
        earning += q.amount;
      })
      let percentTarget = (earning/100000)*100
      let _percentTarget = percentTarget.toFixed(2);
      this.salesMetrics[1].value = `${_percentTarget}%`
      this.salesMetrics[1].subtitle = `$${earning} of $100,000`

      let numberOfApproved = approvedQoutes.length;
      let conversionRate = ((numberOfApproved / this.activeQuotes.length)*100).toFixed(2)
      this.salesMetrics[2].value = `${conversionRate}%`


    })
  }

  isFormValid(): boolean {
    return !!(this.newQuote.school && this.newQuote.service && this.newQuote.amount > 0);
  }

  createQuote(): void {
    if (this.isFormValid()) {
      const quoteNumber = `QT-2024-${String(this.activeQuotes.length + 3).padStart(3, '0')}`;
      const newQuote: any = {
        quoteNumber,
        school: this.newQuote.school,
        service: this.newQuote.service,
        amount: this.newQuote.amount,
        status: 'pending'
      };
      
      this.dataSharing.AddQoutes(newQuote);
      
      // Reset form
      this.newQuote = {
        school: '',
        service: '',
        amount: 0
      };
      
      // Update active quotes metric
      this.salesMetrics[0].value = this.activeQuotes.filter(q => q.status === 'pending').length.toString();
      
      console.log('Quote created:', newQuote);
    }
  }

  acceptQuote(quote: any): void {
    quote.status = 'approved';
    this.updateMetrics();
    console.log('Quote accepted:', quote.quoteNumber);
  }

  rejectQuote(quote: any): void {
    quote.status = 'rejected';
    this.updateMetrics();
    console.log('Quote rejected:', quote.quoteNumber);
  }

  viewQuote(quote: any): void {
    console.log('Viewing quote:', quote.quoteNumber);
    // Implement view quote logic
  }

  createInvoice(quote: any): void {
    console.log('Creating invoice for quote:', quote.quoteNumber);
    // Implement create invoice logic
  }

  private updateMetrics(): void {
    const pendingQuotes = this.activeQuotes.filter(q => q.status === 'pending').length;
    this.salesMetrics[0].value = pendingQuotes.toString();

      let approvedQoutes = this.activeQuotes.filter(q=>q.status == 'approved')
      let earning = 0;
      approvedQoutes.forEach(q=>{
        earning += q.amount;
      })
      let percentTarget = (earning/100000)*100
      let _percentTarget = percentTarget.toFixed(2);
      this.salesMetrics[1].value = `${_percentTarget}%`
      this.salesMetrics[1].subtitle = `$${earning} of $100,000`

      let numberOfApproved = approvedQoutes.length;
      let conversionRate = ((numberOfApproved / this.activeQuotes.length)*100).toFixed(2)
      this.salesMetrics[2].value = `${conversionRate}%`

  }
}

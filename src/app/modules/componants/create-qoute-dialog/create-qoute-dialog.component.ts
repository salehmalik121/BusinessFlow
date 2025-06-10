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


@Component({
  selector: 'app-create-qoute-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './create-qoute-dialog.component.html',
  styleUrl: './create-qoute-dialog.component.css'
})
export class CreateQouteDialogComponent {

  constructor(private dataSharing : DataSharingService ){

  }

  readonly dialogRef = inject(MatDialogRef<CreateQouteDialogComponent>);
    newQuote = {
    school: '',
    service: '',
    amount: 0
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  isFormValid(): boolean {
    return !!(this.newQuote.school && this.newQuote.service && this.newQuote.amount > 0);
  }

  createQuote(): void {
    if (this.isFormValid()) {
      const quoteNumber = `QT-2024-${String(0 + 3).padStart(3, '0')}`;
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
      
    }
  }

}

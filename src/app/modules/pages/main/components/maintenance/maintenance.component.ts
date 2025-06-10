import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSharingService } from '../../../../../services/data-sharing.service';

@Component({
  selector: 'app-maintenance',
  imports: [CommonModule],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css'
})
export class MaintenanceComponent {

  constructor(private dataSharing : DataSharingService){

  }

    schools: Array<any> = [
    {
      name: 'GEMS Dubai American Academy',
      activeIssues: 1,
      status: 'urgent',
      statusText: 'Urgent'
    },
    {
      name: 'GEMS International School',
      activeIssues: 1,
      status: 'medium',
      statusText: 'Medium'
    },
    {
      name: 'Oak Valley School',
      activeIssues: 1,
      status: 'urgent',
      statusText: 'Urgent'
    },
    {
      name: 'Sunset Middle School',
      activeIssues: 0,
      status: 'normal',
      statusText: 'All systems normal'
    }
  ];

  issues: Array<any> = [];

  ngOnInit(){

    this.dataSharing.issues$.subscribe(data=>{
      this.issues = data;
    })

  }

  actionPressed(action:any , index:number){
    console.log(action , index);
    switch(action){
      case 'Assign' : 
        this.issues[index].status = 'in-progress';
        this.issues[index].actions = ['Resolve', 'View']
        break;
      case 'Resolve' :
        this.issues[index].status = 'Resolved';
        this.issues[index].actions = ['View'];
        break;
      default :
        console.log("")
    }
  }

}

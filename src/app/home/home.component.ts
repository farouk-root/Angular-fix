import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogComponent } from '../dialog/dialog.component';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImsService } from '../service/ims.service';
import { Ims } from '../model/ims';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
    ,ReactiveFormsModule ,HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  ims: Ims[] = [];
  filteredIms: Ims[] = [];

  filterForm = new FormGroup({
    status: new FormControl('all'),  // Default to 'all' to show all records initially
    start: new FormControl(),
    end: new FormControl(),
    search: new FormControl()
  });

  constructor(
    private imsService: ImsService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllIms();
    this.filterForm.valueChanges.subscribe(() => this.filterIms());
  }

  private getAllIms(): void {
    this.imsService.getAllIms().subscribe((data: Ims[]) => {
      this.ims = data;
      this.filterIms();
    });
  }

  public filterIms(): void {
    const formValues = this.filterForm.value;
    this.filteredIms = this.ims.filter(ims => {
      const date = new Date(ims.date);
      const startDate = formValues.start ? new Date(formValues.start) : null;
      const endDate = formValues.end ? new Date(formValues.end) : null;
      const statusMatch = formValues.status === 'all' || ims.sucesscheck === formValues.status;
      const startDateMatch = !startDate || date >= startDate;
      console.log('startDateMatch', startDateMatch)
      const endDateMatch = !endDate || date <= endDate;
      const searchMatch = !formValues.search || ims.responsable.toLowerCase().includes(formValues.search.toLowerCase());

      return statusMatch && startDateMatch && endDateMatch && searchMatch;
    });
  }

  confirmAndDelete(id: number): void {
    if (confirm('Are you sure you want to delete this IMS?')) {
      this.deleteIms(id);
    }
  }

  private deleteIms(id: number): void {
    this.imsService.deleteIms(id).subscribe(() => {
      this.getAllIms();
    });
  }

  goToDetails(id: number): void {
    this.router.navigate(['/imsstatus', id]);
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, { width: '30%' });
  }

  updateStatus(id: number, event: Event, field: 'sucesscheck' | 'audit'): void {
    const value = (event.target as HTMLSelectElement).value;
    this.imsService.getImsById(id).subscribe(ims => {
      ims[field] = value;
      this.imsService.updateIms(id, ims).subscribe(() => {
        this.getAllIms();  // Refresh the list after updating status
      });
    });
  }
}

import { Component } from '@angular/core';
import { RapportService } from '../service/rapport.service';
import { rapport } from '../model/rapport';
import { NgForm } from '@angular/forms';
/*

@Component({
  selector: 'app-imsaudit',
//  imports: [NgForm],
  templateUrl: './imsaudit.component.html',
  styleUrls: ['./imsaudit.component.css']
})
export class ImsauditComponent  {
  newItem: rapport = new rapport(0, '', '', '', '', '', '', '', '', '', '', '', '', '');

  constructor(private rapportservice: RapportService) {}

  addItem(): void {
    this.rapportservice.saveAudit(this.newItem).subscribe(
      response => {
        console.log('Audit saved successfully', response);

      },
      error => {
        console.error('Error saving audit', error);
      }
    );
  }
}
*/

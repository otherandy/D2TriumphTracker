import { Component, OnInit } from '@angular/core';
import { TriumphTrackerService } from '../services/triumph-tracker.service';
import { TriumphService } from '../services/triumph.service';

@Component({
  selector: 'app-triumph-tracker',
  templateUrl: './triumph-tracker.component.html',
  styles: []
})
export class TriumphTrackerComponent implements OnInit {

  public loading = false;

  constructor(public tracker: TriumphTrackerService,
              public triumphService: TriumphService) { }

  ngOnInit() {
  }

  updateTriumphs() {
    this.loading = true;
    this.triumphService.updateData().subscribe(
      (success: boolean) => {
        if (success) {
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(`Error occurred: \n${err}`);
      }
    );
  }

  unTrackTriumph(hash: string) {
    this.tracker.removeTriumph(hash);
    this.tracker.logTriumphs();
  }

}

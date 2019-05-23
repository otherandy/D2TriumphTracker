import { Component, OnInit } from '@angular/core';
import { TriumphTrackerService } from '../services/triumph-tracker.service';
import { TriumphService } from '../services/triumph.service';

@Component({
  selector: 'app-triumph-tracker',
  templateUrl: './triumph-tracker.component.html',
  styles: []
})
export class TriumphTrackerComponent implements OnInit {

  constructor(public tracker: TriumphTrackerService,
              public triumphService: TriumphService) { }

  ngOnInit() {
  }

  unTrackTriumph(hash: string) {
    this.tracker.removeTriumph(hash);
    this.tracker.logTriumphs();
  }

}

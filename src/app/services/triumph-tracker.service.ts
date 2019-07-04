import { Injectable } from '@angular/core';
import { Triumph } from '../models/triumph';
import { TriumphService } from './triumph.service';

@Injectable({
  providedIn: 'root'
})
export class TriumphTrackerService {
  public trackedTriumphList: Array<string>;

  constructor(private triumphService: TriumphService) {
    if (!this.trackedTriumphList) {
      this.trackedTriumphList = new Array<string>();
      console.log('initializing triumph tracker list.');
    }
  }

  addTriumph(hash: string): boolean {
    if (!this.trackedTriumphList.includes(hash)) {
      this.trackedTriumphList.push(hash);
      return true;
    } else {
      console.log('Triumph Already Tracked');
      return false;
    }
  }

  // alreadyTracked(triumph: Triumph): boolean {
  //   let retVal: boolean = false;
  //   this.trackedTriumphList.forEach(trackedTriumph => {
  //     if(trackedTriumph.hash === triumph.hash){
  //       retVal = true;
  //     }
  //   })
  //   return retVal;
  // }

  removeTriumph(hash: string): boolean {
    try {
      let index = this.trackedTriumphList.indexOf(hash);
      this.trackedTriumphList.splice(index, 1);
      return true;
    } catch (err) {
      return false;
    }
  }

  updateAllTriumphs() {
    // grab user info
    // update triumph in tracked list based upon scope.
  }

  updateTriumph(hashOrIndex) {
    // need to figure out how i'm going to update 1 triumph
  }

  logTriumphs() {
    this.trackedTriumphList.forEach(hash => {
      console.log(this.triumphService.fullTriumphList[hash]);
    });
  }
}

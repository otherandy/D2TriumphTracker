import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserInfo } from '../models/user';
import { TriumphTrackerService } from '../services/triumph-tracker.service';
import { TriumphService } from '../services/triumph.service';


@Component({
  selector: 'app-component-home',
  templateUrl: './triumph-home.component.html',
  styles: []
})
export class TriumphHomeComponent implements OnInit {

  //#region Variable_Declarations
  private manifest: any;
  public userSearchForm: FormGroup;

  public loading = false;
  public categorySelection: string;
  public subCategorySelection: string;
  public sectionSelection: string;

  platformOptions = [
    {name: 'XBL', value: 1},
    {name: 'PSN', value: 2} // ,
    // {name: 'BNet', value: 4}
  ];
  //#endregion

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public triumphService: TriumphService,
              private tracker: TriumphTrackerService) { }

  ngOnInit() {
    const resolvedData: any = this.route.snapshot.data.resolvedManifest;
    this.manifest = resolvedData;

    this.userSearchForm = this.formBuilder.group({
      platform: [2],
      username: ['']
    });

    if (this.triumphService.userInformation) {
      this.userSearchForm.controls.platform.setValue(this.triumphService.userInformation.platform);
      this.userSearchForm.controls.username.setValue(this.triumphService.userInformation.username);
    }
    // this.onSearchUser();
  }

  /*
   * Input: empty
   * Output: empty
   * this function is called upon pressing the user search button on the web-page
   * this will attempt to locate a user in the bungie api and grab all of their triumphs.
   */
  onSearchUser() {
    const userSearchParameters: UserInfo = {
      platform: this.userSearchForm.controls.platform.value,
      username: this.userSearchForm.controls.username.value
    };
    this.loading = true;
    this.categorySelection = undefined;
    this.subCategorySelection = undefined;
    this.sectionSelection = undefined;
    this.triumphService.buildData(userSearchParameters).subscribe(
      (data: boolean) => {
        if (data) {
          this.loading = false;
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  setCategory(hash: string) {
    this.categorySelection = hash;
    this.subCategorySelection = this.triumphService.presentationNodeList[hash].children.presentationNodes[0];
    this.sectionSelection = this.triumphService.presentationNodeList[this.subCategorySelection].children.presentationNodes[0];
    // console.log(`category has been selected: ${this.categorySelection}`);
    // console.log(`sub category has been selected: ${this.subCategorySelection}`);
    // console.log(`section has been selected: ${this.sectionSelection}`);
  }

  setSubCategory(hash: string) {
    this.subCategorySelection = hash;
    this.sectionSelection = this.triumphService.presentationNodeList[hash].children.presentationNodes[0];
    // console.log(`sub category has been selected: ${this.subCategorySelection}`);
    // console.log(`section has been selected: ${this.sectionSelection}`);
  }

  setSection(hash: string) {
    this.sectionSelection = hash;
    // console.log(`section has been selected: ${this.sectionSelection}`);
  }

  trackTriumph(hash: string) {
    this.tracker.addTriumph(hash) ?
    console.log(`Added triumph ${hash} to tracked list.`) :
    // tslint:disable-next-line: no-unused-expression
    null;
  }


  /*
   * Input: number
   * Output: converted string
   * Only a visual helper function
   * this function takes in a number and will return a formatted string with commas.
   * e.g.: 500132154809 -> 500,132,154,809
   */
  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

}

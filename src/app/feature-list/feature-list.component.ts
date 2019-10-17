import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { Feature } from '../feature.model'
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css']
})
export class FeatureListComponent implements OnInit {
  features: Feature[]
  loading: boolean
  productAreas = { "AS": "Assessments", "BL": "Billing", "RC": "Recruit", "RP": "Reports", "NO": "None" };
  modalRef: any

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.features, event.previousIndex, event.currentIndex);
  }
  constructor(private apiService: ApiService, private route: ActivatedRoute, private modalService: NgbModal, private http: HttpClient) { }

  open(content) {
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  ngOnInit() {
    this.loading = true
    this.route.queryParams.subscribe(params => {
      this.loadFeatures(params)
    })
  }

  changePriorities() {
    this.modalRef.close()
    this.loading = true
    for (let feature of this.features) {
      //console.log(feature.title)
      this.apiService.changePriority(feature.id, this.features.indexOf(feature)).subscribe((data) => {
      })
    }
    setTimeout(() => this.route.queryParams.subscribe(params => {
      this.loadFeatures(params)
    }), 3000);
  }


  loadFeatures(params: any) {
    return this.apiService.getFeatures(params).subscribe((features: Feature[]) => {
      console.log(features)
      this.features = features
      this.features.sort(compare);
      this.loading = false
    })

    function compare(a: Feature, b: Feature) {
      if (a.priority < b.priority) {
        return -1;
      }
      if (a.priority > b.priority) {
        return 1;
      }
      return 0;
    }
  }

}

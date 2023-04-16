import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit{

  idSubcategory: string | null | undefined;
  constructor(private route: ActivatedRoute) {
    this.route = route;
  }
  ngOnInit() {
    this.idSubcategory = this.route.snapshot.paramMap.get('idSubcategory');
  }

}

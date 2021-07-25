import {Component, Input, OnInit} from '@angular/core';
import {DocumentModel} from '../../room/room.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {

  @Input()
  document: DocumentModel;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {IHeaderGroupParams} from 'ag-grid-community';
import {IHeaderGroupAngularComp} from 'ag-grid-angular';

interface HeaderButton {
  title: string;
  icon: string;
  fn: any;
  hidden: boolean;
  disabled: any;
  style?: any;
}

interface HeaderParams extends IHeaderGroupParams {
  title?: string;
  buttons?: HeaderButton[];
}

@Component({
  selector: 'app-header-buttons',
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss']
})
export class HeaderButtonsComponent implements IHeaderGroupAngularComp {

  buttons: any[];
  title: string;

  agInit(params: HeaderParams): void {
    this.title = params.title;
    this.buttons = params.buttons;
  }

}

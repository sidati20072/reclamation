import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderModel} from '../../../../models/order.model';
import {UserModel} from '../../../../models/UserModel';
import {EtatOrder} from '../../../../models/EtatOrder';
import {OrderService} from '../../../../Services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: OrderModel;
  deliveryUsers: UserModel[];
  selectedDlvUser;
  selectedOrderStatus;
  etatOrder = EtatOrder;
  constructor(
      public dialogRef: MatDialogRef<OrderDetailComponent>, private orderService: OrderService,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data);
    this.order = this.data.order;
    this.selectedOrderStatus = this.order.etat;
    if (this.order.livreur) {
      this.selectedDlvUser = this.order.livreur.id;
    }
    this.deliveryUsers = this.data.deliveryUsers;
  }

  postActions(): void {
    const body = {
      orderId: this.order.id,
      livreurId: this.selectedDlvUser,
      etat: this.selectedOrderStatus
    };
    this.orderService.setStatusDlvUserOrder(body).subscribe(
        value => {
            this.dialogRef.close('refresh');
        },
        error1 => {}
    );
  }
}

import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {OrderService} from '../../../../Services/order.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {OrderModel} from '../../../../models/order.model';
import {OrderDetailComponent} from '../order-detail/order-detail.component';
import {UserService} from '../../../../Services/user.service';
import {UserModel} from '../../../../models/UserModel';
import {fuseAnimations} from '../../../../../@fuse/animations';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class OrderListComponent implements OnInit {
    orders;
    displayedColumns: string[] = ['id', 'clientName', 'date', 'prix', 'etat', 'livreur', 'resto', 'action'];
    dataSource: MatTableDataSource<OrderModel>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    deliveryUsers: UserModel[];
    constructor(private orderService: OrderService, public dialog: MatDialog, private userService: UserService) {
    }

    ngOnInit(): void {
        this.getOrders();

        this.userService.getDeliveryUsers().subscribe(
            (value: UserModel[]) => {
                console.log(value);
                this.deliveryUsers = value;
            },
            error => {
                console.log(error);
            }
        );

    }

    getOrders() {
        this.orderService.getOrders().subscribe((values: any) => {
            this.orders = values;
            this.dataSource = new MatTableDataSource(this.orders);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    showDetails(order: OrderModel): void {
        const dialogRef = this.dialog.open(OrderDetailComponent, {
            panelClass: 'order-details-dialog',
            data: {order: order, deliveryUsers: this.deliveryUsers}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                this.getOrders();
            }
        });
    }

    toggleSidebar(contactsMainSidebar: string) {
        
    }
}

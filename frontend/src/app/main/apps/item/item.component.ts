import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {OrderModel} from '../../../models/order.model';
import {UserService} from '../../../Services/user.service';
import {OrderDetailComponent} from '../order/order-detail/order-detail.component';
import {fuseAnimations} from '../../../../@fuse/animations';
import {ItemService} from '../../../Services/item.service';
import {ItemModel} from '../../../models/ItemModel';
import {AddItemComponent} from './add-item/add-item.component';
import {UserModel} from '../../../models/UserModel';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ItemComponent implements OnInit {

    items: ItemModel[];
    displayedColumns: string[] = ['id', 'name', 'description', 'prix', 'category', 'resto', 'promo', 'reduction', 'action'];
    dataSource: MatTableDataSource<ItemModel>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    users: UserModel[];
    showSpinner: boolean;

    constructor(public dialog: MatDialog, private userService: UserService, private itemService: ItemService) {
    }

    ngOnInit(): void {
        this.getItems();
        this.getAllUsers();
    }

    getItems() {
        this.showSpinner = true;
        this.itemService.getItems()
            .pipe(finalize(() => this.showSpinner = false))
            .subscribe((values: any) => {
                this.items = values._embedded.items;
                this.dataSource = new MatTableDataSource(this.items);
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
            data: {order: order}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                this.getItems();
            }
        });
    }

    toggleSidebar(contactsMainSidebar: string) {

    }

    showAddItem() {
        const dialogRef = this.dialog.open(AddItemComponent, {
            panelClass: 'item-dialog',
            data: {users: this.users}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                this.getItems();
            }
        });
    }

    showEditItem(item: ItemModel) {
        console.log(item);
        const dialogRef = this.dialog.open(AddItemComponent, {
            panelClass: 'item-dialog',
            data: {users: this.users, item}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                this.getItems();
            }
        });
    }

    getAllUsers() {
        this.userService.getAllUsers().subscribe(
            (users: any) => {
                this.users = users;
            },
            error => {
                console.log(error);
            }
        );
    }

    deleteItem(id: any) {
        this.showSpinner = true;
        this.itemService.delete(id)
            .pipe(finalize(() => this.showSpinner = false))
            .subscribe(
                value => {
                    this.getItems();
                },
                error1 => {
                }
            );
    }
}

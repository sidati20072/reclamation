import {UserModel} from './UserModel';
import {AddressModel} from './AddressModel';
import {OrderLineModel} from './OrderLineModel';
import {OrderType} from './OrderType';

export class OrderModel {

    id: number;
    resto: UserModel;
    livreur: UserModel;
    livreurId: string;
    addressId: string;
    address: AddressModel;
    client: UserModel;
    orderLines: OrderLineModel[];
    clientId: string;
    restoId: string;
    etat: string;
    type: OrderType;
    clientName: string;
    price: number;
    createAt: Date;
    reduction: number;
    deliveryPrice: number;
}

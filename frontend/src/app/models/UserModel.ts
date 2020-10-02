import {MediaModel} from './MediaModel';
import {AddressModel} from './AddressModel';
import {CategoryModel} from './CategoryModel';

export class UserModel {
    username: string;
    email: string;
    password: string;
    nom: string;
    prenom: string;
    civilite: string;
    tel: string;
    role: string;
    roles: any[];
    id: string;
    description: string;
    logo: MediaModel;
    medias: MediaModel[];
    address: AddressModel;
    active: boolean;
    nomResto: string;
    etat: boolean;
    reviewsCount: number;
    reviewsAvg: number;
    categories: CategoryModel[];
    unreadMessage: number;
    unreadNotification: number;
    userFbId;
    fideliteValue: number;
}

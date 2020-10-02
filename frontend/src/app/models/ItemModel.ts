import {CategoryModel} from './CategoryModel';
import {MediaModel} from './MediaModel';
import {UserModel} from './UserModel';

export class ItemModel {

      id: string;
      name: string;
      description: string;
      price: number;
      restoId: string;
      resto: UserModel;
      categoryId: number;
      category: CategoryModel;
      medias: MediaModel[];
      promo: boolean;
      reduction: number;
      reviewsAvg: number;
      reviewsCount: number;

}

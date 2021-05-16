import { Model } from 'objection';
import { UserRoleEnum } from '../enum/user-role.enum';
import { CardModel } from '../../cards/models/card.model';
import { ColumnModel } from '../../columns/models/column.model';

export class UserModel extends Model {
  id: string;
  username: string;
  password: string;
  role: UserRoleEnum;
  createdAt: Date;
  updatedAt: Date;

  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'uuid' },
        username: { type: 'string', minLength: 4, maxLength: 16 },
        password: { type: 'string', minLength: 4, maxLength: 16 },
        role: {
          type: 'user_role',
          enum: ['user', 'admin'],
          default: 'user',
        },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' },
      },
    };
  }

  static get relationMappings() {
    return {
      columns: {
        relation: Model.HasManyRelation,
        modelClass: ColumnModel,
        join: {
          from: 'users.id',
          to: 'columns.userId',
        },
      },

      cards: {
        relation: Model.HasManyRelation,
        modelClass: CardModel,
        join: {
          from: 'users.id',
          to: 'cards.userId',
        },
      },
    };
  }
}

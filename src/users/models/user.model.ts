import { Model } from 'objection';
import { Role } from '../enum/role.enum';
import { CardModel } from '../../cards/models/card.model';
import { ColumnModel } from '../../columns/models/column.model';

export class UserModel extends Model {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
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
        email: { type: 'string' },
        password: { type: 'string', minLength: 4, maxLength: 64 },
        role: {
          type: 'user_role',
          enum: ['admin', 'user', 'guest'],
          default: 'guest',
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

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    delete json.role;
    return json;
  }
}

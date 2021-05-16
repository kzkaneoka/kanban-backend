import { Model } from 'objection';
import { CardModel } from '../../cards/models/card.model';
import { UserModel } from '../../users/models/user.model';

export class ColumnModel extends Model {
  id: string;
  name: string;
  order: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  static get tableName() {
    return 'columns';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'uuid' },
        name: { type: 'string', minLength: 4, maxLength: 255 },
        order: { type: 'integer' },
        userId: { type: 'uuid' },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' },
      },
    };
  }

  static get relationMappings() {
    return {
      cards: {
        relation: Model.HasManyRelation,
        modelClass: CardModel,
        join: {
          from: 'columns.id',
          to: 'cards.columnId',
        },
      },

      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'columns.userId',
          to: 'users.id',
        },
      },
    };
  }
}

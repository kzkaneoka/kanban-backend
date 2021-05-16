import { Model } from 'objection';
import { ColumnModel } from 'src/columns/models/column.model';
import { CardStatusEnum } from '../enum/card-status.enum';
import { UserModel } from 'src/users/models/user.model';

export class CardModel extends Model {
  id: string;
  name: string;
  description: string;
  order: number;
  status: CardStatusEnum;
  userId: string;
  columnId: string;
  createdAt: Date;
  updatedAt: Date;

  static get tableName() {
    return 'cards';
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
        description: { type: 'string' },
        order: { type: 'integer' },
        status: {
          type: 'card_status',
          enum: ['todo', 'in_progress', 'done', 'archived'],
          default: 'todo',
        },
        userId: { type: 'uuid' },
        columnId: { type: 'uuid' },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'cards.userId',
          to: 'users.id',
        },
      },

      column: {
        relation: Model.BelongsToOneRelation,
        modelClass: ColumnModel,
        join: {
          from: 'cards.columnId',
          to: 'columns.id',
        },
      },
    };
  }
}

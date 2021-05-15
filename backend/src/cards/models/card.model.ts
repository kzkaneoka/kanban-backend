import { Model } from 'objection';
import { CardStatusEnum } from '../enum/card-status.enum';

export class CardModel extends Model {
  id: string;
  name: string;
  description: string;
  order: number;
  status: CardStatusEnum;
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
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 1 },
        order: { type: 'integer' },
        status: {
          type: 'card_status',
          enum: ['todo', 'in_progress', 'done', 'archived'],
          default: 'todo',
        },
        columnId: { type: 'uuid' },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' },
      },
    };
  }
}

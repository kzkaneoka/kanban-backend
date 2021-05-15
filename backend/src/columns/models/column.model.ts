import { Model } from 'objection';

export class ColumnModel extends Model {
  id: string;
  name: string;
  order: number;
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
        name: { type: 'string', minLength: 1, maxLength: 255 },
        order: { type: 'integer' },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' },
      },
    };
  }
}

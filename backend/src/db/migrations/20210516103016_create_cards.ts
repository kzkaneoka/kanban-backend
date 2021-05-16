import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('cards').then((exists) => {
    if (!exists) {
      return knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable('cards', (table) => {
          table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
          table.string('name').notNullable();
          table.string('description').notNullable();
          table.integer('order').notNullable();
          table
            .enu('status', ['todo', 'in_progress', 'done', 'archived'], {
              useNative: true,
              enumName: 'card_status',
            })
            .defaultTo('todo')
            .notNullable();
          table.uuid('user_id').references('users.id').notNullable();
          table.uuid('column_id').references('columns.id').notNullable();
          table.timestamps(true, true);
        });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('cards').raw('DROP TYPE card_status');
}

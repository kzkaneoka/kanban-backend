import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('columns').then((exists) => {
    if (!exists) {
      return knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable('columns', (table) => {
          table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
          table.string('name').notNullable();
          table.integer('order').notNullable();
          table.timestamps(true, true);
        });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('columns');
}

import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('columns').del();

  await knex('columns').insert([
    { name: 'column1', order: '1' },
    { name: 'column2', order: '2' },
    { name: 'column3', order: '3' },
  ]);
}

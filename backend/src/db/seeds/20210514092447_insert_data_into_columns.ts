import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('columns').del();

  await knex('columns').insert([
    { id: 'b02de89a-affe-4f7a-9473-bea67c104da8', name: 'column1', order: 1 },
    { id: '6d10075f-1647-43c0-901d-e48886470e60', name: 'column2', order: 2 },
    { id: '51ee5b59-7f12-4eb1-b0db-d3c66efd81b1', name: 'column3', order: 3 },
  ]);
}

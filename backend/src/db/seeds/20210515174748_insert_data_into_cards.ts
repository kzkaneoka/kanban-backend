import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('cards').del();

  await knex('cards').insert([
    {
      name: 'card1-1',
      description: 'card1 description1',
      order: 1,
      column_id: 'b02de89a-affe-4f7a-9473-bea67c104da8',
    },
    {
      name: 'card1-2',
      description: 'card1 description2',
      order: 2,
      column_id: 'b02de89a-affe-4f7a-9473-bea67c104da8',
    },
    {
      name: 'card1-3',
      description: 'card1 description3',
      order: 3,
      column_id: 'b02de89a-affe-4f7a-9473-bea67c104da8',
    },
    {
      name: 'card2-1',
      description: 'card2 description1',
      order: 1,
      column_id: '6d10075f-1647-43c0-901d-e48886470e60',
    },
    {
      name: 'card2-2',
      description: 'card2 description2',
      order: 2,
      column_id: '6d10075f-1647-43c0-901d-e48886470e60',
    },
    {
      name: 'card2-3',
      description: 'card2 description3',
      order: 3,
      column_id: '6d10075f-1647-43c0-901d-e48886470e60',
    },
    {
      name: 'card3-1',
      description: 'card3 description1',
      order: 1,
      column_id: '51ee5b59-7f12-4eb1-b0db-d3c66efd81b1',
    },
    {
      name: 'card3-2',
      description: 'card3 description2',
      order: 2,
      column_id: '51ee5b59-7f12-4eb1-b0db-d3c66efd81b1',
    },
    {
      name: 'card3-3',
      description: 'card3 description3',
      order: 3,
      column_id: '51ee5b59-7f12-4eb1-b0db-d3c66efd81b1',
    },
  ]);
}

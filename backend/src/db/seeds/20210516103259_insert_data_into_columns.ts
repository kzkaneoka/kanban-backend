import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('columns').del();

  await knex('columns').insert([
    {
      id: 'b02de89a-affe-4f7a-9473-bea67c104da8',
      name: 'column1',
      order: 1,
      user_id: '3f8ccd2a-28f2-4193-a8ff-df704663b3b2',
    },
    {
      id: '6d10075f-1647-43c0-901d-e48886470e60',
      name: 'column2',
      order: 2,
      user_id: '3f8ccd2a-28f2-4193-a8ff-df704663b3b2',
    },
    {
      id: '51ee5b59-7f12-4eb1-b0db-d3c66efd81b1',
      name: 'column3',
      order: 3,
      user_id: '3f8ccd2a-28f2-4193-a8ff-df704663b3b2',
    },

    {
      id: 'b15f753d-479f-4f83-baca-a46d03760459',
      name: 'column4',
      order: 4,
      user_id: 'ef860106-2201-4f92-85a2-907a9ff1e6f4',
    },
    {
      id: '36544566-c699-47ef-8c74-097213968478',
      name: 'column5',
      order: 5,
      user_id: 'ef860106-2201-4f92-85a2-907a9ff1e6f4',
    },
    {
      id: 'de870fcb-727f-4d66-8864-60e708b8ad14',
      name: 'column6',
      order: 6,
      user_id: 'ef860106-2201-4f92-85a2-907a9ff1e6f4',
    },

    {
      id: 'cc608132-0ba6-404e-a8d9-3f2dd46096ad',
      name: 'column7',
      order: 7,
      user_id: '0cbf8fcb-3f6d-437c-b965-78ed45e6a5f1',
    },
    {
      id: '8f34a622-39ec-467d-9426-258c4b648915',
      name: 'column8',
      order: 8,
      user_id: '0cbf8fcb-3f6d-437c-b965-78ed45e6a5f1',
    },
    {
      id: '7513bf74-90e1-4da9-9957-d145b25b6b3e',
      name: 'column9',
      order: 9,
      user_id: '0cbf8fcb-3f6d-437c-b965-78ed45e6a5f1',
    },
  ]);
}

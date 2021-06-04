import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  await knex('users').insert([
    {
      id: '2371216b-6494-4dc4-8c8c-abdc2cd079f3',
      username: 'admin',
      email: 'admin@kanban.com',
      password: '$2b$10$GnY6O7uVrIc8w9jzMNrPsuPJmtsgFBabq88ReyVyRDszDR5WwLyaK',
      role: 'admin',
    },
    {
      id: '3f8ccd2a-28f2-4193-a8ff-df704663b3b2',
      username: 'user1',
      email: 'user1@kanban.com',
      password: '$2b$10$h.tnVr7o/KcYo7GQejm45eyLUuabxOKza1.LAixv0gDHvxNhNafWe',
      role: 'user',
    },
    {
      id: 'ef860106-2201-4f92-85a2-907a9ff1e6f4',
      username: 'user2',
      email: 'user2@kanban.com',
      password: '$2b$10$LrDYSKmzC1Hw4oAudcFyQurodtxF.cekYSXBSdaQDAkkG/2T3h46.',
      role: 'user',
    },
    {
      id: '0cbf8fcb-3f6d-437c-b965-78ed45e6a5f1',
      username: 'user3',
      email: 'user3@kanban.com',
      password: '2b$10$i9LwRKQIplYyvZSuVSc.he6g5mEjr9DWiz1IuthN6QwUL6lKcK9.y',
      role: 'user',
    },
  ]);
}

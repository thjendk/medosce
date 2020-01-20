import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('roles', (t) => {
    t.increments('role_id');
    t.string('name').unique();
  });

  const roles = ['admin', 'user'];
  for (let role of roles) {
    await knex('roles').insert({ name: role });
  }

  return 0; // Success
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('roles');
}

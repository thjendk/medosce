import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('parameters', (t) => {
    t.increments('parameter_id');
    t.string('name').unique();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('parameters');
}

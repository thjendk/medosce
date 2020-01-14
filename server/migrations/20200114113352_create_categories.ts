import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('categories', (t) => {
    t.increments('category_id');
    t.string('name');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('categories');
}

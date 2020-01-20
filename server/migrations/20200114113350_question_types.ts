import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('question_types', (t) => {
    t.increments('question_type_id');
    t.string('name').unique();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('question_types');
}

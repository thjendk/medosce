import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('exam_sets', (t) => {
    t.increments('exam_set_id');
    t.string('season');
    t.string('year', 4);
    t.unique(['season', 'year']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('exam_sets');
}

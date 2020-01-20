import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('stations', (t) => {
    t.increments('station_id');
    t.text('intro');
    t.integer('global_score');
    t.integer('station_number');
    t.integer('exam_set_id')
      .unsigned()
      .references('exam_sets.exam_set_id')
      .onDelete('cascade')
      .onDelete('cascade');
    t.unique(['station_number', 'exam_set_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('stations');
}

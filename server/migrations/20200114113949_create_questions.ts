import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('questions', (t) => {
    t.increments('question_id');
    t.integer('station_id')
      .unsigned()
      .references('stations.station_id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.integer('question_number');
    t.text('text');
    t.unique(['station_id', 'question_number']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('questions');
}

import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('question_parameters', (t) => {
    t.increments('question_parameter_id');
    t.integer('question_id')
      .unsigned()
      .references('questions.question_id')
      .onUpdate('cascade')
      .onDelete('cascade');
    t.integer('parameter_id')
      .unsigned()
      .references('parameters.parameter_id')
      .onDelete('cascade')
      .onDelete('cascade');
    t.text('value');
    t.float('point');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('question_parameters');
}

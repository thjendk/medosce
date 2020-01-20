import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('questions_question_types', (t) => {
    t.integer('question_type_id')
      .unsigned()
      .references('question_types.question_type_id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.integer('question_id')
      .unsigned()
      .references('questions.question_id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.primary(['question_type_id', 'question_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('questions_question_type');
}

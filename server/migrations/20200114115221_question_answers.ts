import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('question_answers', (t) => {
    t.increments('question_answer_id');
    t.integer('question_id')
      .unsigned()
      .references('questions.question_id')
      .onUpdate('cascade')
      .onDelete('cascade');
    t.text('value');
    t.float('point');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('question_answers');
}

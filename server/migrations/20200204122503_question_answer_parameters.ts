import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('question_answer_parameter_votes', (t) => {
    t.integer('question_answer_id')
      .unsigned()
      .references('question_answers.question_answer_id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.integer('parameter_id')
      .unsigned()
      .references('parameters.parameter_id')
      .onUpdate('cascade')
      .onDelete('cascade');
    t.integer('user_id')
      .unsigned()
      .references('users.user_id')
      .onUpdate('cascade')
      .onDelete('cascade');
    t.integer('vote', 1);
    t.primary(['question_answer_id', 'parameter_id', 'user_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('question_answer_parameter_votes');
}

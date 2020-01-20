import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('answers', (t) => {
    t.increments('answer_id');
    t.text('text');
    t.integer('parameter_id')
      .unsigned()
      .references('parameters.parameter_id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.integer('question_id')
      .unsigned()
      .references('questions.question_id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.integer('user_id')
      .unsigned()
      .references('users.user_id')
      .onDelete('cascade')
      .onUpdate('cascade');
  });
}

export async function down(knex: Knex): Promise<any> {}

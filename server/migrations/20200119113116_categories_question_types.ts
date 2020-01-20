import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('categories_question_types', (t) => {
    t.integer('category_id')
      .unsigned()
      .references('categories.category_id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.integer('question_type_id')
      .unsigned()
      .references('question_types.question_type_id')
      .onUpdate('cascade')
      .onUpdate('cascade');
    t.primary(['category_id', 'question_type_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('categories_question_types');
}

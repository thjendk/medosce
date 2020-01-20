import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('parameters_categories', (t) => {
    t.integer('parameter_id')
      .unsigned()
      .references('parameters.parameter_id')
      .onUpdate('cascade')
      .onDelete('cascade');
    t.integer('category_id')
      .unsigned()
      .references('categories.category_id')
      .onUpdate('cascade')
      .onDelete('cascade');
    t.primary(['parameter_id', 'category_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('parameters_categories');
}

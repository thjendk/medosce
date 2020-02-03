import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('categories', (t) => {
    t.increments('category_id');
    t.string('name').unique();
    t.integer('parent_id')
      .unsigned()
      .references('categories.category_id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.string('icon_name');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('categories');
}

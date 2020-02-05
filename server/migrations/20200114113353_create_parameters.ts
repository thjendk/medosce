import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('parameters', (t) => {
    t.increments('parameter_id');
    t.string('name');
    t.integer('parent_id')
      .unsigned()
      .references('parameters.parameter_id')
      .onUpdate('cascade')
      .onDelete('cascade');
    t.unique(['name', 'parent_id']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('parameters');
}

import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('parameter_suggestions', (t) => {
    t.increments('parameter_suggestion_id');
    t.string('name');
    t.integer('is_forced_sub_menu', 1).defaultTo(0);
    t.integer('parent_id')
      .unsigned()
      .references('parameters.parameter_id')
      .onDelete('restrict')
      .onUpdate('restrict');
    t.integer('user_id')
      .unsigned()
      .references('users.user_id')
      .onDelete('cascade')
      .onUpdate('cascade');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('parameter_suggestions');
}

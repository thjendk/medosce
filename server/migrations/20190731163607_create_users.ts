import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', (t) => {
    t.increments('user_id');
    t.string('username')
      .notNullable()
      .unique();
    t.string('password').notNullable();
    t.string('email').unique();
    t.integer('role_id')
      .unsigned()
      .defaultTo(2)
      .references('roles.role_id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}

import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('comments', (t) => {
    t.increments('comment_id');
    t.text('text');
    t.integer('user_id')
      .unsigned()
      .references('users.user_id')
      .onDelete('cascade')
      .onUpdate('cascade');
    t.integer('station_id')
      .unsigned()
      .references('stations.station_id')
      .onDelete('cascade')
      .onUpdate('cascade');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('comments');
}

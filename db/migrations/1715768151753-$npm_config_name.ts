import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715768151753 implements MigrationInterface {
    name = ' $npmConfigName1715768151753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastname" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone_number" DROP DEFAULT`);
        await queryRunner.query(`CREATE VIEW "user_playlist" AS 
            SELECT "user".id AS user_id,
                   "user".firstname AS user_firstname,
                   playlist.id AS playlist_id,
                   playlist.name AS playlist_name
            FROM "user"
            LEFT OUTER JOIN playlist ON playlist.user_id = "user".id;
    `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","user_playlist","SELECT \"user\".id AS user_id,\n                   \"user\".firstname AS user_firstname,\n                   playlist.id AS playlist_id,\n                   playlist.name AS playlist_name\n            FROM \"user\"\n            LEFT OUTER JOIN playlist ON playlist.user_id = \"user\".id;"]);
        await queryRunner.query(`CREATE VIEW "artist_song" AS 
        SELECT
            artist.id AS artist_id,
            "user".firstname AS artist_name,
            song.id AS song_id,
            song.title AS song_name
        FROM artist
        INNER JOIN "user" ON artist.user_id = "user".id
        LEFT OUTER JOIN song_artist ON song_artist.artist_id = artist.id
        LEFT OUTER JOIN song ON song_artist.song_id = song.id;
    `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","artist_song","SELECT\n            artist.id AS artist_id,\n            \"user\".firstname AS artist_name,\n            song.id AS song_id,\n            song.title AS song_name\n        FROM artist\n        INNER JOIN \"user\" ON artist.user_id = \"user\".id\n        LEFT OUTER JOIN song_artist ON song_artist.artist_id = artist.id\n        LEFT OUTER JOIN song ON song_artist.song_id = song.id;"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","artist_song","public"]);
        await queryRunner.query(`DROP VIEW "artist_song"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","user_playlist","public"]);
        await queryRunner.query(`DROP VIEW "user_playlist"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone_number" SET DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastname" SET DEFAULT 'Unknown'`);
    }

}

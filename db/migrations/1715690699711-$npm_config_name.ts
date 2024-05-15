import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715690699711 implements MigrationInterface {
    name = ' $npmConfigName1715690699711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "song" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "releasedDate" date NOT NULL, "durationInSeconds" integer NOT NULL, "lyrics" character varying NOT NULL, CONSTRAINT "UQ_75669bae45c450fe7d011fad223" UNIQUE ("title"), CONSTRAINT "PK_baaa977f861cce6ff954ccee285" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "REL_3c2c776c0a094c15d6c165494c" UNIQUE ("userId"), CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "song_artist" ("song_id" integer NOT NULL, "artist_id" integer NOT NULL, CONSTRAINT "PK_2e63a82f9fe2673df783833e20a" PRIMARY KEY ("song_id", "artist_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e2922eba8171aa33e1821b9d63" ON "song_artist" ("song_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c9f491feec1deb8aeeccb7958" ON "song_artist" ("artist_id") `);
        await queryRunner.query(`CREATE TABLE "playlist_song" ("playlist_id" integer NOT NULL, "song_id" integer NOT NULL, CONSTRAINT "PK_a55ad75ae3d2148e4057e393bf2" PRIMARY KEY ("playlist_id", "song_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_404e93f5821bb1475c17b08882" ON "playlist_song" ("playlist_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bf47d280a95a3528ff25974300" ON "playlist_song" ("song_id") `);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_a95382384c5ba920429ba111211" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artist" ADD CONSTRAINT "FK_3c2c776c0a094c15d6c165494c0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "song_artist" ADD CONSTRAINT "FK_e2922eba8171aa33e1821b9d638" FOREIGN KEY ("song_id") REFERENCES "song"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "song_artist" ADD CONSTRAINT "FK_2c9f491feec1deb8aeeccb79588" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_song" ADD CONSTRAINT "FK_404e93f5821bb1475c17b08882a" FOREIGN KEY ("playlist_id") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlist_song" ADD CONSTRAINT "FK_bf47d280a95a3528ff259743005" FOREIGN KEY ("song_id") REFERENCES "song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist_song" DROP CONSTRAINT "FK_bf47d280a95a3528ff259743005"`);
        await queryRunner.query(`ALTER TABLE "playlist_song" DROP CONSTRAINT "FK_404e93f5821bb1475c17b08882a"`);
        await queryRunner.query(`ALTER TABLE "song_artist" DROP CONSTRAINT "FK_2c9f491feec1deb8aeeccb79588"`);
        await queryRunner.query(`ALTER TABLE "song_artist" DROP CONSTRAINT "FK_e2922eba8171aa33e1821b9d638"`);
        await queryRunner.query(`ALTER TABLE "artist" DROP CONSTRAINT "FK_3c2c776c0a094c15d6c165494c0"`);
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_a95382384c5ba920429ba111211"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf47d280a95a3528ff25974300"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_404e93f5821bb1475c17b08882"`);
        await queryRunner.query(`DROP TABLE "playlist_song"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c9f491feec1deb8aeeccb7958"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2922eba8171aa33e1821b9d63"`);
        await queryRunner.query(`DROP TABLE "song_artist"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
        await queryRunner.query(`DROP TABLE "song"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1715669136601 implements MigrationInterface {
    name = 'Test1715669136601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "logss" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "ip" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_c3fc20cc303560c4661f927f26d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "logss"`);
    }

}

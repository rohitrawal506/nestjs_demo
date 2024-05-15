import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715748931667 implements MigrationInterface {
    name = ' $npmConfigName1715748931667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}

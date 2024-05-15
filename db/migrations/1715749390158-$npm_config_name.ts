import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1715749390158 implements MigrationInterface {
    name = ' $npmConfigName1715749390158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "phone" TO "phoneNumber"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "phoneNumber" TO "phone"`);
    }

}

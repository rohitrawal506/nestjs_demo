import { MigrationInterface, QueryRunner } from "typeorm";

export class  User1715238599252 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query( 'CREATE TABLE users ( id INT AUTO_INCREMENT PRIMARY KEY,  name VARCHAR(255) NOT NULL,  email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL)')
     
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE user')
    }

}

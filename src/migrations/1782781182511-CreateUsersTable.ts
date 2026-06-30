import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1782781182511 implements MigrationInterface {
  name = 'CreateUsersTable1782781182511';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "email" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}

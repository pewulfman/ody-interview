import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDB1704839428801 implements MigrationInterface {
  name = 'CreateDB1704839428801';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "language" character varying NOT NULL, "countryOfOrigin" character varying NOT NULL, "countryOfDestination" character varying NOT NULL, "travelDateStart" TIMESTAMP NOT NULL, "travelDateEnd" TIMESTAMP NOT NULL, "partnerId" integer, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "partners" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_6b39bc13ab676e74eada2e744db" UNIQUE ("email"), CONSTRAINT "PK_998645b20820e4ab99aeae03b41" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients" ADD CONSTRAINT "FK_ffc59e15aa3e28042654e26867f" FOREIGN KEY ("partnerId") REFERENCES "partners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients" DROP CONSTRAINT "FK_ffc59e15aa3e28042654e26867f"`,
    );
    await queryRunner.query(`DROP TABLE "partners"`);
    await queryRunner.query(`DROP TABLE "clients"`);
  }
}

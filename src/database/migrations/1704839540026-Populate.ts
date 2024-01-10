import { MigrationInterface, QueryRunner } from 'typeorm';

export class Populate1704839540026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add Partner 1
    await queryRunner.query(
      `INSERT INTO "partners" ("name", "description", "email", "password") VALUES ('Partner 1', 'Partner 1 description', 'tech@partner1.com', '$2a$12$eSxQuaFyjim6.9EKttnjROMUYybBAoroABVlRnN2wKHJsVH56zGB2')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "partners" WHERE "email" = 'tech@partner1.com'`,
    );
  }
}

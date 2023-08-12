import { MigrationInterface, QueryRunner } from "typeorm";

export class userCustomerOneToOne1691859746597 implements MigrationInterface {
    name = 'userCustomerOneToOne1691859746597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "REL_d72eb2a5bbff4f2533a5d4caff"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customer_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "customer_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "REL_d72eb2a5bbff4f2533a5d4caff" UNIQUE ("customer_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

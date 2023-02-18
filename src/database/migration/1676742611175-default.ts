import { MigrationInterface, QueryRunner } from "typeorm";

export class default1676742611175 implements MigrationInterface {
    name = 'default1676742611175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "calls" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "comment" character varying NOT NULL, "status" character varying NOT NULL, "priority" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_d9171d91f8dd1a649659f1b6a20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "calls" ADD CONSTRAINT "FK_c8fa72c7e9c20cf08aa141f8232" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calls" DROP CONSTRAINT "FK_c8fa72c7e9c20cf08aa141f8232"`);
        await queryRunner.query(`DROP TABLE "calls"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

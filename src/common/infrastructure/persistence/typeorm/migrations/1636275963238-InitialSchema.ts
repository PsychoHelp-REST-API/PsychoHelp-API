import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1636275963238 implements MigrationInterface {
    name = 'InitialSchema1636275963238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`psychologists\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(12) NOT NULL, \`description\` varchar(250) NOT NULL, UNIQUE INDEX \`UQ_customers_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_customers_dni\` ON \`psychologists\``);
        await queryRunner.query(`DROP TABLE \`psychologists\``);
    }

}

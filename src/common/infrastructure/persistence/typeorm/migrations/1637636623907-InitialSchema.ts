import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637636623907 implements MigrationInterface {
    name = 'InitialSchema1637636623907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`billings\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`patient_id\` bigint UNSIGNED NOT NULL, \`code\` varchar(8) NOT NULL, \`amount\` decimal(10,2) NOT NULL, \`description\` text NOT NULL, \`date\` date NULL, UNIQUE INDEX \`UQ_billings_code\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`patients\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(12) NOT NULL, UNIQUE INDEX \`UQ_patients_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`psychologists\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(12) NOT NULL, \`description\` varchar(250) NOT NULL, UNIQUE INDEX \`UQ_customers_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_customers_dni\` ON \`psychologists\``);
        await queryRunner.query(`DROP TABLE \`psychologists\``);
        await queryRunner.query(`DROP INDEX \`UQ_patients_dni\` ON \`patients\``);
        await queryRunner.query(`DROP TABLE \`patients\``);
        await queryRunner.query(`DROP INDEX \`UQ_billings_code\` ON \`billings\``);
        await queryRunner.query(`DROP TABLE \`billings\``);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637968122918 implements MigrationInterface {
    name = 'InitialSchema1637968122918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`accounts\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`number\` varchar(10) NOT NULL, \`balance\` decimal(10,2) NULL, \`currency\` varchar(3) NULL, \`psychologist_id\` bigint UNSIGNED NOT NULL, UNIQUE INDEX \`UQ_accounts_number\` (\`number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appointments\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` tinyint(2) UNSIGNED NOT NULL, \`patient_id_from\` bigint UNSIGNED NOT NULL, \`psychologist_id_to\` bigint UNSIGNED NULL, \`date\` datetime NULL, \`reason_consultation\` varchar(250) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`billings\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`patient_id\` bigint UNSIGNED NOT NULL, \`code\` varchar(8) NOT NULL, \`amount\` decimal(10,2) NOT NULL, \`description\` text NOT NULL, \`date\` date NULL, UNIQUE INDEX \`UQ_billings_code\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`logbooks\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`consultation_reason\` varchar(255) NULL, \`description\` varchar(50) NOT NULL, \`patient_id\` bigint UNSIGNED NOT NULL, UNIQUE INDEX \`UQ_logbook_id\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`patients\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(12) NOT NULL, UNIQUE INDEX \`UQ_patients_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payments\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` tinyint(2) UNSIGNED NOT NULL, \`account_id_to\` bigint UNSIGNED NULL, \`amount\` decimal(10,2) NULL, \`currency\` varchar(3) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`psychologists\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(12) NOT NULL, \`description\` varchar(250) NOT NULL, UNIQUE INDEX \`UQ_customers_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_customers_dni\` ON \`psychologists\``);
        await queryRunner.query(`DROP TABLE \`psychologists\``);
        await queryRunner.query(`DROP TABLE \`payments\``);
        await queryRunner.query(`DROP INDEX \`UQ_patients_dni\` ON \`patients\``);
        await queryRunner.query(`DROP TABLE \`patients\``);
        await queryRunner.query(`DROP INDEX \`UQ_logbook_id\` ON \`logbooks\``);
        await queryRunner.query(`DROP TABLE \`logbooks\``);
        await queryRunner.query(`DROP INDEX \`UQ_billings_code\` ON \`billings\``);
        await queryRunner.query(`DROP TABLE \`billings\``);
        await queryRunner.query(`DROP TABLE \`appointments\``);
        await queryRunner.query(`DROP INDEX \`UQ_accounts_number\` ON \`accounts\``);
        await queryRunner.query(`DROP TABLE \`accounts\``);
    }

}

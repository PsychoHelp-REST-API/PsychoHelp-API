import {MigrationInterface, QueryRunner} from "typeorm";

export class AppointmentSchema1637484430803 implements MigrationInterface {
    name = 'AppointmentSchema1637484430803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`appointments\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` tinyint(2) UNSIGNED NOT NULL, \`patient_id_from\` bigint UNSIGNED NOT NULL, \`psychologist_id_to\` bigint UNSIGNED NULL, \`date\` datetime NULL, \`reason_consultation\` varchar(250) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`patients\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(12) NOT NULL, UNIQUE INDEX \`UQ_patients_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`psychologists\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(12) NOT NULL, \`description\` varchar(250) NOT NULL, UNIQUE INDEX \`UQ_customers_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_customers_dni\` ON \`psychologists\``);
        await queryRunner.query(`DROP TABLE \`psychologists\``);
        await queryRunner.query(`DROP INDEX \`UQ_patients_dni\` ON \`patients\``);
        await queryRunner.query(`DROP TABLE \`patients\``);
        await queryRunner.query(`DROP TABLE \`appointments\``);
    }

}

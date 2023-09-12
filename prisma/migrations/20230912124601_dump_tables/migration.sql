-- CreateTable
CREATE TABLE `people` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(255) NOT NULL,
    `fullname` VARCHAR(191) NULL,
    `birthdate` DATETIME(3) NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `alternative_address` VARCHAR(191) NULL,
    `alternative_address_reference` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `marital_status` VARCHAR(191) NULL,
    `code_imobzi` VARCHAR(191) NULL,
    `profession` VARCHAR(191) NULL,
    `children` BIGINT NULL,
    `pets` BIGINT NULL,
    `kind_of_pet` VARCHAR(191) NULL,
    `anual_revenue` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `people_cpf_key`(`cpf`),
    UNIQUE INDEX `people_code_imobzi_key`(`code_imobzi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `person_id_representative` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `representative_type` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `organizations_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `buildings` (
    `id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `buildings_id_key`(`id`),
    UNIQUE INDEX `buildings_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `unit` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `building_id` BIGINT NOT NULL,
    `area` DECIMAL(65, 30) NULL,
    `bedroom` INTEGER NULL,
    `suite` INTEGER NULL,
    `garage` INTEGER NULL,
    `rental_value` DOUBLE NULL,
    `sale_value` DOUBLE NULL,
    `alternative_code` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `owners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_property` BIGINT NOT NULL,
    `id_owner_person` BIGINT NULL,
    `id_owner_organization` BIGINT NULL,
    `share` DECIMAL(65, 30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leases` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,
    `code_imobzi` VARCHAR(191) NULL,
    `start_at` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `property_id` BIGINT NOT NULL,
    `id_tenant_person` BIGINT NULL,
    `id_tenant_organization` BIGINT NULL,
    `main_guarantor` BIGINT NULL,
    `fee` DECIMAL(65, 30) NOT NULL,
    `guarantee_type` VARCHAR(191) NOT NULL,
    `guarantee_value` DECIMAL(65, 30) NULL,
    `annual_readjustment` VARCHAR(191) NULL,
    `irrf` BOOLEAN NOT NULL,
    `include_in_dimob` BOOLEAN NOT NULL,
    `indeterminate` BOOLEAN NOT NULL,
    `lease_value` DECIMAL(65, 30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_buildinng` BIGINT NULL,
    `id_organization` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lease_items` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `due_date` VARCHAR(191) NOT NULL,
    `decription` VARCHAR(191) NOT NULL,
    `management_fee` BOOLEAN NOT NULL,
    `recurrent` BOOLEAN NOT NULL,
    `repeat_total` INTEGER NULL,
    `value` DOUBLE NOT NULL,
    `until_due_date` BOOLEAN NOT NULL,
    `behavior` VARCHAR(191) NOT NULL,
    `autopay_on_due_date` BOOLEAN NOT NULL,
    `repeat_index` INTEGER NOT NULL,
    `include_in_dimob` BOOLEAN NOT NULL,
    `start_date` VARCHAR(191) NOT NULL,
    `lease_id` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `reference` DATETIME(3) NULL,
    `due_date` DATETIME(3) NOT NULL,
    `lease_id` BIGINT NOT NULL,
    `management_fee` DOUBLE NOT NULL,
    `invoice_url` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NULL,
    `bank_slip_url` VARCHAR(191) NULL,
    `bank_slip_id` VARCHAR(191) NULL,
    `total_value` DOUBLE NOT NULL,
    `interest_value` DOUBLE NOT NULL,
    `paid_at` DATETIME(3) NULL,
    `credit_at` DATETIME(3) NULL,
    `paid_manual` BOOLEAN NULL,
    `bank_fee_value` DOUBLE NULL,
    `account_credit` VARCHAR(191) NULL,
    `onlending_value` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices_items` (
    `id` VARCHAR(191) NOT NULL,
    `invoice_id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `behavior` VARCHAR(191) NOT NULL,
    `include_in_dimob` BOOLEAN NOT NULL,
    `management_feee` BOOLEAN NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beneficiaries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_lease` BIGINT NOT NULL,
    `id_beneficiary_person` BIGINT NULL,
    `id_beneficiary_organization` BIGINT NULL,
    `share` DECIMAL(65, 30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `updated_tables` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `updated_table` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `organizations` ADD CONSTRAINT `organizations_person_id_representative_fkey` FOREIGN KEY (`person_id_representative`) REFERENCES `people`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `buildings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owners` ADD CONSTRAINT `owners_id_property_fkey` FOREIGN KEY (`id_property`) REFERENCES `properties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owners` ADD CONSTRAINT `owners_id_owner_person_fkey` FOREIGN KEY (`id_owner_person`) REFERENCES `people`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owners` ADD CONSTRAINT `owners_id_owner_organization_fkey` FOREIGN KEY (`id_owner_organization`) REFERENCES `organizations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leases` ADD CONSTRAINT `leases_property_id_fkey` FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leases` ADD CONSTRAINT `leases_id_tenant_person_fkey` FOREIGN KEY (`id_tenant_person`) REFERENCES `people`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leases` ADD CONSTRAINT `leases_id_tenant_organization_fkey` FOREIGN KEY (`id_tenant_organization`) REFERENCES `organizations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leases` ADD CONSTRAINT `leases_main_guarantor_fkey` FOREIGN KEY (`main_guarantor`) REFERENCES `people`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leases` ADD CONSTRAINT `leases_id_buildinng_fkey` FOREIGN KEY (`id_buildinng`) REFERENCES `buildings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leases` ADD CONSTRAINT `leases_id_organization_fkey` FOREIGN KEY (`id_organization`) REFERENCES `organizations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lease_items` ADD CONSTRAINT `lease_items_lease_id_fkey` FOREIGN KEY (`lease_id`) REFERENCES `leases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_lease_id_fkey` FOREIGN KEY (`lease_id`) REFERENCES `leases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices_items` ADD CONSTRAINT `invoices_items_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beneficiaries` ADD CONSTRAINT `beneficiaries_id_lease_fkey` FOREIGN KEY (`id_lease`) REFERENCES `leases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beneficiaries` ADD CONSTRAINT `beneficiaries_id_beneficiary_person_fkey` FOREIGN KEY (`id_beneficiary_person`) REFERENCES `people`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beneficiaries` ADD CONSTRAINT `beneficiaries_id_beneficiary_organization_fkey` FOREIGN KEY (`id_beneficiary_organization`) REFERENCES `organizations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

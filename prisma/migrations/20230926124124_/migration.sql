-- CreateTable
CREATE TABLE `people` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_imobzi` VARCHAR(191) NOT NULL,
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
    `children` INTEGER NULL,
    `pets` INTEGER NULL,
    `kind_of_pet` VARCHAR(191) NULL,
    `anual_revenue` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `people_id_imobzi_key`(`id_imobzi`),
    UNIQUE INDEX `people_cpf_key`(`cpf`),
    UNIQUE INDEX `people_code_imobzi_key`(`code_imobzi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_imobzi` VARCHAR(191) NOT NULL,
    `id_person_representative` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `representative_type` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `organizations_id_imobzi_key`(`id_imobzi`),
    UNIQUE INDEX `organizations_cnpj_key`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `buildings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_imobzi` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `buildings_id_imobzi_key`(`id_imobzi`),
    UNIQUE INDEX `buildings_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_imobzi` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `id_building_imobzi` VARCHAR(191) NOT NULL,
    `area` DOUBLE NULL,
    `bedroom` INTEGER NULL,
    `suite` INTEGER NULL,
    `garage` INTEGER NULL,
    `rental_value` DOUBLE NULL,
    `sale_value` DOUBLE NULL,
    `alternative_code` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `properties_id_imobzi_key`(`id_imobzi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `owners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_property_imobzi` VARCHAR(191) NOT NULL,
    `id_owner_person_imobzi` VARCHAR(191) NULL,
    `id_owner_organization_imobzi` VARCHAR(191) NULL,
    `share` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_imobzi` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `code_imobzi` VARCHAR(191) NULL,
    `start_at` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `id_property_imobzi` VARCHAR(191) NOT NULL,
    `id_tenant_person_imobzi` VARCHAR(191) NULL,
    `id_tenant_organization_imobzi` VARCHAR(191) NULL,
    `id_main_guarantor_imobzi` VARCHAR(191) NULL,
    `fee` DOUBLE NOT NULL,
    `guarantee_type` VARCHAR(191) NOT NULL,
    `guarantee_value` DOUBLE NULL,
    `id_annual_readjustment_imobzi` VARCHAR(191) NULL,
    `irrf` BOOLEAN NOT NULL,
    `include_in_dimob` BOOLEAN NOT NULL,
    `indeterminate` BOOLEAN NOT NULL,
    `lease_value` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `leases_id_imobzi_key`(`id_imobzi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lease_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `due_date` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
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
    `id_lease_imobzi` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `reference_start_at` VARCHAR(191) NULL,
    `reference_end_at` VARCHAR(191) NULL,
    `due_date` VARCHAR(191) NOT NULL,
    `id_imobzi` VARCHAR(191) NOT NULL,
    `id_lease_imobzi` VARCHAR(191) NOT NULL,
    `management_fee` DOUBLE NOT NULL,
    `invoice_url` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NULL,
    `bank_slip_url` VARCHAR(191) NULL,
    `bank_slip_id` VARCHAR(191) NULL,
    `total_value` DOUBLE NOT NULL,
    `interest_value` DOUBLE NOT NULL,
    `paid_at` VARCHAR(191) NULL,
    `credit_at` VARCHAR(191) NULL,
    `paid_manual` BOOLEAN NULL,
    `bank_fee_value` DOUBLE NULL,
    `account_credit` VARCHAR(191) NULL,
    `onlending_value` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `invoices_id_imobzi_key`(`id_imobzi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices_items` (
    `id_imobzi` VARCHAR(191) NOT NULL,
    `id_invoice_imobzi` VARCHAR(191) NOT NULL,
    `item_type` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `behavior` VARCHAR(191) NOT NULL,
    `include_in_dimob` BOOLEAN NOT NULL,
    `management_fee` BOOLEAN NOT NULL,
    `value` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_imobzi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beneficiaries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_lease_imobzi` VARCHAR(191) NOT NULL,
    `id_beneficiary_person_imobzi` VARCHAR(191) NULL,
    `id_beneficiary_organization_imobzi` VARCHAR(191) NULL,
    `share` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReadjustmentIndex` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_index_readjustment_imobzi` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

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
ALTER TABLE `organizations` ADD CONSTRAINT `organizations_id_person_representative_fkey` FOREIGN KEY (`id_person_representative`) REFERENCES `people`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_id_building_imobzi_fkey` FOREIGN KEY (`id_building_imobzi`) REFERENCES `buildings`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owners` ADD CONSTRAINT `owners_id_property_imobzi_fkey` FOREIGN KEY (`id_property_imobzi`) REFERENCES `properties`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owners` ADD CONSTRAINT `owners_id_owner_person_imobzi_fkey` FOREIGN KEY (`id_owner_person_imobzi`) REFERENCES `people`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owners` ADD CONSTRAINT `owners_id_owner_organization_imobzi_fkey` FOREIGN KEY (`id_owner_organization_imobzi`) REFERENCES `organizations`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leases` ADD CONSTRAINT `leases_id_property_imobzi_fkey` FOREIGN KEY (`id_property_imobzi`) REFERENCES `properties`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leases` ADD CONSTRAINT `leases_id_tenant_person_imobzi_fkey` FOREIGN KEY (`id_tenant_person_imobzi`) REFERENCES `people`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leases` ADD CONSTRAINT `leases_id_tenant_organization_imobzi_fkey` FOREIGN KEY (`id_tenant_organization_imobzi`) REFERENCES `organizations`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leases` ADD CONSTRAINT `leases_id_main_guarantor_imobzi_fkey` FOREIGN KEY (`id_main_guarantor_imobzi`) REFERENCES `people`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lease_items` ADD CONSTRAINT `lease_items_id_lease_imobzi_fkey` FOREIGN KEY (`id_lease_imobzi`) REFERENCES `leases`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_id_lease_imobzi_fkey` FOREIGN KEY (`id_lease_imobzi`) REFERENCES `leases`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices_items` ADD CONSTRAINT `invoices_items_id_invoice_imobzi_fkey` FOREIGN KEY (`id_invoice_imobzi`) REFERENCES `invoices`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beneficiaries` ADD CONSTRAINT `beneficiaries_id_lease_imobzi_fkey` FOREIGN KEY (`id_lease_imobzi`) REFERENCES `leases`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beneficiaries` ADD CONSTRAINT `beneficiaries_id_beneficiary_person_imobzi_fkey` FOREIGN KEY (`id_beneficiary_person_imobzi`) REFERENCES `people`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beneficiaries` ADD CONSTRAINT `beneficiaries_id_beneficiary_organization_imobzi_fkey` FOREIGN KEY (`id_beneficiary_organization_imobzi`) REFERENCES `organizations`(`id_imobzi`) ON DELETE CASCADE ON UPDATE CASCADE;

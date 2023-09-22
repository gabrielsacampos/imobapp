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
    `anual_revenue` DECIMAL(65, 30) NULL,
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
    `person_id_representative` INTEGER NOT NULL,
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
    `id` INTEGER NOT NULL,
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
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unit` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `building_id` INTEGER NOT NULL,
    `area` DECIMAL(65, 30) NULL,
    `bedroom` INTEGER NULL,
    `suite` INTEGER NULL,
    `garage` INTEGER NULL,
    `rental_value` DECIMAL(65, 30) NULL,
    `sale_value` DECIMAL(65, 30) NULL,
    `alternative_code` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `owners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_property` INTEGER NOT NULL,
    `id_owner_person` INTEGER NULL,
    `id_owner_organization` INTEGER NULL,
    `share` DECIMAL(65, 30) NOT NULL,
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
    `property_id` INTEGER NOT NULL,
    `id_tenant_person` INTEGER NULL,
    `id_tenant_organization` INTEGER NULL,
    `main_guarantor` INTEGER NULL,
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
    `value` DECIMAL(65, 30) NOT NULL,
    `until_due_date` BOOLEAN NOT NULL,
    `behavior` VARCHAR(191) NOT NULL,
    `autopay_on_due_date` BOOLEAN NOT NULL,
    `repeat_index` INTEGER NOT NULL,
    `include_in_dimob` BOOLEAN NOT NULL,
    `start_date` VARCHAR(191) NOT NULL,
    `lease_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NULL,
    `due_date` VARCHAR(191) NOT NULL,
    `lease_id` INTEGER NOT NULL,
    `management_fee` DECIMAL(65, 30) NOT NULL,
    `invoice_url` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NULL,
    `bank_slip_url` VARCHAR(191) NULL,
    `bank_slip_id` VARCHAR(191) NULL,
    `total_value` DECIMAL(65, 30) NOT NULL,
    `interest_value` DECIMAL(65, 30) NOT NULL,
    `paid_at` VARCHAR(191) NULL,
    `credit_at` VARCHAR(191) NULL,
    `paid_manual` BOOLEAN NULL,
    `bank_fee_value` DECIMAL(65, 30) NULL,
    `account_credit` VARCHAR(191) NULL,
    `onlending_value` DECIMAL(65, 30) NULL,
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
    `management_fee` BOOLEAN NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beneficiaries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_lease` INTEGER NOT NULL,
    `id_beneficiary_person` INTEGER NULL,
    `id_beneficiary_organization` INTEGER NULL,
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

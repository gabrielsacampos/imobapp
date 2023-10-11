-- CreateTable
CREATE TABLE "people" (
    "id" SERIAL NOT NULL,
    "id_imobzi" TEXT NOT NULL,
    "cpf" VARCHAR(255),
    "fullname" TEXT,
    "birthdate" TIMESTAMP(3),
    "email" VARCHAR(255),
    "phone" VARCHAR(255),
    "alternative_address" TEXT,
    "alternative_address_reference" TEXT,
    "gender" TEXT,
    "marital_status" TEXT,
    "code_imobzi" TEXT,
    "profession" TEXT,
    "children" INTEGER,
    "pets" INTEGER,
    "kind_of_pet" TEXT,
    "anual_revenue" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "id_imobzi" TEXT NOT NULL,
    "id_person_representative" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "representative_type" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buildings" (
    "id" SERIAL NOT NULL,
    "id_imobzi" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buildings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" SERIAL NOT NULL,
    "id_imobzi" TEXT NOT NULL,
    "property_block" TEXT,
    "unit" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "id_building_imobzi" TEXT NOT NULL,
    "area" DOUBLE PRECISION,
    "bedroom" INTEGER,
    "suite" INTEGER,
    "garage" INTEGER,
    "rental_value" DOUBLE PRECISION,
    "sale_value" DOUBLE PRECISION,
    "alternative_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owners" (
    "id" SERIAL NOT NULL,
    "id_property_imobzi" TEXT NOT NULL,
    "id_owner_person_imobzi" TEXT,
    "id_owner_organization_imobzi" TEXT,
    "share" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leases" (
    "id" SERIAL NOT NULL,
    "id_imobzi" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "code_imobzi" TEXT,
    "start_at" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "id_property_imobzi" TEXT NOT NULL,
    "id_tenant_person_imobzi" TEXT,
    "id_tenant_organization_imobzi" TEXT,
    "id_main_guarantor_imobzi" TEXT,
    "fee" DOUBLE PRECISION NOT NULL,
    "guarantee_type" TEXT,
    "guarantee_value" DOUBLE PRECISION,
    "id_annual_readjustment_imobzi" TEXT,
    "irrf" BOOLEAN NOT NULL,
    "include_in_dimob" BOOLEAN NOT NULL,
    "indeterminate" BOOLEAN NOT NULL,
    "lease_value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lease_items" (
    "id" SERIAL NOT NULL,
    "due_date" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "management_fee" BOOLEAN NOT NULL,
    "recurrent" BOOLEAN NOT NULL,
    "repeat_total" INTEGER,
    "value" DOUBLE PRECISION NOT NULL,
    "until_due_date" BOOLEAN NOT NULL,
    "behavior" TEXT NOT NULL,
    "repeat_index" INTEGER NOT NULL,
    "include_in_dimob" BOOLEAN NOT NULL,
    "start_date" TIMESTAMP(3),
    "id_lease_imobzi" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lease_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id_imobzi" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "reference_start_at" TEXT,
    "reference_end_at" TEXT,
    "due_date" TIMESTAMP(3) NOT NULL,
    "id_lease_imobzi" TEXT NOT NULL,
    "management_fee" DOUBLE PRECISION NOT NULL,
    "invoice_url" TEXT NOT NULL,
    "barcode" TEXT,
    "bank_slip_url" TEXT,
    "bank_slip_id" TEXT,
    "total_value" DOUBLE PRECISION NOT NULL,
    "interest_value" DOUBLE PRECISION NOT NULL,
    "paid_at" TIMESTAMP(3),
    "credit_at" TEXT,
    "paid_manual" BOOLEAN,
    "bank_fee_value" DOUBLE PRECISION,
    "account_credit" TEXT,
    "onlending_value" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id_imobzi")
);

-- CreateTable
CREATE TABLE "invoices_items" (
    "id_imobzi" TEXT NOT NULL,
    "id_invoice_imobzi" TEXT NOT NULL,
    "until_due_date" BOOLEAN NOT NULL,
    "item_type" TEXT,
    "description" TEXT NOT NULL,
    "behavior" TEXT NOT NULL,
    "include_in_dimob" BOOLEAN NOT NULL,
    "management_fee" BOOLEAN NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_items_pkey" PRIMARY KEY ("id_imobzi")
);

-- CreateTable
CREATE TABLE "beneficiaries" (
    "id" SERIAL NOT NULL,
    "id_lease_imobzi" TEXT NOT NULL,
    "id_beneficiary_person_imobzi" TEXT,
    "id_beneficiary_organization_imobzi" TEXT,
    "share" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beneficiaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "readjustment_indexes" (
    "id" SERIAL NOT NULL,
    "id_index_readjustment_imobzi" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "readjustment_indexes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webhooks" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "id_entity_imobzi" TEXT NOT NULL,

    CONSTRAINT "webhooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "people_id_imobzi_key" ON "people"("id_imobzi");

-- CreateIndex
CREATE UNIQUE INDEX "people_cpf_key" ON "people"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "people_code_imobzi_key" ON "people"("code_imobzi");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_id_imobzi_key" ON "organizations"("id_imobzi");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_cnpj_key" ON "organizations"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "buildings_id_imobzi_key" ON "buildings"("id_imobzi");

-- CreateIndex
CREATE UNIQUE INDEX "buildings_name_key" ON "buildings"("name");

-- CreateIndex
CREATE UNIQUE INDEX "properties_id_imobzi_key" ON "properties"("id_imobzi");

-- CreateIndex
CREATE UNIQUE INDEX "leases_id_imobzi_key" ON "leases"("id_imobzi");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_id_imobzi_key" ON "invoices"("id_imobzi");

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_id_person_representative_fkey" FOREIGN KEY ("id_person_representative") REFERENCES "people"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_id_building_imobzi_fkey" FOREIGN KEY ("id_building_imobzi") REFERENCES "buildings"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owners" ADD CONSTRAINT "owners_id_owner_organization_imobzi_fkey" FOREIGN KEY ("id_owner_organization_imobzi") REFERENCES "organizations"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owners" ADD CONSTRAINT "owners_id_owner_person_imobzi_fkey" FOREIGN KEY ("id_owner_person_imobzi") REFERENCES "people"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owners" ADD CONSTRAINT "owners_id_property_imobzi_fkey" FOREIGN KEY ("id_property_imobzi") REFERENCES "properties"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leases" ADD CONSTRAINT "leases_id_main_guarantor_imobzi_fkey" FOREIGN KEY ("id_main_guarantor_imobzi") REFERENCES "people"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leases" ADD CONSTRAINT "leases_id_property_imobzi_fkey" FOREIGN KEY ("id_property_imobzi") REFERENCES "properties"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leases" ADD CONSTRAINT "leases_id_tenant_organization_imobzi_fkey" FOREIGN KEY ("id_tenant_organization_imobzi") REFERENCES "organizations"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leases" ADD CONSTRAINT "leases_id_tenant_person_imobzi_fkey" FOREIGN KEY ("id_tenant_person_imobzi") REFERENCES "people"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lease_items" ADD CONSTRAINT "lease_items_id_lease_imobzi_fkey" FOREIGN KEY ("id_lease_imobzi") REFERENCES "leases"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_id_lease_imobzi_fkey" FOREIGN KEY ("id_lease_imobzi") REFERENCES "leases"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices_items" ADD CONSTRAINT "invoices_items_id_invoice_imobzi_fkey" FOREIGN KEY ("id_invoice_imobzi") REFERENCES "invoices"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiaries" ADD CONSTRAINT "beneficiaries_id_beneficiary_organization_imobzi_fkey" FOREIGN KEY ("id_beneficiary_organization_imobzi") REFERENCES "organizations"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiaries" ADD CONSTRAINT "beneficiaries_id_beneficiary_person_imobzi_fkey" FOREIGN KEY ("id_beneficiary_person_imobzi") REFERENCES "people"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiaries" ADD CONSTRAINT "beneficiaries_id_lease_imobzi_fkey" FOREIGN KEY ("id_lease_imobzi") REFERENCES "leases"("id_imobzi") ON DELETE CASCADE ON UPDATE CASCADE;

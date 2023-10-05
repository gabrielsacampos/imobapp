-- AlterTable
ALTER TABLE `organizations` MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `people` MODIFY `cpf` VARCHAR(255) NULL,
    MODIFY `email` VARCHAR(255) NULL,
    MODIFY `phone` VARCHAR(255) NULL;

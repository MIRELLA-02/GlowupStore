-- CreateTable
CREATE TABLE `cosmeticos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `preco` DECIMAL(65, 30) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventRegistrants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `eventId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EventRegistrants`
ADD CONSTRAINT `EventRegistrants_eventId_fkey`
FOREIGN KEY (`eventId`) REFERENCES `Events`(`id`)
ON DELETE RESTRICT
ON UPDATE CASCADE;

CREATE TABLE "ISL" (
  "islId" serial NOT NULL,
  "satelliteId" int NOT NULL,
  "connectIslId" int, -- can be null
  "satAzimuth" float, --decimal(10,2)?
  "satElevation" float,
  "lazerAzimuth" float,
  "lazerElevation" float,
  "lazerRange" float,
  PRIMARY KEY ("islId"),
  FOREIGN KEY ("satelliteId") REFERENCES "Satellite"("satelliteId") ON DELETE CASCADE ON UPDATE NO ACTION,
  FOREIGN KEY ("connectIslId") REFERENCES "ISL"("islId") ON DELETE SET NULL ON UPDATE NO ACTION -- Assuming ISL can be connected to other ISLs
);


-- ALTER TABLE `ISL`
-- ADD COLUMN `connectionStrategy` varchar(255) DEFAULT NULL;
-- ALTER TABLE ISL DROP COLUMN connectionStrategy;
-- select * from ISL
CREATE TABLE "CPL" (
  "colId" serial NOT NULL ,
  "satelliteId" int NOT NULL,
  "viewAngle" float,
  "beamAngle" float,
  "beamCount" int,
  "bandwidth" float,
  
  PRIMARY KEY ("cplId"),
  FOREIGN KEY ("satelliteId") REFERENCES "Satellite"("satelliteId") ON DELETE CASCADE ON UPDATE NO ACTION
);
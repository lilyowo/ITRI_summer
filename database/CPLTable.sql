CREATE TABLE "CPL" (
  "cplId" serial NOT NULL ,
  "satelliteId" int NOT NULL,
  "AccessViewAngle" float,
  "AccessBeamAngle" float,
  "AccessBeamCount" int,
  "AccessBandwidth" float,
  "FeederViewAngle" float,
  "FeederBeamAngle" float,
  "FeederBeamCount" int,
  "FeederBandwidth" float,
  
  PRIMARY KEY ("cplId"),
  FOREIGN KEY ("satelliteId") REFERENCES "Satellite"("satelliteId") ON DELETE CASCADE ON UPDATE NO ACTION
);
CREATE TABLE "GroundStation" (
  "gsId" serial NOT NULL ,
  "cellId" int NOT NULL,
  "connectedSatId" int, -- 可能沒連到 所以可NULL
  "type" int,-- 0 UT, 1 FT
  "latitude" float,
  "longitude" float,
  "altitude" float,
  "acceptElevation" float,
  PRIMARY KEY ("gsId"),
  FOREIGN KEY ("cellId") REFERENCES "Cell"("cellId") ON DELETE CASCADE ON UPDATE NO ACTION,
  FOREIGN KEY ("connectedSatId") REFERENCES "Satellite"("satelliteId") ON DELETE SET NULL ON UPDATE NO ACTION
);
CREATE TABLE "Cell" (
  "cellId" serial NOT NULL ,
  "constellationId" int NOT NULL,
  "centerLatitude" float,
  "centerLongitude" float,
  "radius" float,
  PRIMARY KEY ("cellId"),
  FOREIGN KEY ("constellationId") REFERENCES "Constellation"("constellationId") ON DELETE CASCADE ON UPDATE NO ACTION
);
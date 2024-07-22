CREATE TABLE "Plane" (
  "planeId" serial NOT NULL ,
  "constellationId" int NOT NULL,
  "inclination" float,
  "raan" float,
  "eccentricity" float,
  "arg_pe" float,
  "altitude" float,
  PRIMARY KEY ("planeId"),
  FOREIGN KEY ("constellationId") REFERENCES "Constellation"("constellationId") ON DELETE CASCADE ON UPDATE NO ACTION
);


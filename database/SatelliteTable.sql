CREATE TABLE "Satellite" (
  "satelliteId" serial NOT NULL,
  "planeId" int NOT NULL,
  "satName" varchar(255),
  "serverSatId" int,
  "serverPlaneId" int,
  "latitude" float,
  "longitude" float,
  "altitude" float,
  "meanAnomaly" float,
  "meanMotion" float,
  "mass" float,
  PRIMARY KEY ("satelliteId"),
  FOREIGN KEY ("planeId") REFERENCES "Plane"("planeId") ON DELETE CASCADE ON UPDATE NO ACTION
);


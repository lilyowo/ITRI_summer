CREATE TABLE "Satellite" (
  "satelliteId" serial NOT NULL,
  "planeId" int NOT NULL,
  "latitude" float,
  "longitude" float,
  "altitude" float,
  "meanAnomaly" float,
  "meanMotion" float,
  "mass" float,
  "satName" varchar(255),
  PRIMARY KEY ("satelliteId"),
  FOREIGN KEY ("planeId") REFERENCES "Plane"("planeId") ON DELETE CASCADE ON UPDATE NO ACTION
);


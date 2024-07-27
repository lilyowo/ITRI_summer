CREATE TABLE "Constellation" (
  "constellationId" serial NOT NULL,
  "projectId" int NOT NULL,
  "constellationName" varchar(255) NOT NULL,
  PRIMARY KEY ("constellationId"),
  FOREIGN KEY ("projectId") REFERENCES "Project"("projectId") ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT "uniqueProjectConstellation" UNIQUE ("projectId", "constellationName") -- Ensures that within a single project, constellation names are unique
);


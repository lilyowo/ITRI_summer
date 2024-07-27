CREATE TABLE "SimulationConf" (
  "simulationConfId" serial NOT NULL ,
  "projectId" int NOT NULL,
  "simuSettings" JSONB,
  "simuItems" JSONB,
  PRIMARY KEY ("simulationConfId"),
  FOREIGN KEY ("projectId") REFERENCES "Project"("projectId") ON DELETE CASCADE ON UPDATE NO ACTION
);
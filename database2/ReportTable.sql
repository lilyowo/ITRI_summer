CREATE TABLE "Report" (
  "reportId" serial NOT NULL ,
  "projectId" int NOT NULL,
  "reportName" varchar(255),
  "constellationSettings" JSONB,
  "simuTime" timestamp,
  PRIMARY KEY ("reportId"),
  FOREIGN KEY ("projectId") REFERENCES "Project"("projectId") ON DELETE CASCADE ON UPDATE NO ACTION
);
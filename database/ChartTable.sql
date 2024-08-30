CREATE TABLE "Chart" (
  "chartId" serial NOT NULL ,
  "reportId" int NOT NULL,
  "dataTitle" text,
  "description" text,
  "image" bytea,
  "data" jsonb,
  PRIMARY KEY ("chartId"),
  FOREIGN KEY ("reportId") REFERENCES "Report"("reportId") ON DELETE CASCADE ON UPDATE NO ACTION
);
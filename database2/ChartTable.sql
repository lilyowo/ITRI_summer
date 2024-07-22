CREATE TABLE "Chart" (
  "chartId" serial NOT NULL ,
  "reportId" int NOT NULL,
  "description" text,
  "image" bytea,
  PRIMARY KEY ("chartId"),
  FOREIGN KEY ("reportId") REFERENCES "Report"("reportId") ON DELETE CASCADE ON UPDATE NO ACTION
);
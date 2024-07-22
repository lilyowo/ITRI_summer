CREATE TABLE "Beam" (
  "beamId" serial NOT NULL ,
  "cplId" int NOT NULL,
  "connectedCellId" int,
  "bandwidth" float,
  
  PRIMARY KEY ("beamId"),
  FOREIGN KEY ("cplId") REFERENCES "CPL"("cplId") ON DELETE CASCADE ON UPDATE NO ACTION,
  FOREIGN KEY ("connectedCellId") REFERENCES "Cell"("cellId") ON DELETE SET NULL ON UPDATE NO ACTION
);
CREATE TABLE "LoginHistory" (
  "historyId" serial NOT NULL,
  "userId" int NOT NULL,
  "timestamp" timestamp NOT NULL,
  PRIMARY KEY ("historyId"),
  FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE
);
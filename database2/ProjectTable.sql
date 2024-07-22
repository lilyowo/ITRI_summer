CREATE TABLE "Project" (
  "projectId" serial NOT NULL,
  "userId" int NOT NULL,
  "projectName" varchar(255) NOT NULL,
  PRIMARY KEY ("projectId"), 
  CONSTRAINT "uniqueUserProject" UNIQUE ("userId", "projectName"), -- Creates a unique constraint named unique_user_project on the combination of userId and projectName. This ensures that no two rows can have the same combination of userId and projectName, thus each user can only have one project with a given name.
  FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION
-- ON DELETE CASCADE: If a user is deleted from the User table, all related projects in the Project table will also be deleted.
-- ON UPDATE NO ACTION: If the userId in the User table is updated, no action will be taken in the Project table. This is actually the default behavior and is often omitted.
);

-- select * from project

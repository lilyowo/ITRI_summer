CREATE TABLE "User" (
  "userId" serial NOT NULL ,
  "isValid" BOOLEAN,
  "isAdmin" BOOLEAN,
  "username" varchar(255),
  "email" varchar(255),
  "password" BYTEA,
  "avatar" BYTEA,
  "level" int,
  PRIMARY KEY ("userId")
);

-- INSERT INTO "User" ("isValid", "isAdmin", "username", "email", "password", "avatar", "level")
-- VALUES 
--   (TRUE, TRUE, 'root', 'root@example.com', 'rootpassword', 'root_avatar.png', 10),
--   (TRUE, FALSE, 'mm', 'mm@example.com', 'mmpassword', 'mm_avatar.png', 1)
--   (TRUE, FALSE, 'hamster', 'h@xx.com', 'hpwd', 'hamster_avatar.png', 1);

-- select * from "User"; 
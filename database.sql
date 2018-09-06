CREATE DATABASE "tier_four";

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"first_name" TEXT NOT NULL,
	"last_name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"active" BOOLEAN NOT NULL,
	"github" TEXT NOT NULL,
	"queued_for_next_challenge" BOOLEAN NOT NULL DEFAULT 'false',
	"weekly_email_reminders" BOOLEAN NOT NULL DEFAULT 'true',
	"daily_email_reminders" BOOLEAN NOT NULL DEFAULT 'true',
	"admin" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "challenges" (
	"id" serial NOT NULL,
	"title" TEXT NOT NULL UNIQUE,
	"date" DATE NOT NULL UNIQUE,
	"exclude_weekends" BOOLEAN NOT NULL DEFAULT 'false',
	"exclude_holidays" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT challenges_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_challenge" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"challenge_id" int NOT NULL,
	"longest_streak" int NOT NULL,
	"commit_percentage" int NOT NULL,
	CONSTRAINT user_challenge_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "email_termination_reason" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"reason" TEXT NOT NULL,
	CONSTRAINT email_termination_reason_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "weekly_progress_form" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"applied" TEXT NOT NULL,
	"learned" TEXT NOT NULL,
	"built" TEXT NOT NULL,
	"followed_up" TEXT NOT NULL,
	"events_networking" TEXT NOT NULL,
	CONSTRAINT weekly_progress_form_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "user_challenge" ADD CONSTRAINT "user_challenge_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "user_challenge" ADD CONSTRAINT "user_challenge_fk1" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id");

ALTER TABLE "email_termination_reason" ADD CONSTRAINT "email_termination_reason_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "weekly_progress_form" ADD CONSTRAINT "weekly_progress_form_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "public"."users" ADD COLUMN "image_url" text;
ALTER TABLE "public"."users" RENAME COLUMN "first_name" TO "name";
ALTER TABLE "public"."users" DROP COLUMN "last_name";
ALTER TABLE "public"."users"
  ALTER COLUMN "weekly_email_reminders" SET DEFAULT false,
  ALTER COLUMN "daily_email_reminders" SET DEFAULT false;
ALTER TABLE "public"."users" ALTER COLUMN "active" SET DEFAULT 'true';
ALTER TABLE "public"."users" ALTER COLUMN "email" DROP NOT NULL;



CREATE TABLE `rate_limits` (
	`key` text NOT NULL,
	`bucket` integer NOT NULL,
	`count` integer NOT NULL,
	PRIMARY KEY(`key`, `bucket`)
);
--> statement-breakpoint
CREATE TABLE `records` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`data` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `records_kind` ON `records` (`kind`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`hash` text PRIMARY KEY NOT NULL,
	`expires` integer NOT NULL
);

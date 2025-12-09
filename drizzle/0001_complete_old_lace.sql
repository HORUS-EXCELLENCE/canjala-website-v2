CREATE TABLE `content_sections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`section_key` varchar(100) NOT NULL,
	`title_pt` text,
	`title_en` text,
	`content_pt` text,
	`content_en` text,
	`is_active` boolean NOT NULL DEFAULT true,
	`display_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_sections_id` PRIMARY KEY(`id`),
	CONSTRAINT `content_sections_section_key_unique` UNIQUE(`section_key`)
);
--> statement-breakpoint
CREATE TABLE `festival_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`year` varchar(20) NOT NULL,
	`participants` int,
	`title_pt` text,
	`title_en` text,
	`description_pt` text,
	`description_en` text,
	`is_active` boolean NOT NULL DEFAULT true,
	`display_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `festival_stats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`file_key` varchar(255) NOT NULL,
	`url` text NOT NULL,
	`file_name` varchar(255) NOT NULL,
	`file_type` enum('image','video') NOT NULL,
	`mime_type` varchar(100),
	`file_size` int,
	`caption_pt` text,
	`caption_en` text,
	`alt_text_pt` text,
	`alt_text_en` text,
	`section` varchar(100),
	`is_active` boolean NOT NULL DEFAULT true,
	`display_order` int NOT NULL DEFAULT 0,
	`uploaded_by` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `media_files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_config` (
	`id` int AUTO_INCREMENT NOT NULL,
	`config_key` varchar(100) NOT NULL,
	`value_pt` text,
	`value_en` text,
	`description` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_config_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_config_config_key_unique` UNIQUE(`config_key`)
);
--> statement-breakpoint
ALTER TABLE `media_files` ADD CONSTRAINT `media_files_uploaded_by_users_id_fk` FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
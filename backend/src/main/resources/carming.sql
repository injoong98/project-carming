SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;

CREATE DATABASE IF NOT EXISTS carming;

CREATE Table card (
		card_id bigint not null auto_increment,
		card_number varchar(255),
        card_cvv varchar(255),
        card_expired_date varchar(255),
        card_password varchar(255),
        card_company_name varchar(255),
        primary key (card_id)
) engine=InnoDB;

create table course (
		course_id bigint not null auto_increment,
        course_name varchar(255),
		course_places varchar(255),
		course_regions varchar(255),
        course_rating_count integer,
        course_rating_sum integer,
        primary key (course_id)
) engine=InnoDB;

create table `member` (
		member_id bigint not null auto_increment,
		member_phone_number varchar(255),
		member_password varchar(255),
		member_nickname varchar(255),
		member_name varchar(255),
		member_profile varchar(255),
        member_gender varchar(255),
		member_birthday date,
        card_id bigint,
        primary key (member_id),
        foreign key (card_id) references card (card_id),
        index index_nickname (member_nickname),
        index index_phone (member_phone_number)
) engine=InnoDB;

create table place (
		place_id bigint not null auto_increment,
		place_name varchar(255),
		place_tel varchar(255),
		place_category varchar(255),
        place_lon double precision,
        place_lat double precision,
        place_region varchar(255),
		place_address varchar(255),
        place_rating_count integer,
		place_rating_sum integer,
		place_keyword varchar(255),
		place_image varchar(255),
		primary key (place_id),
        index index_cover (place_region, place_category, place_rating_sum desc)
) engine=InnoDB
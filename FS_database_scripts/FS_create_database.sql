/* IMPORTANT NOTES
Must create phone_number prior to any other table.
You must also input data in the phone_number table before you input data in the account table.
*/


CREATE TYPE phone_type AS ENUM ('MOBILE', 'HOME', 'WORK');

CREATE TABLE IF NOT EXISTS phone_number (
  phone_number_id SERIAL,
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  type phone_type,
  PRIMARY KEY (phone_number_id));


CREATE TYPE level AS ENUM ('USER', 'MOD', 'ADMIN');

CREATE TABLE IF NOT EXISTS account (
  account_id SERIAL,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  username VARCHAR(45) NOT NULL,
  password VARCHAR(100) NOT NULL,
  privilege level NOT NULL,
  approval SMALLINT NOT NULL DEFAULT 0,
  verified SMALLINT NOT NULL DEFAULT 0,
  last_login TIMESTAMP(0) NOT NULL,
  certified_by VARCHAR(75) NOT NULL DEFAULT 'N/A',
  cw_first_name VARCHAR(45) NOT NULL DEFAULT 'N/A',
  cw_last_name VARCHAR(45) NOT NULL DEFAULT 'N/A',
  cw_email VARCHAR(45) NOT NULL DEFAULT 'N/A',
  cw_phone_number VARCHAR(20) NOT NULL DEFAULT 'N/A',
  profile_completed SMALLINT NOT NULL DEFAULT 0,
  primary_phone_id VARCHAR(20) NOT NULL,
  secondary_phone_id VARCHAR(20) NULL,
  PRIMARY KEY (account_id),
  CONSTRAINT fk_account_phone_number1
    FOREIGN KEY (primary_phone_id)
    REFERENCES phone_number (phone_number)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_account_phone_number2
    FOREIGN KEY (secondary_phone_id)
    REFERENCES  phone_number (phone_number)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE IF NOT EXISTS secondary_account_holder (
  sec_account_holder_id SERIAL,
  relationshipToPrimary VARCHAR(45) NOT NULL,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  email VARCHAR(45) NULL,
  primary_phone_id VARCHAR(20) NULL,
  preferred_name VARCHAR(45) NULL,
  pronouns VARCHAR(10) NULL,
  gender VARCHAR(10) NULL,
  marital_status VARCHAR(30) NULL,
  account_id INT NOT NULL,
  PRIMARY KEY (sec_account_holder_id),
  CONSTRAINT fk_account_id
    FOREIGN KEY (account_id)
    REFERENCES account (account_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_account_phone_number1
    FOREIGN KEY (primary_phone_id)
    REFERENCES phone_number (phone_number)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS profile (
  profile_id SERIAL,
  account_id INT NOT NULL,
  biography VARCHAR(1000) NULL,
  profile_large_aws_key VARCHAR(150) NOT NULL,
  profile_small_aws_key VARCHAR(150) NOT NULL,
  gender VARCHAR(10) NULL,
  pronouns VARCHAR(10) NULL,
  preferred_name VARCHAR(45) NOT NULL,
  marital_status VARCHAR(30) NULL,
  total_foster_children_cared_for INT NOT NULL,
  years_have_been_foster_parent INT NOT NULL,
  date_of_birth TIMESTAMP(0) NOT NULL,
  PRIMARY KEY (profile_id),
  CONSTRAINT fk_users_account1
    FOREIGN KEY (account_id)
    REFERENCES account (account_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);




CREATE TABLE IF NOT EXISTS household_background (
  access_to_vehicle SMALLINT NULL DEFAULT 0,
  num_individuals_in_parental_unit INT NOT NULL,
  household_size INT NOT NULL,
  num_bio_children_in_house INT NOT NULL,
  num_adopted_children INT NOT NULL,
  num_foster_children INT NOT NULL,
  additional_details VARCHAR(500) NULL,
  experience_with_LGBTQIA_youth SMALLINT NULL,
  experience_with_physically_disabled_children SMALLINT NULL,
  experience_with_intellectually_disabled_children SMALLINT NULL,
  own_firearm SMALLINT NULL,
  list_of_pets VARCHAR(100) NULL,
  children_info VARCHAR(250) NOT NULL,
  profile_id INT NOT NULL,
  PRIMARY KEY (profile_id),
  CONSTRAINT fk_household_background_profile1
    FOREIGN KEY (profile_id)
    REFERENCES profile (profile_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
;


CREATE TABLE IF NOT EXISTS respite_background (
  provide_respite_care SMALLINT NOT NULL DEFAULT 0,
  looking_for_respite_care SMALLINT NOT NULL,
  miles_traveling_for_respite INT NULL,
  past_respite_care SMALLINT NOT NULL DEFAULT 0,
  max_num_children_care_for INT NULL,
  oldest_age_to_provide_respite INT NULL,
  youngest_age_to_provide_respite INT NULL,
  account_id INT NOT NULL REFERENCES account (account_id) ON DELETE CASCADE,
  PRIMARY KEY (account_id));

CREATE TABLE IF NOT EXISTS photos (
  profile_id INT NOT NULL REFERENCES profile (profile_id) ON DELETE CASCADE,
  photo_aws_key VARCHAR(150) NOT NULL,
  PRIMARY KEY (profile_id));



CREATE TABLE IF NOT EXISTS announcement (
  announcement_id SERIAL,
  date_posted TIMESTAMP(0) NULL,
  title VARCHAR(100) NULL,
  body_html VARCHAR(5000) NULL,
  account_id INT NOT NULL REFERENCES account (account_id) ON DELETE CASCADE,
  PRIMARY KEY (announcement_id));

CREATE TABLE IF NOT EXISTS blacklist (
  banned_by_id INT NOT NULL,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  reason VARCHAR(500) NOT NULL,
  date TIMESTAMP(0) NOT NULL,
  CONSTRAINT fk_blacklist_account1
    FOREIGN KEY (banned_by_id)
    REFERENCES account (account_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


CREATE TYPE schedule_type AS ENUM ('PRIMARY', 'TEMPORARY');

CREATE TABLE IF NOT EXISTS weekly_availability (
  availability_id SERIAL,
  profile_id INT NOT NULL,
  type schedule_type NOT NULL,
  monday INT[] NOT NULL,
  tuesday INT[] NOT NULL,
  wednesday INT[] NOT NULL,
  thursday INT[] NOT NULL,
  friday INT[] NOT NULL,
  saturday INT[] NOT NULL,
  sunday INT[] NOT NULL,
  start_date TIMESTAMP(0) NULL,
  end_date TIMESTAMP(0) NULL,
  PRIMARY KEY (availability_id),
  CONSTRAINT fk_weekly_availability_user1
    FOREIGN KEY (profile_id)
    REFERENCES profile (profile_id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
;


CREATE TABLE IF NOT EXISTS address (
  address_line_1 VARCHAR(60) NOT NULL,
  address_line_2 VARCHAR(45) NULL,
  city VARCHAR(50) NOT NULL,
  zipcode VARCHAR(15) NOT NULL,
  state VARCHAR(50) NOT NULL,
  longitude VARCHAR(20) NOT NULL,
  latitude VARCHAR(20) NOT NULL,
  account_id INT NOT NULL REFERENCES account (account_id) ON DELETE CASCADE,
  PRIMARY KEY (account_id));


CREATE TABLE IF NOT EXISTS email_verification (
  key VARCHAR(128) NOT NULL,
  issue_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  account_id INT NOT NULL REFERENCES account (account_id) ON DELETE CASCADE,
  PRIMARY KEY (account_id));

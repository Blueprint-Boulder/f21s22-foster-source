/* IMPORTANT NOTES
Must create phone_number prior to any other table.
You must also input data in the phone_number table before you input data in the account table.

When you delete an account, you must also delete the data in the phone number table associated with that account that got deleted.
*/




-- phone_number
INSERT INTO phone_number (phone_number, type) VALUES ('211','MOBILE');
INSERT INTO phone_number (phone_number, type) VALUES ('206','MOBILE');
INSERT INTO phone_number (phone_number, type) VALUES ('303','MOBILE');
INSERT INTO phone_number (phone_number, type) VALUES ('311','MOBILE');
INSERT INTO phone_number (phone_number, type) VALUES ('411','MOBILE');
INSERT INTO phone_number (phone_number, type) VALUES ('253','WORK');


-- account
INSERT INTO account (first_name,last_name,email,username,password,privilege,approval,verified,last_login,certified_by,cw_first_name,cw_last_name,cw_email,cw_phone_number,profile_completed,primary_phone_id)
VALUES ('Bob','Smith','bob.smith@email.com','bob25','bobpw', 'USER', 1,1, CURRENT_TIMESTAMP,'Boulder','CW_John', 'CW_Adam','cw_john.adam@email.com','CW_111',1,'211');

INSERT INTO account (first_name,last_name,email,username,password,privilege,approval,verified,last_login,certified_by,cw_first_name,cw_last_name,cw_email,cw_phone_number,profile_completed,primary_phone_id)
VALUES ('Susan','Walker','susan.walker@email.com','sus50','susanpw', 'USER', 1,1, CURRENT_TIMESTAMP,'Denver','CW_Elvis', 'CW_Presley','cw_elvis.presley@email.com','CW_222',1,'206');

INSERT INTO account (first_name,last_name,email,username,password,privilege,approval,verified,last_login,certified_by,cw_first_name,cw_last_name,cw_email,cw_phone_number,profile_completed,primary_phone_id)
VALUES ('Ryan','Hall','ryan.hall@email.com','ryan_the_clown','ryan_pw', 'USER', 1,1, CURRENT_TIMESTAMP,'Westminster','CW_Bruce', 'CW_Batman','cw_bruce.batman@email.com','CW_333',1,'303');

INSERT INTO account (first_name,last_name,email,username,password,privilege,approval,verified,last_login,primary_phone_id)
VALUES ('Karen','Blue','karen.blue@email.com','karen_blue','karen_pw', 'ADMIN', 1,1, CURRENT_TIMESTAMP,'253');


-- secondary_account_holder
INSERT INTO secondary_account_holder (relationshipToPrimary,first_name, last_name, email, primary_phone_id, preferred_name, pronouns, gender, marital_status, account_id)
VALUES ('wife','Rachel', 'Smith','susan.smith@email.com', '311', 'sus','she/her','female','Married',1);

INSERT INTO secondary_account_holder (relationshipToPrimary,first_name, last_name, email, primary_phone_id, preferred_name, pronouns, gender, marital_status, account_id)
VALUES ('husband','Brian', 'Walker','brian.walker@email.com', '411', 'brian','he/his','male','Married',2);


-- profile
INSERT INTO profile (biography,profile_large_aws_key,profile_small_aws_key,gender,pronouns,preferred_name,marital_status,total_foster_children_cared_for,years_have_been_foster_parent,date_of_birth,account_id)
VALUES ('Bob bio','photo_aws_1','photo_aws_2','Male','he/his','bobby','MARRIED',2,5,'2000-09-28',1);

INSERT INTO profile (biography,profile_large_aws_key,profile_small_aws_key,gender,pronouns,preferred_name,marital_status,total_foster_children_cared_for,years_have_been_foster_parent,date_of_birth,account_id)
VALUES ('Susan bio','photo_aws_prim_susan','photo_aws_sec_susan','Female','she/her','susy','MARRIED',2,5,'1980-03-15',2);

INSERT INTO profile (biography,profile_large_aws_key,profile_small_aws_key,gender,pronouns,preferred_name,marital_status,total_foster_children_cared_for,years_have_been_foster_parent,date_of_birth,account_id)
VALUES ('Ryan bio','photo_aws_prim_ryan','photo_aws_sec_ryan','Male','he/his','ryan','MARRIED',2,5,'1990-08-01',3);



-- household_background
INSERT INTO household_background(access_to_vehicle,num_individuals_in_parental_unit,household_size,num_bio_children_in_house,num_adopted_children,
  num_foster_children,additional_details,experience_with_LGBTQIA_youth,experience_with_physically_disabled_children,
  experience_with_intellectually_disabled_children,own_firearm,list_of_pets,children_info,profile_id)
VALUES(1,2,4,0,1,1,'BOB_details',0,0,0,0,'dog, Fluffy','5,male; 6,female',1);

INSERT INTO household_background(access_to_vehicle,num_individuals_in_parental_unit,household_size,num_bio_children_in_house,num_adopted_children,
  num_foster_children,additional_details,experience_with_LGBTQIA_youth,experience_with_physically_disabled_children,
  experience_with_intellectually_disabled_children,own_firearm,list_of_pets,children_info,profile_id)
VALUES(1,2,5,2,0,1,'Susan details',0,1,1,0,'Snake, Rattle','10,male; 4,male; 13,female',2);

INSERT INTO household_background(access_to_vehicle,num_individuals_in_parental_unit,household_size,num_bio_children_in_house,num_adopted_children,
  num_foster_children,additional_details,experience_with_LGBTQIA_youth,experience_with_physically_disabled_children,
  experience_with_intellectually_disabled_children,own_firearm,children_info,profile_id)
VALUES(1,2,3,0,0,1,'Ryan details',0,0,0,1,'14,male;',3);


-- respite_background
INSERT INTO respite_background (provide_respite_care,looking_for_respite_care,miles_traveling_for_respite, past_respite_care,
  max_num_children_care_for,oldest_age_to_provide_respite,youngest_age_to_provide_respite,account_id)
VALUES(1,1,20,1,1,6,6,1);

INSERT INTO respite_background (provide_respite_care,looking_for_respite_care,miles_traveling_for_respite, past_respite_care,
  max_num_children_care_for,oldest_age_to_provide_respite,youngest_age_to_provide_respite,account_id)
VALUES(1,1,30,1,2,12,2,2);

INSERT INTO respite_background (provide_respite_care,looking_for_respite_care,miles_traveling_for_respite, past_respite_care,
  max_num_children_care_for,oldest_age_to_provide_respite,youngest_age_to_provide_respite,account_id)
VALUES(1,1,15,1,3,15,1,3);


-- photos
INSERT INTO photos (profile_id,photo_aws_key) VALUES (1,'left_over_photo');
INSERT INTO photos (profile_id,photo_aws_key) VALUES (2,'extra photos');
INSERT INTO photos (profile_id,photo_aws_key) VALUES (3,'saved photos');


-- announcement
INSERT INTO announcement (date_posted, title, body_html, account_id) VALUES(CURRENT_TIMESTAMP,'HALLOWEEN','<p>happy halloween<p>',4);
INSERT INTO announcement (date_posted, title, body_html, account_id) VALUES(CURRENT_TIMESTAMP,'Site repair','<p>Site will go down on Sunday for repairs<p>',4);
INSERT INTO announcement (date_posted, title, body_html, account_id) VALUES(CURRENT_TIMESTAMP,'Happy Thanksgiving','<p>We wish you a happy thanksgiving!<p>',4);



-- blacklist
INSERT INTO blacklist (first_name, last_name, email, phone_number,reason, date, banned_by_id)
VALUES('John','Doe','john.doe@gmail.com','911','He is missing', CURRENT_TIMESTAMP,4);

INSERT INTO blacklist (first_name, last_name, email, phone_number,reason, date, banned_by_id)
VALUES('Chris','White','chris.white@gmail.com','456','He is lazy', CURRENT_TIMESTAMP,4);

INSERT INTO blacklist (first_name, last_name, email, phone_number,reason, date, banned_by_id)
VALUES('Karen','Smith','karen.smith@gmail.com','123','She is bossy', CURRENT_TIMESTAMP,4);



-- weekly_availability
INSERT INTO weekly_availability (profile_id, type, monday, tuesday,wednesday,thursday,friday,saturday,sunday) VALUES (1,'PRIMARY', ARRAY[0,0,0,0],ARRAY[0,1,0,1],ARRAY[1,1,1,1],ARRAY[1,0,1,0],ARRAY[1,0,0,1],ARRAY[1,1,0,0],ARRAY[0,0,1,1]);
INSERT INTO weekly_availability (profile_id, type, monday, tuesday,wednesday,thursday,friday,saturday,sunday) VALUES (2,'PRIMARY', ARRAY[1,1,1,1],ARRAY[0,1,0,1],ARRAY[0,0,0,0],ARRAY[1,1,1,0],ARRAY[1,0,1,1],ARRAY[0,0,0,0],ARRAY[0,0,1,1]);
INSERT INTO weekly_availability (profile_id, type, monday, tuesday,wednesday,thursday,friday,saturday,sunday) VALUES (3,'PRIMARY', ARRAY[0,1,1,0],ARRAY[0,0,0,1],ARRAY[1,1,1,1],ARRAY[1,0,0,1],ARRAY[1,0,1,0],ARRAY[1,1,1,0],ARRAY[0,1,0,1]);




-- address
INSERT INTO address (address_line_1,address_line_2,city,zipcode,state,longitude,latitude,account_id)
VALUES ('1234 College Ave.','APT. 2','Boulder','3021','CO','134','423',1);

INSERT INTO address (address_line_1,city,zipcode,state,longitude,latitude,account_id)
VALUES ('8428 Broad Ave.','Denver','98051','CO','7893','1984',2);

INSERT INTO address (address_line_1,address_line_2,city,zipcode,state,longitude,latitude,account_id)
VALUES ('5678 Lazy Ave.','APT. 5','Westminster','78901','CO','0856','3728',3);



-- email_verification
INSERT INTO email_verification (key,account_id)
VALUES ('key_1', 1);

INSERT INTO email_verification (key,account_id)
VALUES ('key_2', 2);

INSERT INTO email_verification (key,account_id)
VALUES ('key_3', 3);

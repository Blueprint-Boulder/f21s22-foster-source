// /**
//  *
//  *  Announcements
//  *
//  */
// import {accountRouter} from "./src/routes/account-router";
//
// // GET /api/db/announcements
// // RES
// export interface GetAnnouncementsRes {
//   announcements: Announcement[];
// }
//
// // GET /api/db/announcements/:announcment_id
// // RES
// Announcement
//
// // GET /api/db/announcements/recent
// // RES
// Announcement
//
// //POST /api/db/announcements/
// // REQ
// Announcement
// // RES
// Announcement
//
// //PUT /api/db/announcements/:announcement_id
// // REQ
// OptionalAnnouncement // all fields are optional, otherwise the same as announcement
// // RES
// Announcement
//
// // DELETE /api/db/announcements/:announcement_id
//
//

// /**
//  *
//  *  Account
//  *
//  */
//
// // POST /api/db/accounts/
// // REQ
// export interface CreateAccountReq {
//   email: string;
//   username: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   dob: "ISO 8601" "2021-10-21T00:24:48+00:00"
// }
// // RES
// export interface CreateAccountRes {
//   email: string;
//   username: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   dob: "ISO 8601" "2021-10-21T00:24:48+00:00"
// }
//
// // POST /api/db/accounts/login
// // REQ
// username + pass
// // RES
// Cookie
// {
//   id: 7,
//     privilegeLevel:0,
//   exp: 1634774779,
//   iat: 1634688379,
// }
//
// //PUT /api/db/accounts/
// // REQ
// CreateAccountReqOptional - dob - name
//
// // DELETE /api/db/accounts/:account_id?
// // restricted to yourself, or moderator.
// // If no id, delete  self ( from cookie)
//
// // GET /api/db/accounts/:account_id
// // RES
// Account
//
// // GET /api/db/accounts/?unapproved=true/false
// // RES
// export interface GetAccountsRes {
//   announcements: Account[];
// }
//

// /**
//  *
//  * Profiles
//  *
//  */
// //GET /api/db/profiles/?limit=20&offset=20
// //RES
// export interface GetProfilesResponse {
//   profiles: Profile[];
//   numResults: number;
// }
//
// //GET /api/db/profiles/:profile_id
// //RES
// export interface GetProfileRes {
//   profile: Profile;
//   photos: Photo[];
//   availability: Availability;
// }
//
// //POST /api/db/profiles/
// //REQ
// Profile + fn ln
//
// //RES
// Profile + fn ln
//
// //PUT /api/db/profiles/
// // only allow to edit own profile
// //REQ
// ProfileOptional
// // RES
// Profile
//
// /**
//  *
//  * Availability
//  *
//  */
// // GET /api/db/availability/:profile_id
// // RES
// Availability
//
// // DELETE /api/db/availability/:availability_id
// // For temp availabilities only
//
// // POST /api/db/availability
// Availability
// // RES
// Availibility
//
// // PUT /api/db/availability/:availability_id
// //REQ
// AvailibilityOptional
// //RES
// Availability
//
//
// /**
//  *
//  * Address
//  *
//  */
//
// //PUT /api/db/account/address/
// //REQ
// Address - id
// //RES
// Address - id
//
//
// /**
//  *
//  * Phone Number
//  *
//  */
//
// //PUT /api/db/account/phonenumber/?primary=true/false
// //REQ
// PhoneNumber
// //RES
// PhoneNumber
//
// /**
//  *
//  * Photos
//  *
//  */
// //POST /api/db/profile/photos/
// //REQ
// Photo
// //RES
// Photo
//
// //DELETE /api/db/profile/photos/:photo_aws_key
//
// /**
//  *
//  * Blacklist
//  *
//  */
//
// //GET /api/db/blacklist
// //RES
// BlacklistedUser[]
//
// //POST /api/db/blacklist
// //REQ
// BlacklistedUser
// //RES
// BlacklistedUser
//
// //DELETE /api/db/blacklist/?phonenumber='E.164 formatting: +17208887261'&email=
//
//
//
// // MEETING NOTES
// // - Move fn ln dob to account
// // - Rename user to profile
// // - Longer password: 100
// // - Password limit: 50
// // - Use enums for privelege
// // - one case worker per account
// // - Move case worker info into account
// // - Account: ProfileCompleted boolean field
// // - set up database to cascade delete account
// // - announcements should only reference the account table
// // - Associate address with account instead of profile
// // - Type enum: primary vs temporary
// // - add a start date, null for primary
// // - add an end date, null for primary
// // - add id field to availability
// // - Remove apt/suite_number
// // - pn enmum for primary secondary instead of is_primary_contact
// // -

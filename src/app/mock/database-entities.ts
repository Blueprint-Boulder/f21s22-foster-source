import { Announcement, GetAnnouncementsRes } from '../models/announcement.model';
import { User } from '../models/user.model';
import { Applicant } from '../models/applicant.model';
import { BlacklistedUser } from '../models/blacklisted-user.model';
import { Account, Cookie, CreateAccountRequest } from '../models/account.model';
import { PhoneNumber, PhoneNumberType } from '../models/phonenumber.model';
import { Photo, Profile } from '../models/profile.model';
import { Availability, AvailabilityType } from '../models/availability.model';
import { Address, SimpleAddress } from '../models/adress.model';

const announcements: Announcement[] = [
  {
    id: 1,
    date: new Date(),
    author: 'Tim Cook',
    title: 'This is the first announcement!',
    bodyHTML: `
    <b>this should be some bold text...</b>
    <div>Also it has a div!</div>
    `,
  },
  {
    id: 2,
    date: new Date(),
    author: 'Jake Paul',
    title: 'Christmas Party',
    bodyHTML: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    `,
  },
  {
    id: 3,
    date: new Date(),
    author: 'Penelope Smith',
    title: 'This is really important!',
    bodyHTML: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <b>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui </b> officia deserunt mollit anim id est laborum.</p> <img src="https://fostersource.org/wp-content/uploads/2020/07/team1.jpg" width="589px">
    `,
  },
];

const getAnnouncementResponses: GetAnnouncementsRes[] = [{ announcements: announcements }];

export const simpleAddresses: SimpleAddress[] = [
  {
    line1: '1002 fake st.',
    city: 'Denver',
    zip: '80210',
    state: 'CO',
  },
];

export const addresses: Address[] = [
  {
    line1: '1002 fake st.',
    city: 'Denver',
    zip: '80210',
    state: 'CO',
    lat: '1',
    lon: '1',
  },
];

export const createAccountRequests: CreateAccountRequest[] = [
  {
    email: 'jcrowson@aol.com',
    username: 'jman',
    password: 'hashedpassword',
    firstName: 'Jett',
    lastName: 'Crowman',
    cwFirstName: 'George',
    cwLastName: 'Clooney',
    cwEmail: 'gCloon@aol.com',
    certifiedBy: 'Araphaoe',
    primaryPhone: {
      phoneNumber: '+17209938821',
      type: PhoneNumberType.Mobile,
    },
    secondaryPhone: {
      phoneNumber: '+13321123345',
      type: PhoneNumberType.Home,
    },
    address: simpleAddresses[0],
  },
];

export const cookies: Cookie[] = [
  {
    id: 1,
    privilegeLevel: 3,
    exp: 12341235,
    iat: 123412341,
  },
];

export const accounts: Account[] = [
  {
    id: 1,
    email: 'jcrowson@colorado.edu',
    username: 'jword',
    password: 'pass1234',
    firstName: 'Jett',
    lastName: 'Crowman',
    cwFirstName: 'Gina',
    cwLastName: 'Smith',
    cwEmail: 'noreply@google.com',
    distance: 10,
    pronouns: 'He/Him',
    cwPhone: '+17208839921',
    certifiedBy: 'Arapahoe County',
    primaryPhone: {
      phoneNumber: '+17209938821',
      type: PhoneNumberType.Mobile,
    },
    secondaryPhone: {
      phoneNumber: '+13321123345',
      type: PhoneNumberType.Home,
    },
    lastLogin: new Date(),
    profileCompleted: true,
    address: {
      line1: '1002 fake st.',
      city: 'Denver',
      zip: '80210',
      state: 'CO',
      lat: '1',
      lon: '1',
    },
  },
];

const users: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
  },
];

const applicants: Applicant[] = [
  {
    id: 1,
    name: 'Tim Cook',
    email: 'tim.cook@apple.com',
    caseWorkerName: 'Gina White',
    caseWorkerEmail: 'gwhite@colorado.gov',
    dateApplied: new Date(),
  },
  {
    id: 2,
    name: 'John Denver',
    email: 'jdenver2@gmail.com',
    caseWorkerName: 'Sam Smith',
    caseWorkerEmail: 'sam.smith@colorado.gov',
    dateApplied: new Date(),
  },
  {
    id: 3,
    name: 'Michelle Obama',
    email: 'mobama@whitehouse.gov',
    caseWorkerName: 'Gina White',
    caseWorkerEmail: 'gwhite@colorado.gov',
    dateApplied: new Date(),
  },
  {
    id: 4,
    name: 'Tim Cook',
    email: 'tim.cook@apple.com',
    caseWorkerName: 'Gina White',
    caseWorkerEmail: 'gwhite@colorado.gov',
    dateApplied: new Date(),
  },
  {
    id: 5,
    name: 'John Denver',
    email: 'jdenver2@gmail.com',
    caseWorkerName: 'Sam Smith',
    caseWorkerEmail: 'sam.smith@colorado.gov',
    dateApplied: new Date(),
  },
  {
    id: 6,
    name: 'Michelle Obama',
    email: 'mobama@whitehouse.gov',
    caseWorkerName: 'Gina White',
    caseWorkerEmail: 'gwhite@colorado.gov',
    dateApplied: new Date(),
  },
];

export const photos: Photo[] = [
  {
    id: 1,
    photoAWSKey: 'AWS_KEY',
  },
];

const blacklist: BlacklistedUser[] = [
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'josh.smith@aol.com',
    phoneNumber: '(720) 822-9918',
    bannedBy: 'Jett Crowson',
    date: new Date(),
    reason: 'Josh is not even from Colorado, but will not stop applying.',
  },
  {
    firstName: 'amy',
    lastName: 'green',
    email: 'amygirl1111@aol.com',
    phoneNumber: '(720) 221-9887',
    bannedBy: 'Jett Crowson',
    date: new Date(),
    reason: 'Amy is honestly just not a vibe.',
  },
  {
    firstName: 'Bill',
    lastName: 'Gates',
    email: 'bill@microsoft.com',
    phoneNumber: '(315) 883-1182',
    bannedBy: 'Jett Crowson',
    date: new Date(),
    reason:
      'I have no idea why Bill Gates would be banned from this site, but here we are... Here is some more information about the ban just to check out if the text wraps in an aesthetically pleasing way.',
  },
];
export const primaryAvailabilities: Availability[] = [
  {
    id: 1,
    type: AvailabilityType.PRIMARY,
    monday: [true, true, true, false],
    tuesday: [false, true, true, false],
    wednesday: [true, true, true, false],
    thursday: [true, true, false, false],
    friday: [true, true, true, false],
    saturday: [false, true, true, true],
    sunday: [false, true, true, true],
  },
];

export const mobilePhones: PhoneNumber[] = [
  {
    phoneNumber: '+17209938821',
    type: PhoneNumberType.Mobile,
  },
];

export const profiles: Profile[] = [
  {
    id: 1,
    biography: 'This is the biography of the profile',
    profileLargeAWSKey: '121234123234',
    profileSmallAWSKey: 'asdfasdfasdfas',
    email: 'test@email.com',
    username: 'This is the username',
    firstName: 'Jack',
    lastName: 'Crowman',
    dob: new Date(),
    primaryPhone: mobilePhones[0],
    secondaryPhone: {
      phoneNumber: '+13321123345',
      type: PhoneNumberType.Home,
    },
    lastLogin: new Date(),
    profileCompleted: true,
    address: {
      line1: '1002 fake st.',
      city: 'Denver',
      zip: '80210',
      state: 'CO',
      lat: '1',
      lon: '1',
    },
    availability: primaryAvailabilities[0],
    photoAWSKeys: [{ id: 1, photoAWSKey: 'REAL_AWS_KEY' }],
  },
];

export { announcements, getAnnouncementResponses, users, applicants, blacklist };

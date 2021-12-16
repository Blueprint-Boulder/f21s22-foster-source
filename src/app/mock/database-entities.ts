import { Announcement, GetAnnouncementsRes } from '../models/announcement.model';
import { User } from '../models/user.model';
import { Applicant } from '../models/applicant.model';
import { BlacklistedUser } from '../models/blacklisted-user.model';
import { Account, Cookie, CreateAccountRequest } from '../models/account.model';
import { PhoneNumber, PhoneNumberType } from '../models/phonenumber.model';
import { Photo } from '../models/profile.model';
import { Availability, AvailabilityType } from '../models/availability.model';
import { AddressReq, SimpleAddressReq } from '../models/adress.model';
import { FullProfileRes } from '../models/get-profile-by-id.models';

const announcements: Announcement[] = [
  {
    id: 1,
    datePosted: new Date(),
    account: {
      firstName: 'Tim',
      lastName: 'Cook',
    },
    title: 'This is the first announcement!',
    bodyHtml: `
    <b>this should be some bold text...</b>
    <div>Also it has a div!</div>
    `,
  },
  {
    id: 2,
    datePosted: new Date(),
    account: {
      firstName: 'Jake',
      lastName: 'Paul',
    },
    title: 'Christmas Party',
    bodyHtml: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    `,
  },
  {
    id: 3,
    datePosted: new Date(),
    account: {
      firstName: 'Penelope',
      lastName: 'Smith',
    },
    title: 'This is really important!',
    bodyHtml: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <b>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui </b> officia deserunt mollit anim id est laborum.</p> <img src="https://fostersource.org/wp-content/uploads/2020/07/team1.jpg" width="589px">
    `,
  },
];

const getAnnouncementResponses: GetAnnouncementsRes[] = [{ announcements: announcements }];

export const simpleAddresses: SimpleAddressReq[] = [
  {
    addressLine1: '1002 fake st.',
    city: 'Denver',
    zipcode: '80210',
    state: 'CO',
  },
];

export const addresses: AddressReq[] = [
  {
    addressLine1: '1002 fake st.',
    city: 'Denver',
    zipcode: '80210',
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
    cwPhoneNumber: '+17208388843',
    certifiedBy: 'Araphaoe',
    primaryPhoneNumber: {
      phoneNumber: '+17209938821',
      type: PhoneNumberType.Mobile,
    },
    secondaryPhoneNumber: {
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
    firstName: 'Jet',
    lastName: 'Crowman',
    cwFirstName: 'Gina',
    cwLastName: 'Smith',
    cwEmail: 'noreply@google.com',
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
      addressLine1: '1002 fake st.',
      city: 'Denver',
      zipcode: '80210',
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
    bannedByAccount: {
      id: 1,
      firstName: 'Jett',
      lastName: 'Crowson',
    },
    date: new Date(),
    reason: 'Josh is not even from Colorado, but will not stop applying.',
  },
  {
    firstName: 'amy',
    lastName: 'green',
    email: 'amygirl1111@aol.com',
    phoneNumber: '(720) 221-9887',
    bannedByAccount: {
      id: 2,
      firstName: 'Joe',
      lastName: 'Biden',
    },
    date: new Date(),
    reason: 'Amy is honestly just not a vibe.',
  },
  {
    firstName: 'Bill',
    lastName: 'Gates',
    email: 'bill@microsoft.com',
    phoneNumber: '(315) 883-1182',
    bannedByAccount: {
      id: 1,
      firstName: 'Jett',
      lastName: 'Crowson',
    },
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

export const profiles: FullProfileRes[] = [
  {
    id: 1,
    preferredName: 'Jace',
    dob: new Date(),
    biography: 'Just an easy going guy',
    profileLargeAwsKey: 'awskey_large',
    profileSmallAwsKey: 'awskey_small',
    gender: 'male',
    pronouns: 'he/his',
    maritalStatus: 'single',
    accountId: 1,
    householdBackground: {
      id: 1,
      parentalUnitSize: 2,
      householdSize: 4,
      childrenInHousehold: 2,
      childrenInfo: '12, female, biological\n 14 male, adopted',
      vehicleAccess: true,
      lgbtCareExperience: true,
      caredForPhysDisabled: true,
      caredForIntelDisabled: true,
      caredForMedicallyFragile: true,
      ownsFirearm: true,
      petInfo: 'Two dogs and a cat',
      additionalDetails: 'I am so allergic to peanuts',
    },
    respiteBackground: {
      id: 1,
      fosterYearsExperience: 1,
      totalChildrenCaredFor: 10,
      canProvideRespite: true,
      lookingForRespite: true,
      respiteProviderInfo: {
        id: 1,
        cityCanProvideRespiteIn: 'boulder',
        respiteTravelDistance: 100,
        careForMinAge: 0,
        careForMaxAge: 10,
        maxNumCareFor: 3,
        availabilities: [
          {
            id: 1,
            type: AvailabilityType.PRIMARY,
            monday: [true, false, false, false],
            tuesday: [false, true, true, true],
            wednesday: [true, false, false, false],
            thursday: [false, true, true, true],
            friday: [true, false, false, false],
            saturday: [false, true, true, true],
            sunday: [true, false, false, false],
          },
        ],
      },
    },
    photos: [],
    secAccountHolder: {
      id: 1,
      relationshipToPrimary: 'met once in an airport',
      firstName: 'Tommy',
      lastName: 'Bahama',
      gender: 'male',
      email: 'tbahama@tommyb.com',
      preferredName: 'Tom',
      secAccountHolderPhone: {
        id: 1,
        phoneNumber: '+17207738882',
        type: PhoneNumberType.Home,
      },
    },
    account: {
      firstName: 'Jett',
      lastName: 'Crowson',
      email: 'jettcrowson@colorado.gov',
      username: 'jcrowson',
      address: {
        id: 1,
        addressLine1: '741 Danbury St',
        addressLine2: 'APT 101',
        city: 'Boulder',
        zipcode: '903213',
        state: 'CO',
        country: 'USA',
        longitude: 12030210,
        latitude: 23412,
      },
      primaryPhoneNumber: {
        id: 1,
        phoneNumber: '+193993921',
        type: PhoneNumberType.Mobile,
      },
      secondaryPhoneNumber: {
        id: 1,
        phoneNumber: '+8889999999',
        type: PhoneNumberType.Mobile,
      },
    },
  },
];

export { announcements, getAnnouncementResponses, users, applicants, blacklist };

import { Announcement } from '../models/announcement.model';

const announcements: Announcement[] = [
  {
    date: new Date(),
    author: 'Tim Cook',
    title: 'This is the first announcement!',
    bodyHTML: `
    <b>this should be some bold text...</b>
    <div>Also it has a div!</div>
    `,
  },
];

export { announcements };

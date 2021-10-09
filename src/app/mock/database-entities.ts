import { Announcement } from '../models/announcement.model';

const announcements: Announcement[] = [
  {
    date: new Date(),
    author: 'Tim Cook',
    title: 'This is the first announcement!',
    bodyHTML: `
    <i>this shoud be some italic text...</i>
    <hr>
    <div>Also it has a div!</div>
    `,
  },
];

export { announcements };

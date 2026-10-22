// `as const` keeps the literal values, so this is BOTH:
//  - a runtime array  -> can be looped with @for (e.g. buttons to change priority)
//  - the source of the type below -> add a level here and the type updates itself
export const PRIORITIES = ['low', 'medium', 'high'] as const;
export type Priority = (typeof PRIORITIES)[number]; // 'low' | 'medium' | 'high'

export interface MyComment {
  id: number;
  text: string;
  createdAt: Date;
}

export interface MyObject {
  id: number;
  title: string;
  content: string;
  priority: Priority;
  tags: string[];
  comments: MyComment[];
  updatedAt: Date;
}

export const myObjects: MyObject[] = [
  {
    id: 1,
    title: 'perviy',
    priority: 'high',
    content: 'Lorem Ipsumsfdhkjhmdf,fmsdkgdfmhlkhmgflkhdf;lsakflsdkg',
    tags: ['angular', 'signals'],
    comments: [
      { id: 1, text: 'Looks good', createdAt: new Date('2026-09-20T10:00') },
      { id: 2, text: 'Thanks!', createdAt: new Date('2026-09-21T08:30') },
    ],
    updatedAt: new Date('2026-09-21T08:30'),
  },
  {
    id: 2,
    title: 'vtoroy',
    priority: 'medium',
    content: 'Lorem Ipsumsfdhkjhmdf,fmsdkgdfmhlkhmgflkhdf;lsakflsdkg',
    tags: ['routing'],
    comments: [],
    updatedAt: new Date('2026-09-18T14:00'),
  },
  {
    id: 3,
    title: 'tretiy',
    priority: 'low',
    content: 'Lorem Ipsumsfdhkjhmdf,fmsdkgdfmhlkhmgflkhdf;lsakflsdkg',
    tags: [],
    comments: [
      { id: 3, text: 'Can we bump this?', createdAt: new Date('2026-09-25T16:45') },
    ],
    updatedAt: new Date('2026-09-25T16:45'),
  },
  {
    id: 5,
    title: 'pyatiy',
    priority: 'high',
    content: 'Lorem Ipsumsfdhkjhmdf,fmsdkgdfmhlkhmgflkhdf;lsakflsdkg',
    tags: ['forms', 'tailwind', 'testing'],
    comments: [],
    updatedAt: new Date('2026-09-28T09:15'),
  },
];

const emails = [
  {
    id: 1,
    from: 'aaa@example.com',
    to: ['zzz.zzz@example.com'],
    receivedTime: new Date(),
    subject: '[HR-888] Notice of official announcement',
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", // eslint-disable-line
    attachments: [],
  },
  {
    id: 2,
    from: 'bbb.bbbb@example.com',
    to: ['yyy@example.com'],
    receivedTime: new Date(),
    subject: '[web:333] Web Contact',
    content: 'blabla2',
    attachments: [],
  },
  {
    id: 3,
    from: 'ccc@example.com',
    to: ['xxx@example.com', 'xxx@example.com'],
    receivedTime: new Date(),
    subject: 'Happy New Year! Greetings for the New Year.',
    content: 'blabla3',
    attachments: ['1'],
  },
  {
    id: 4,
    from: 'ddd.ddd@example.com',
    to: ['vvv.vvv@example.com', 'vvv.vvv@example.com', 'vvv.vvv@example.com'],
    receivedTime: new Date('January 09, 2020 10:20:00'),
    subject: '[HR-888] Notice of official announcement',
    content: 'blabla4',
    attachments: [],
  },
  {
    id: 5,
    from: 'eee@example.com',
    to: ['sss.@example.com', 'sss.@example.com', 'sss.@example.com', 'sss.@example.com'],
    receivedTime: new Date('January 09, 2020 20:20:00'),
    subject: '[HR-887(Revised: Office Expansion Project Teaaaaaaaaaaaaaaaaa',
    content: 'blabla5',
    attachments: [],
  },
];

export default emails;

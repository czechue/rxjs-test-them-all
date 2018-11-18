import '../examples/implementation';

var lists = [
    {
      id: 5434364,
      name: 'New Releases',
    },
    {
      id: 65456475,
      name: 'Thrillers',
    },
  ],
  videos = [
    {
      listId: 5434364,
      id: 65432445,
      title: 'The Chamber',
    },
    {
      listId: 5434364,
      id: 675465,
      title: 'Fracture',
    },
    {
      listId: 65456475,
      id: 70111470,
      title: 'Die Hard',
    },
    {
      listId: 65456475,
      id: 654356453,
      title: 'Bad Boys',
    },
  ];

const expected = [
  {
    name: 'New Releases',
    videos: [
      {
        id: 65432445,
        title: 'The Chamber',
      },
      {
        id: 675465,
        title: 'Fracture',
      },
    ],
  },
  {
    name: 'Thrillers',
    videos: [
      {
        id: 70111470,
        title: 'Die Hard',
      },
      {
        id: 654356453,
        title: 'Bad Boys',
      },
    ],
  },
];

test('ex25 Powerful Queries', () => {
  const result = lists.myMap(list => {
    return {
      name: list.name,
      videos: videos
        .myFilter(video => {
          return (video.listId === list.id);
        })
        .myMap(video => {
          return {
            id: video.id,
            title: video.title,
          };
        }),
    };
  });

  expect(result).toEqual(expected);
});

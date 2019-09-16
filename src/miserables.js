export default {
  nodes: [
    { id: 'common01', name: '공통1', group: 1 },
    { id: 'common02', name: '공통1', group: 1 },
    { id: 'common03', name: '공통1', group: 1 },

    { id: 'A', name: '소울아크', group: 2 },
    { id: 'A-1', name: '강화', group: 2 },
    { id: 'A-2', name: '발열', group: 2 },
    { id: 'A-3', name: '귀엽다', group: 2 },
    { id: 'A-4', name: '재미있다', group: 2 },
    { id: 'A-5', name: '혜자', group: 2 },

    { id: 'B', name: '브라운더스트', group: 3 },
    { id: 'B-1', name: '재미있다', group: 3 },
    { id: 'B-2', name: '강화', group: 3 },
    { id: 'B-3', name: '어렵다', group: 3 },
    { id: 'B-4', name: '과금유도', group: 3 },
    { id: 'B-5', name: '발열', group: 3 }
  ],
  links: [
    { source: 'A', target: 'common01', value: 2 },
    { source: 'A', target: 'common02', value: 2 },
    { source: 'A', target: 'common03', value: 2 },
    { source: 'B', target: 'common01', value: 2 },
    { source: 'B', target: 'common02', value: 2 },
    { source: 'B', target: 'common03', value: 2 },

    { source: 'A-1', target: 'A', value: 1 },
    { source: 'A-2', target: 'A', value: 1 },
    { source: 'A-3', target: 'A', value: 1 },
    { source: 'A-4', target: 'A', value: 1 },
    { source: 'A-5', target: 'A', value: 1 },

    { source: 'B-1', target: 'B', value: 1 },
    { source: 'B-2', target: 'B', value: 1 },
    { source: 'B-3', target: 'B', value: 1 },
    { source: 'B-4', target: 'B', value: 1 },
    { source: 'B-5', target: 'B', value: 1 }
  ]
};

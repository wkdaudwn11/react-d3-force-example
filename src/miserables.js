export default {
  nodes: [
    { id: 'common01', name: '공통1', size: '20', group: 0 },
    { id: 'common02', name: '공통2', size: '20', group: 0 },
    { id: 'common03', name: '공통3', size: '20', group: 0 },

    { id: 'A', name: '소울아크', size: '30', group: 1 },
    { id: 'A-1', name: '강화', size: '30', group: 1 },
    { id: 'A-2', name: '발열', size: '30', group: 1 },
    { id: 'A-3', name: '귀엽다', size: '30', group: 1 },
    { id: 'A-4', name: '재미있다', size: '30', group: 1 },
    { id: 'A-5', name: '혜자', size: '30', group: 1 },

    { id: 'B', name: '브라운더스트', size: '30', group: 2 },
    { id: 'B-1', name: '재미있다', size: '30', group: 2 },
    { id: 'B-2', name: '강화', size: '30', group: 2 },
    { id: 'B-3', name: '어렵다', size: '30', group: 2 },
    { id: 'B-4', name: '과금유도', size: '30', group: 2 },
    { id: 'B-5', name: '발열', size: '30', group: 2 }
  ],
  links: [
    { source: 'A', target: 'common01', value: 1, group: 1 },
    { source: 'A', target: 'common02', value: 1, group: 1 },
    { source: 'A', target: 'common03', value: 1, group: 1 },
    { source: 'B', target: 'common01', value: 1, group: 2 },
    { source: 'B', target: 'common02', value: 1, group: 2 },
    { source: 'B', target: 'common03', value: 1, group: 2 },

    { source: 'A-1', target: 'A', value: 1, group: 1 },
    { source: 'A-2', target: 'A', value: 1, group: 1 },
    { source: 'A-3', target: 'A', value: 1, group: 1 },
    { source: 'A-4', target: 'A', value: 1, group: 1 },
    { source: 'A-5', target: 'A', value: 1, group: 1 },

    { source: 'B-1', target: 'B', value: 1, group: 2 },
    { source: 'B-2', target: 'B', value: 1, group: 2 },
    { source: 'B-3', target: 'B', value: 1, group: 2 },
    { source: 'B-4', target: 'B', value: 1, group: 2 },
    { source: 'B-5', target: 'B', value: 1, group: 2 }
  ],
  colors: ['#57A8D3', '#D14F75', '#D14AC3', '#CE7654', '#904CD3', '#5458D3']
};

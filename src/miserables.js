export default {
  nodes: [
    { id: 'common-1', name: '공통1', size: '20', group: 0, groupIndex: 0 },
    { id: 'common-2', name: '공통2', size: '20', group: 0, groupIndex: 1 },
    { id: 'common-3', name: '공통3', size: '20', group: 0, groupIndex: 2 },
    { id: 'common-4', name: '공통3', size: '20', group: 0, groupIndex: 3 },

    { id: 'A', name: '소울아크', size: '25', group: 1, groupIndex: -1 },
    { id: 'A-1', name: '강화', size: '25', group: 1, groupIndex: 0 },
    { id: 'A-2', name: '발열', size: '25', group: 1, groupIndex: 1 },
    { id: 'A-3', name: '귀엽다', size: '25', group: 1, groupIndex: 2 },
    { id: 'A-4', name: '재미있다', size: '25', group: 1, groupIndex: 3 },
    { id: 'A-5', name: '혜자', size: '25', group: 1, groupIndex: 4 },
    // { id: 'A-6', name: 'A-6', size: '25', group: 1, groupIndex: 5 },
    // { id: 'A-7', name: 'A-7', size: '25', group: 1, groupIndex: 6 },
    // { id: 'A-8', name: 'A-8', size: '25', group: 1, groupIndex: 7 },

    { id: 'B', name: '브라운더스트', size: '25', group: 2, groupIndex: -1 },
    { id: 'B-1', name: '재미있다', size: '25', group: 2, groupIndex: 0 },
    { id: 'B-2', name: '강화', size: '25', group: 2, groupIndex: 1 },
    { id: 'B-3', name: '어렵다', size: '25', group: 2, groupIndex: 2 },
    { id: 'B-4', name: '과금유도', size: '25', group: 2, groupIndex: 3 },
    { id: 'B-5', name: '발열', size: '25', group: 2, groupIndex: 4 }
    // { id: 'B-6', name: 'B-6', size: '25', group: 2, groupIndex: 5 },
    // { id: 'B-7', name: 'B-7', size: '25', group: 2, groupIndex: 6 },
    // { id: 'B-8', name: 'B-8', size: '25', group: 2, groupIndex: 7 }
  ],
  links: [
    { source: 'A', target: 'common-1', value: 1, group: 1 },
    { source: 'A', target: 'common-2', value: 1, group: 1 },
    { source: 'A', target: 'common-3', value: 1, group: 1 },
    { source: 'A', target: 'common-4', value: 1, group: 1 },
    { source: 'B', target: 'common-1', value: 1, group: 2 },
    { source: 'B', target: 'common-2', value: 1, group: 2 },
    { source: 'B', target: 'common-3', value: 1, group: 2 },
    { source: 'B', target: 'common-4', value: 1, group: 2 },

    { source: 'A', target: 'A-1', value: 1, group: 1 },
    { source: 'A', target: 'A-2', value: 1, group: 1 },
    { source: 'A', target: 'A-3', value: 1, group: 1 },
    { source: 'A', target: 'A-4', value: 1, group: 1 },
    { source: 'A', target: 'A-5', value: 1, group: 1 },
    // { source: 'A', target: 'A-6', value: 1, group: 1 },
    // { source: 'A', target: 'A-7', value: 1, group: 1 },
    // { source: 'A', target: 'A-8', value: 1, group: 1 },

    { source: 'B', target: 'B-1', value: 1, group: 2 },
    { source: 'B', target: 'B-2', value: 1, group: 2 },
    { source: 'B', target: 'B-3', value: 1, group: 2 },
    { source: 'B', target: 'B-4', value: 1, group: 2 },
    { source: 'B', target: 'B-5', value: 1, group: 2 }
    // { source: 'B', target: 'B-6', value: 1, group: 2 },
    // { source: 'B', target: 'B-7', value: 1, group: 2 },
    // { source: 'B', target: 'B-8', value: 1, group: 2 }
  ],
  colors: ['#57A8D3', '#D14F75', '#D14AC3', '#CE7654', '#904CD3', '#5458D3']
};

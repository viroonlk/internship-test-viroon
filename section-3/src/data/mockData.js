export const MOCK_USERS = [
  { id: 'u1', username: 'admin', name: 'Alice Admin', role: 'admin', avatar: '👩‍💼' },
  { id: 'u2', username: 'bob', name: 'Bob Employee', role: 'employee', avatar: '👨‍💻' },
  { id: 'u3', username: 'carol', name: 'Carol Employee', role: 'employee', avatar: '👩‍💻' }
];

export const INITIAL_TASKS = [
  {
    id: 't1',
    title: 'Design landing page',
    description: 'Create mockups for the new landing page.',
    assigneeId: 'u2', // Assigned to Bob
    status: 'To Do', // To Do, In Progress, Done
    priority: 'High', // Low, Medium, High
    createdAt: '2023-10-21'
  },
  {
    id: 't2',
    title: 'Fix login bug',
    description: 'Investigate the auth redirect issue.',
    assigneeId: 'u2',
    status: 'In Progress',
    priority: 'Medium',
    createdAt: '2023-10-22'
  },
  {
    id: 't3',
    title: 'Write report',
    description: 'Q2 performance report.',
    assigneeId: 'u3', // Assigned to Carol
    status: 'Done',
    priority: 'Low',
    createdAt: '2023-10-20'
  }
];
module.exports = {
  apps: [
    {
      name: 'um',
      script: 'pnpm',
      args: 'run start:um',
    },
    {
      name: 'rs',
      script: 'pnpm',
      args: 'run start:rs',
    },
    {
      name: 'ps',
      script: 'pnpm',
      args: 'run start:ps',
    },
    {
      name: 'ds',
      script: 'pnpm',
      args: 'run start:ds',
    },
  ],
}

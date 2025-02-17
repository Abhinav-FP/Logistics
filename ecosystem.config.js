module.exports = {
    apps: [
      {
        name: 'Logistics',
        script: 'serve',
        args: '-s build', // Use serve to serve the build folder
        cwd: '/home/ubuntu/Logistics', // Update the path to where your app is located
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  
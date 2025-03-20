export default () => ({
  mode: process.env.NODE_ENV ?? 'development',
  grpc: {
    // url: process.env.GRPC_URL || '0.0.0.0:50051',
  },
})

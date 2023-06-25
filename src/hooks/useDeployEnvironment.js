export const Environment = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development'
}

export default function useDeployEnvironment() {
  return process.env.NODE_ENV;
}

export function validateEnvironment(config: Record<string, unknown>) {
  const requiredVariables = [
    'PORT',
    'ORACLE_USER',
    'ORACLE_PASSWORD',
    'ORACLE_CONNECTION_STRING',
  ];

  const missingVariables = requiredVariables.filter((key) => {
    const value = config[key];
    return value === undefined || value === null || String(value).trim().length === 0;
  });

  if (missingVariables.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVariables.join(', ')}`);
  }

  return config;
}
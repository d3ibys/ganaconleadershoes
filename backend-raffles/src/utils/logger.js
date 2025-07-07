const logger = {
  info: (...args) => console.info('[INFO]:', ...args),
  warn: (...args) => console.warn('[WARN]:', ...args),
  error: (...args) => console.error('[ERROR]:', ...args),
  debug: (...args) => {
    if (process.env.DEBUG === 'true') {
      console.debug('[DEBUG]:', ...args);
    }
  },
  log: (...args) => console.log('[LOG]:', ...args),
};

export default logger;


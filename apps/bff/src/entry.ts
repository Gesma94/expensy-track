import { buildFastify } from './app.js';

const app = await buildFastify();
const port = Number(app.env.PORT ?? 7717);

try {
  app.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      throw err;
    }

    app.log.debug(`Listening at ${address}`);
  });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}

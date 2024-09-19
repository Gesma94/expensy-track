import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { cert, deleteApp, initializeApp, type App, type ServiceAccount } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { FastifyPluginName } from "../common/enums/fastify-plugin-name.js";

type FirebaseDecorator = {
  app: App;
  auth: Auth;
};
declare module "fastify" {
  interface FastifyInstance {
    [FastifyPluginName.Firebase]: FirebaseDecorator;
  }
}

export default fp(
  async (fastify: FastifyInstance) => {
    const uniqueAppName = crypto.randomUUID();
    const serviceAccount: ServiceAccount = {
      projectId: fastify.env.FIREBASE_PROJECT_ID,
      clientEmail: fastify.env.FIREBASE_CLIENT_EMAIL,
      privateKey: fastify.env.FIREBASE_PRIVATE_KEY,
    };

    const firebaseApp = initializeApp({ credential: cert(serviceAccount) }, uniqueAppName);

    fastify.decorate(FastifyPluginName.Firebase, {
      app: firebaseApp,
      auth: getAuth(firebaseApp),
    });

    fastify.addHook("onClose", async innerFastify => {
      innerFastify.log.info("deleting firebase app");
      await deleteApp(firebaseApp);
    });
  },
  {
    name: FastifyPluginName.Firebase,
    dependencies: [FastifyPluginName.Env],
  },
);

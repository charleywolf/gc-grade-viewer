import * as admin from "firebase-admin";

const config = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
};

export const firebase_app = admin.apps.length
  ? admin.app()
  : admin.initializeApp(config);

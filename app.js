const express = require("express");
const admin = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");
const { initializeApp } = require("firebase-admin/app");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

const serviceAccount = {
  type: "service_account",
  project_id: "community-app-a2ac0",
  private_key_id: "7f994ad5f57694b8f236742a73599c39719bb165",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCQobXgaDeNgUGy\nwI52CQ7oxf7WkYQJHZo2UQjDJSCD0PXsAaTCxZ/HAgM+zGDssduuMCOAjnh2hbAc\nA/kzf6JyGwULgQ+tNp9D+YivDHN+zbtZKV4IrMr2IUZS2GZDCNWA6lbkMTqQL6DK\nbgeTtQShPDN8wZXZBUrOA9qdDK4VhvFBG0V56ytLupvsut4bfyGlNMLh6v+LF9fU\nzpCReiYBYaANv38Za6sqXrwlS+U+h3y2nK96Q4ejSg9j3NeSYMLN2m1WOQJk1iKS\nahZmEECuHKP9WTdV+66YHFCeWyjoeLZEwIweWH7bCcbDjZBUBCb1Y5Q/EiWB9f4D\nnpt/k9kHAgMBAAECggEAHpKobSLql1V660vL8YSRq7/q0jWZaQniZtfzV7j56hNa\nYMSqLOf0ke9Je1VdqbshGm2fm5XCPh+dbhai73FsB93RT7C8/Rr+SLKvY31ozqWz\nlDHr6D6KesPm5y1KVKJB64ndy0fivsbqoM/odx89Ns4Qfi83u1Pkj67939Pl2rPF\n3fALSozqTTbdVKk88mEl+8zJK+iM7DejQzNzpuAph1HigP/cUUiCf4aCz3BY0ksl\ndE1epW2GQn7b0orQGwPU8fJ35CAC0DO2DUhwPE6QshGbrrorgf9TE5oR2lRVJiZ1\nV2D5kXu3Hlo5oriLHDe6Ldn3mKAInmx9UcXMbcZfMQKBgQDEs/7gIdZ6ZKYwt/L/\n0201qEi4QSBuj0Fvkg//m7kCd6rDz8RhIxsPxjf95vLOGZf0d0F3sf2nt2y1HEoC\nnC79j3yL3FSozNGoyIIWrjmq+Sm68lBbbafpcF76M/0uJ7YJYC6KIhaXVrNdmxYQ\nz4t8fLUX79/QWWpoCb4N2hwjNwKBgQC8O0AOaE+WK5aAX50t+snpTzkQGCTBsur+\nS56gvC1TjmHCFkyyQ25ol3CbaVF2hX+segfZt+D8EuilkLFbShJ3t/0I7WD7ubH2\nQTK6XJCAuKqy2zHqSlfoeFoWVPcDsnlg06M9kA6h29kfb8+sl6V6xoNF8TNJ/2/A\neR84rZyAsQKBgQCc8k1EAlvCTnp31t3xl33E2WAke/pnnLAGWJGhTlvhByBemnFD\nXCJkhLD6SoKjRbKD4X+ABKmyX11CaK74xCuOLyWd5pA6GyqSNGHvvNXQgHv2aQ8K\n1ESssvdlRYQWhqLteivIFYjW+dulrW9+vEq8ajiIP+HhuOZ42oUlQkk/IwKBgQCY\nzPxd9b2NqUqeYX/GAI0B8YbgEslb2HM9BYP69WdSKgYfuVx/ZY/uJemKr38q2Iph\nKBrRWZyw5GSpaoEfG01MlDY7lf+huQfHYPveHyBK7h3b3WZyy/D6zSBMeqKfBLXV\nrVgZtKS8LizegTSz5dK2jQmpsHizPEGqnGiE6SJfsQKBgQCfJMYEtaVjoBpNaeo8\nXgQ4RpGUxdmoUZvYdSuGHc64A/ZCWPSOLB/QIbbkK+HlX4r8wQhzW0Vn+8wEohSd\nO2apH7YSasolYK34qhflYAWacQvujjB5xGUm8QK8Rg0V6IHrpKUmDlV+PYV0XU6C\n4fZg/gof8o8LlyTd4r44heouEQ==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-lqfs8@community-app-a2ac0.iam.gserviceaccount.com",
  client_id: "108881680306098415821",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lqfs8%40community-app-a2ac0.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// const serviceAccount = {
//   type: process.env.type,
//   project_id: process.env.project_id,
//   private_key_id: process.env.private_key_id,
//   private_key: process.env.private_key.replace(/\\n/g, "\n"),
//   client_email: process.env.client_email,
//   client_id: process.env.client_id,
//   auth_uri: process.env.auth_uri,
//   token_uri: process.env.token_uri,
//   auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
//   client_x509_cert_url: process.env.client_x509_cert_url,
//   universe_domain: process.env.universe_domain,
// };

initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/test", function (req, res) {
  res.status(200).json({
    message: "successfully loaded",
  });
});

app.post("/send", function (req, res) {
  const topic = "notify";

  const message = {
    data: {
      score: "850",
      time: "2:45",
    },

    topic: topic,
  };

  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "successfully sent notification",
        response: response,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "couldn't send notification",
        error: error,
      });
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

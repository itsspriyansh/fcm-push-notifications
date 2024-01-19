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
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key.replace(/\\n/g, "\n"),
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: process.env.universe_domain,
};

initializeApp({
  credential: admin.credential.cert(serviceAccount),
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

const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

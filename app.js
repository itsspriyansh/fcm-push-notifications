const express = require("express");
const admin = require("firebase-admin");
const { getMessaging } = require("firebase-admin/messaging");
const { initializeApp } = require("firebase-admin/app");
const serviceAccount = require("./community-app-a2ac0-firebase-adminsdk-lqfs8-7f994ad5f5.json");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

const corsOption = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOption));

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

// const serviceAccount = {
//   type: process.env.type,
//   project_id: process.env.project_id,
//   private_key_id: process.env.private_key_id,
//   private_key: process.env.private_key,
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
console.log("error aa rhi hai yar...");
app.get("/test", function (req, res) {
  res.status(200).json({
    message: "successfully loaded",
  });
});

app.post("/send", function (req, res) {
  const message = {
    notification: req.body,
    topic: "notify",
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

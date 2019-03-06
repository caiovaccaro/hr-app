import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from "mobx-react";
import RootStore from "./Store";
import ActionsWrapper from "./Actions";
import multer from "multer";
import cloudinary from "cloudinary";
import fs from "fs";

// The RootStore and Actions need to be initialized here too, so Server Side
// Rendering works properly, for components that need them.
const Store = new RootStore();
const Actions = new ActionsWrapper(Store);

cloudinary.config({
  cloud_name: 'dmwjwmiy5',
  api_key: '947513484179248',
  api_secret: 't9yclgcZ1TRi6wq4esm8DjAOddw'
});

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname + '/../uploads/');
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
});

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
      <Provider store={Store} actions={Actions}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Qulture HR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''}
        ${process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

server.post('/upload', (req, res, next) => {
  const upload = multer({ storage }).single('profilepic');

  upload(req, res, function(err) {
    if (err) {
      return res.send(err);
    }

    const path = req.file.path;

    cloudinary.v2.uploader.upload(path,
      function(err, image) {
        if (err) {
          return res.send(err);
        }

        console.log('File uploaded to Cloudinary.');

        fs.unlinkSync(path);
        res.json(image);
      }
    )
  });
});

export default server;

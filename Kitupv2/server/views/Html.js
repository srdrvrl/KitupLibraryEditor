/* eslint-disable react/no-danger, react/prop-types */
import React from 'react';

export default ({ assets, markup, styles }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>Kitup Library Editor</title>
      <style type="text/css">
        {styles}
      </style>
    </head>
    <body>
      <div>
        <div dangerouslySetInnerHTML={{ __html: markup }} id="root" />
      </div>
      <script src={assets.vendor.js} />
      <script src={assets.main.js} />
    </body>
  </html>
);

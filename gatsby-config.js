const appConfig = require('./appConfig');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

// console.log(process.env.NODE_ENV);

// const buildCredentials = ({ PROJECT_ID, PRIVATE_KEY, PRIVATE_KEY_ID }) => ({
//   type: 'service_account',
//   project_id: PROJECT_ID,
//   private_key_id: PRIVATE_KEY_ID,
//   private_key: PRIVATE_KEY.replace(/(\\r)|(\\n)/g, '\n'),
//   client_email: `${PROJECT_ID}@prova-301812.iam.gserviceaccount.com`,
//   client_id: '106167533223409130594',
//   auth_uri: 'https://accounts.google.com/o/oauth2/auth',
//   token_uri: 'https://oauth2.googleapis.com/token',
//   auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
//   client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${PROJECT_ID}%40prova-301812.iam.gserviceaccount.com`,
// });

// const SPREADSHEET_ID = '1Hu4ubW_8s-fBkXnFsJ5cODQhr3Y7gUqlIgi_sjynH4s';


const { theme, ...siteMetadata } = appConfig;

module.exports = {
  siteMetadata,
  plugins: [
    `gatsby-plugin-typescript`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-google-sheets',
      options: {
        spreadsheetId: process.env.SPREADSHEET_ID,
        worksheetTitle: 'Prenotazioni',
        // credentials: require('./prova-301812-9cb1a1a8fef5.json'),
        credentials: {
          type: 'service_account',
          project_id: process.env.PROJECT_ID,
          private_key_id: process.env.PRIVATE_KEY_ID,
          private_key: process.env.PRIVATE_KEY.replace(/(\\r)|(\\n)/g, '\n'),
          client_email: `ilaria@${process.env.PROJECT_ID}.iam.gserviceaccount.com`,
          client_id: '117747957873529717750',
          auth_uri: 'https://accounts.google.com/o/oauth2/auth',
          token_uri: 'https://oauth2.googleapis.com/token',
          auth_provider_x509_cert_url:
            'https://www.googleapis.com/oauth2/v1/certs',
          client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/ilaria%40${process.env.PROJECT_ID}.iam.gserviceaccount.com`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/media`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-event-calendar',
        short_name: 'starter-calendar',
        start_url: '/',
        background_color: theme.background,
        theme_color: theme.brand,
        display: 'minimal-ui',
        icon: 'media/icon.png', //da cambiare (NO .svg)
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `n1y5p4gy06kl`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    // 'gatsby-plugin-offline',
  ],
};

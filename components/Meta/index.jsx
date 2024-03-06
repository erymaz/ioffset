import React from 'react';
import Head from 'next/head';

const Meta = props => {
  const { title, description } = props;
  return (
    <Head>
      <title>{title} | iOffset</title>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
      <link rel="icon" href="images/icons/favicon.png" />
      {/* Global site tag (gtag.js) - Google Analytics */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-164742796-1"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];  function gtag(){dataLayer.push(arguments);}  gtag('js', new Date());  gtag('config', 'UA-164742796-1');`,
        }}
      ></script>
    </Head>
  );
};

export default Meta;

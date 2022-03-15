import React from 'react';
import { NextSeo } from 'next-seo';

import { Media, MediaContextProvider } from '@media';
import Head from 'next/head';
import Error from 'next/error';
import { getElectionInfo } from '@utils/Helpers';


const slug = ({metainfo,language}) => {
      
    

  return (
    <>
     <Head>
              <title>{metainfo.title}</title>
              <link rel="canonical" href={"https://www.etvbharat.com/english/national/elections-2022"}></link>
              </Head>
              <NextSeo
              title={
                metainfo.title !== '' &&
                !metainfo.title.includes('canonical tag')
                  ? metainfo.title
                  : 'ETV Bharat'
              }
              description={metainfo.description}
              additionalMetaTags={[
                {
                  name: 'keywords',
                  content: metainfo.keywords,
                },
              ]}
              
              twitter={{
                handle: '@etvbharat',
                site: '@etvbharat',
                cardType: 'summary_large_image',
              }}
            />
        <MediaContextProvider>
       <Media at="xs">
       
       <iframe key={language} frameBorder={0} style={{height: '3900px', overflow: 'scroll', width: '100%'}} src="../../elections/index.html"  name={language} id={language} seamless="seamless" scrolling="no" allowTransparency="true" />
       </Media>
       <Media greaterThan="xs" >
       <iframe key={language} frameBorder={0} style={{height: '1700px', overflow: 'scroll', width: '100%'}} src="../../elections/index.html"  name={language} id={language} seamless="seamless" scrolling="no" allowTransparency="true" />
        </Media>
      </MediaContextProvider>
    </>
  );
};

export default slug;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params, ...args }) {
  const lang = params.language;
  const state = params.state;
   let finalkey = lang === 'urdu' && state === 'national' ? "urdunational":state;
   let metadata = getElectionInfo(finalkey);
  return{
    props:   {
      metainfo: metadata,
      language:lang
      }
  }
}
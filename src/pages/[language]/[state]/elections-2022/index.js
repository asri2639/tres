import React from 'react';
import { NextSeo } from 'next-seo';

import { Media, MediaContextProvider } from '@media';

import Error from 'next/error';



const slug = () => {
      
    

  return (
    <>
        <MediaContextProvider>
       <Media at="xs">
       
       <iframe frameBorder={0} style={{height: '3900px', overflow: 'scroll', width: '100%'}} src="https://old.etvbharat.com/elections"  name="elections" id="elections" seamless="seamless" scrolling="no" allowTransparency="true" />
       </Media>
       <Media greaterThan="xs" >
       <iframe frameBorder={0} style={{height: '1700px', overflow: 'scroll', width: '100%'}} src="https://old.etvbharat.com/elections"  name="elections" id="elections" seamless="seamless" scrolling="no" allowTransparency="true" />
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
  return{
    props:   {

      }
  }
}

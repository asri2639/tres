import { useRouter } from 'next/router';

const language = () => {
  const router = useRouter();

  if (router.isFallback) {
    return <h2>Loading...</h2>;
  }
  return <div></div>;
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps() {
  return {
    redirect: {
      destination: '/english/national',
      permanent: true,
    },
  };
}

export default language;

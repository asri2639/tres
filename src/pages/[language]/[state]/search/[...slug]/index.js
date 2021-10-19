import { useRouter } from 'next/router';

const slug = () => {
  const router = useRouter();

  if (router.isFallback) {
    return <h2 className="loading"></h2>;
  }
  return <></>;
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const url = `https://old.etvbharat.com/${params.language}/${params.state}/search/${params.slug.join('/')}`;

  return {
    redirect: {
      destination: url,
      permanent: true,
    },
  };
}

export default slug;

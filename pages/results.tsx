import Layout from '@components/layout';
import Loading from '@components/loading';
import { useQuizGame } from '@lib/index';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';

const Results: NextPage = () => {
  const { userAnswers, questions } = useQuizGame();
  const { push } = useRouter();

  useEffect(() => {
    // if quesitons/answers have not be loaded go to index.
    if (isEmpty(userAnswers) || isEmpty(questions)) {
      push('/');
    }
  }, []);

  if (isEmpty(userAnswers)) return <Loading />;

  return (
    <Layout
      header={
        <h1 className="font-bold text-xl w-48 mx-auto md:w-auto lg:text-2xl">
          Lorem impusm
        </h1>
      }
    >
      <div className="flex flex-col w-56 h-full justify-between py-8 text-center mx-auto lg:w-96">
        <p className="text-lg">Lorem impusm</p>
        <p className="font-bold italic"> Lorem impusm</p>
      </div>
    </Layout>
  );
};

export default Results;

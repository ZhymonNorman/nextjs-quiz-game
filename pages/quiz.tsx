import Layout from '@components/layout';
import Loading from '@components/loading';
import { useQuizGame } from '@lib/index';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';

const Quiz: NextPage = () => {
  const { questions, currentQuestionIndex } = useQuizGame();
  const { push } = useRouter();
  const [numQuestions, setNumQuestions] = useState<number>(0);

  useEffect(() => {
    // if quesitons have not be loaded go to index.
    if (isEmpty(questions)) {
      push('/');
    }
  }, []);

  useEffect(() => {
    setNumQuestions(questions && questions.length);
  }, [questions]);

  if (isEmpty(questions)) return <Loading />;

  return (
    <Layout
      header={
        <h1 className="font-bold text-xl w-48 mx-auto md:w-auto lg:text-2xl">
          {questions[currentQuestionIndex].category}
        </h1>
      }
    >
      <div className="flex flex-col w-56 h-full justify-between py-8 text-center mx-auto lg:w-96">
        <p className="text-lg border-2 rounded-md border-black/10 h-full my-6 p-8">
          {questions[currentQuestionIndex].question &&
            parse(questions[currentQuestionIndex].question)}
        </p>
        <span className="font-semibold flex flex-row w-fit mx-auto text-white bg-zinc-500 px-3 py-1 tracking-wider rounded-xl">{`${
          currentQuestionIndex + 1
        } of ${numQuestions}`}</span>
      </div>
    </Layout>
  );
};

export default Quiz;

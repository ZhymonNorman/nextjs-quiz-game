import Layout from '@components/layout';
import Loading from '@components/loading';
import { useQuizGame } from '@lib/index';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { getBoolFromText, UserAnswer } from '@types';

const Quiz: NextPage = () => {
  const { questions, currentQuestionIndex, userAnswers, submitAnswer } =
    useQuizGame();
  const { push } = useRouter();
  const [numQuestions, setNumQuestions] = useState<number>(0);

  const handleAnswer = (selection: boolean) => {
    const answer: UserAnswer = {
      num: currentQuestionIndex,
      question: questions[currentQuestionIndex].question,
      correctAnswer: getBoolFromText(
        questions[currentQuestionIndex].correct_answer
      ),
      answer: selection,
    };

    submitAnswer(answer);
  };

  useEffect(() => {
    // if quesitons have not be loaded go to index.
    if (isEmpty(questions)) {
      push('/');
    }
  }, []);

  useEffect(() => {
    setNumQuestions(questions && questions.length);
  }, [questions]);

  useEffect(() => {
    if (userAnswers.length === questions.length) {
      console.log('all questions answered');
    }
  }, [userAnswers]);

  if (isEmpty(questions)) return <Loading />;

  console.log({ currentQuestionIndex });

  return (
    <Layout
      header={
        <h1 className="font-bold text-xl w-48 mx-auto md:w-auto lg:text-2xl">
          {questions[currentQuestionIndex].category}
        </h1>
      }
    >
      <div className="flex flex-col w-56 h-full justify-between py-4 text-center mx-auto lg:w-96">
        <div className=" flex flex-col justify-between border-2 rounded-md border-black/20 h-full mt-3 mb-6 p-8">
          <p className="text-lg">
            {questions[currentQuestionIndex].question &&
              parse(questions[currentQuestionIndex].question)}
          </p>
          <div className="hidden flex-row lg:flex">
            <button
              onClick={() => handleAnswer(true)}
              className="w-fit tracking-wider text-lg font-semibold mx-auto uppercase px-6 py-3 text-white transition transform-gpu ease-in-out shadow-sm rounded-md bg-green-600 hover:bg-green-600/50 hover:scale-105"
            >
              <FontAwesomeIcon icon={solid('circle-check')} />
              <span className="ml-1">true</span>
            </button>
            <button className="w-fit tracking-wider text-lg font-semibold mx-auto uppercase px-6 py-3 text-white transition transform-gpu ease-in-out shadow-sm rounded-md bg-red-600 hover:bg-red-600/50 hover:scale-105">
              <FontAwesomeIcon
                onClick={() => handleAnswer(false)}
                icon={solid('circle-xmark')}
              />
              <span className="ml-1">false</span>
            </button>
          </div>
          <div className="flex flex-row lg:hidden">
            <button
              onClick={() => handleAnswer(true)}
              className="w-fit tracking-wider text-lg font-semibold mx-auto uppercase px-6 py-3 text-white transition transform-gpu ease-in-out shadow-sm rounded-md bg-green-600 hover:bg-green-600/50 hover:scale-105"
            >
              <FontAwesomeIcon icon={solid('circle-check')} />
            </button>
            <button className="w-fit tracking-wider text-lg font-semibold mx-auto uppercase px-6 py-3 text-white transition transform-gpu ease-in-out shadow-sm rounded-md bg-red-600 hover:bg-red-600/50 hover:scale-105">
              <FontAwesomeIcon
                onClick={() => handleAnswer(false)}
                icon={solid('circle-xmark')}
              />
            </button>
          </div>
        </div>
        <span className="font-semibold flex flex-row w-fit mx-auto text-black/30 bg-turquoiseBlue px-3 py-1 tracking-wider rounded-xl">{`${
          currentQuestionIndex + 1
        } of ${numQuestions}`}</span>
      </div>
    </Layout>
  );
};

export default Quiz;

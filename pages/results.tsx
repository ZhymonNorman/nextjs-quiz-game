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
import Link from 'next/link';

const Results: NextPage = () => {
  const { userAnswers, questions } = useQuizGame();
  const [numberCorrect, setNumberCorrect] = useState<number>(0);
  const [numberOfQuestions, setNumQuestions] = useState<number>(0);
  const { push } = useRouter();

  useEffect(() => {
    // if quesitons/answers have not be loaded go to index.
    if (isEmpty(userAnswers) || isEmpty(questions)) {
      push('/');
    }
  });

  useEffect(() => {
    setNumQuestions(userAnswers.length);
    let num = 0;
    userAnswers.forEach((userAnswer) => {
      if (userAnswer.answer === userAnswer.correctAnswer) {
        num = num + 1;
      }
    });
    setNumberCorrect(num);
  }, [questions]);

  //   if (numberOfQuestions === 0) return <Loading />;

  return (
    <Layout
      header={
        <h1 className="font-bold text-xl w-48 mx-auto md:w-auto lg:text-2xl">
          {`You Scored`}
          <br />
          {`${numberCorrect}/${numberOfQuestions}`}
        </h1>
      }
      footer={
        <Link href="/">
          <button className="w-fit tracking-wider text-lg font-semibold mx-auto uppercase px-6 py-3 text-white transition transform-gpu ease-in-out shadow-sm rounded-md bg-persianOrange hover:bg-caribbeanGreen hover:scale-105">
            play again?
          </button>
        </Link>
      }
    >
      <div className="flex flex-col w-56 h-[40rem] justify-between py-8 text-center mx-auto lg:w-96">
        <div className="overflow-y-auto pb-12">
          <ul className="space-y-4 text-left text-md">
            {userAnswers.map((userAnswer) => {
              return (
                <li>
                  <span className="flex flex-row items-center leading-5 space-x-2">
                    {userAnswer.answer === userAnswer.correctAnswer ? (
                      <FontAwesomeIcon
                        icon={solid('circle-check')}
                        className="bg-green-600 fill-current text-white p-1 rounded-full"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={solid('circle-xmark')}
                        className="bg-red-600 fill-current text-white p-1 rounded-full"
                      />
                    )}
                    <p>{parse(userAnswer.question)}</p>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Results;

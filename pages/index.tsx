import ErrorMessage from '@components/errorMessage';
import Layout from '@components/layout';
import Loading from '@components/loading';
import { useQuizGame } from '@lib/index';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (...args: any) => fetch(args).then((res) => res.json());

const Index: NextPage = () => {
  const { data, error } = useSWR('/api/get-questions', fetcher);
  const { setQuestions } = useQuizGame();

  useEffect(() => {
    if (!data) return;
    if (data.results) {
      setQuestions(data);
    }
  }, [data]);

  if (error) return <ErrorMessage />;
  if (!data) return <Loading />;

  return (
    <Layout
      header={
        <h1 className="font-bold text-xl w-48 mx-auto md:w-auto lg:text-2xl">
          Welcome to the Trivia Challenge!
        </h1>
      }
      footer={
        <Link href="/quiz">
          <button className="w-fit tracking-wider text-lg font-semibold mx-auto uppercase px-6 py-3 text-white transition transform-gpu ease-in-out shadow-sm rounded-md bg-caribbeanGreen hover:bg-persianOrange hover:scale-105">
            begin
          </button>
        </Link>
      }
    >
      <div className="flex flex-col w-56 h-full justify-between py-8 text-center mx-auto lg:w-96">
        <p className="text-lg">
          You will be presented
          <br />
          with 10 True or False questions.
        </p>
        <p className="font-bold italic">Can you score 100%?</p>
      </div>
    </Layout>
  );
};

export default Index;

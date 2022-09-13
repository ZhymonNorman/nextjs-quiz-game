import ErrorMessage from '@components/errorMessage';
import Loading from '@components/loading';
import { useQuizGame } from '@lib/index';
import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import useSWR from 'swr';

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
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Index;

import { useQuizGameContext } from './QuizGameContextProvider';

const useQuizGame = () => {
  const { userAnswers, submitAnswer, questions, setQuestions } =
    useQuizGameContext();

  return {
    userAnswers,
    submitAnswer,
    questions,
    setQuestions,
  };
};

export default useQuizGame;

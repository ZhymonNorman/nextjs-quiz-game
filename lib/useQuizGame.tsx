import { useQuizGameContext } from './QuizGameContextProvider';

const useQuizGame = () => {
  const {
    userAnswers,
    submitAnswer,
    questions,
    setQuestions,
    currentQuestionIndex,
  } = useQuizGameContext();

  return {
    userAnswers,
    submitAnswer,
    questions,
    setQuestions,
    currentQuestionIndex,
  };
};

export default useQuizGame;

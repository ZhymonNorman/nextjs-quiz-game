import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { QuizApiResType, Question, UserAnswer } from '@types';

export interface IQuizGameContext {
  setQuestions(questions: QuizApiResType): void;
  questions: Question[];
  submitAnswer(newAnswer: UserAnswer): void;
  userAnswers: UserAnswer[];
  currentQuestionIndex: number;
}

interface Props {
  children: ReactNode;
}

const QuizGameContext = createContext<IQuizGameContext | undefined>(undefined);
const useQuizGameContext = (): IQuizGameContext => {
  const context = useContext(QuizGameContext);

  if (!context) {
    throw new Error(
      'useQuizGameContext must be used within a QuizGameProivder'
    );
  }

  return context;
};

function QuizGameProvider({ children }: Props) {
  const [questions, _setQuestions] = useState<Question[]>([]);
  const [userAnswers, _submitAnswer] = useState<UserAnswer[]>([]);
  const [currentQuestionIndex, _setCurrentQuestion] = useState<number>(0);

  const QuizContextValue: IQuizGameContext = {
    questions,
    userAnswers,
    setQuestions: (questions) => {
      _setQuestions(questions.results);
    },
    submitAnswer: (newAnswer) => {
      console.log({ newAnswer });
      let newArray = userAnswers;
      newArray.push(newAnswer);
      _setCurrentQuestion(currentQuestionIndex + 1);
      _submitAnswer(newArray);
    },
    currentQuestionIndex: currentQuestionIndex,
  };

  return (
    <QuizGameContext.Provider value={QuizContextValue}>
      {children}
    </QuizGameContext.Provider>
  );
}

export { QuizGameProvider, useQuizGameContext };

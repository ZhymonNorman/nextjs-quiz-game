import {
  createContext,
  useContext,
  FC,
  useState,
  ReactNode,
  Children,
} from 'react';

import { QuizApiResType, Question, UserAnswer } from '@types';

export interface IQuizGameContext {
  setQuestions(questions: QuizApiResType): void;
  questions: Question[];
  submitAnswer(newAnswer: UserAnswer): void;
  userAnswers: UserAnswer[];
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

  const QuizContextValue: IQuizGameContext = {
    questions,
    userAnswers,
    setQuestions: (questions) => {
      _setQuestions(questions.results);
    },
    submitAnswer: (newAnswer) => {
      let newArray = userAnswers;
      newArray.push(newAnswer);
      _submitAnswer(newArray);
    },
  };

  return (
    <QuizGameContext.Provider value={QuizContextValue}>
      {children}
    </QuizGameContext.Provider>
  );
}

export { QuizGameProvider, useQuizGameContext };

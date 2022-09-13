export interface ObjectLiteral {
  [key: string]: any;
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string;
}

export interface QuizApiResType {
  response_code: number;
  results: Array<Question>;
}

export interface UserAnswer {
  num: number;
  question: string;
  correctAnswer: 'True' | 'False';
}

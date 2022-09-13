import '../styles/globals.css';
import '@fontsource/mulish/400.css';
import '@fontsource/mulish/500.css';
import '@fontsource/mulish/600.css';
import '@fontsource/mulish/700.css';
import '@fontsource/mulish/800.css';
import type { AppProps } from 'next/app';
import { QuizGameProvider } from '@lib/index';
import ErrorBoundary from '@components/errorBoundary';
import Head from 'next/head';

function QuizApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Head>
        <title>
          Quiz Game | A modern React example project, circa 2022 | @ZhymonNorman
        </title>
      </Head>
      <QuizGameProvider>
        <Component {...pageProps} />
      </QuizGameProvider>
    </ErrorBoundary>
  );
}

export default QuizApp;

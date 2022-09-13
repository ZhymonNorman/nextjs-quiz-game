import { ReactNode } from 'react';

interface Props {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Layout({ children, header, footer }: Props) {
  return (
    <div className="scale-in-center flex flex-col p-8 bg-zinc-200 text-center shadow-md h-[30rem] mt-36 mx-8 rounded-xl lg:mt-24 lg:mx-auto lg:max-w-lg">
      {header}
      {children}
      {footer}
    </div>
  );
}

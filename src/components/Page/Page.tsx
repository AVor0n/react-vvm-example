import clsx from 'clsx';
import { type ReactNode } from 'react';
import * as styles from './Page.module.scss';

export interface PageProps {
  title: string;
  children: ReactNode;
  cls?: string;
}

export const Page = ({ title, children, cls }: PageProps) => (
  <div className={styles.container}>
    <h1 className={styles.header}>{title}</h1>
    <div className={clsx(styles.content, cls)}>{children}</div>
  </div>
);

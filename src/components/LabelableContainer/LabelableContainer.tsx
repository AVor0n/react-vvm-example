import { type ReactNode } from 'react';
import * as styles from './LabelableContainer.module.scss';

export interface LabelableContainerProps {
  label: string;
  children: ReactNode;
}

export const LabelableContainer = ({ label, children }: LabelableContainerProps) => (
  <div className={styles.container}>
    <label className={styles.label}>{label}</label>
    {children}
  </div>
);

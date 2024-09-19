import { useState } from 'react';
import style from './styles/StackCard.module.css';

interface StackCardProps {
  titleText: string;
}

export default function StackCard({ titleText }: StackCardProps) {  
  const [stackCount, setStackCount] = useState(0);

  const handleStack = () => {
    setStackCount(stackCount + 1);
  }

  return (
    <div className={style.container}>
      <div className={style.titleText}>
        {titleText}
      </div>
      <div className={style.stackCount}>
        {stackCount}
      </div>
      <div>
        <button onClick={handleStack}>Plus</button>
      </div>
    </div>
  );
}

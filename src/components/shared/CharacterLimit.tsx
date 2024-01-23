import { useState, useEffect } from 'react';

export const CharacterLimit = ({ text, limit }: {text: string, limit: number}) => {
  const [truncatedText, setTruncatedText] = useState(text);

  useEffect(() => {
    if (text.length > limit) {
      setTruncatedText(text.slice(0, limit) + '...');
    } else {
      setTruncatedText(text);
    }
  }, [text, limit]);

  return <>{truncatedText}</>;
};
import { FC } from "react";
import { Stack, IStackTokens, Depths, mergeStyles } from '@fluentui/react';

type CardProps = {};

export const Card: FC<CardProps> = ({ children }) => {
  const cardStyle = mergeStyles({
    boxShadow: Depths.depth8,
    borderRadius: '3px',
    background: 'white',
  });

  const cardTokens: IStackTokens = {
    padding: 's1 m',
  };

  return (
    <Stack tokens={cardTokens} className={cardStyle}>
      {children}
    </Stack>
  );
};

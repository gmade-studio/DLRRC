import { FC } from 'react';
import { Stack, IStackProps, Sticky, StickyPositionType, mergeStyles } from '@fluentui/react';

interface ILayoutProps {
  header: JSX.Element;
  content: JSX.Element;
  aside: JSX.Element;
  footer: JSX.Element;
}

const Layout: FC<ILayoutProps> = ({ header, content, aside, footer }) => {
  return (
    <Stack>
      <Stack>{header}</Stack>
      <Stack horizontal>
        <Stack>{content}</Stack>
        <Stack>{aside}</Stack>
      </Stack>
      <Stack>{footer}</Stack>
    </Stack>
  );
};

export default Layout;

import { FC } from 'react';
import { Stack, IStackTokens, mergeStyles } from '@fluentui/react';

interface ILayoutProps {
  header: JSX.Element;
  main: JSX.Element;
  footer: JSX.Element;
}

const Layout: FC<ILayoutProps> = ({ header, main, footer }) => {
  return (
    <Stack>
      <Stack horizontal verticalAlign="center" className={headerStyle} tokens={headerTokens}>
        {header}
      </Stack>
      <Stack horizontal className={mainStyle}>
        {main}
      </Stack>
      <Stack wrap={true} horizontal horizontalAlign="space-between" verticalAlign="center" tokens={footerTokens} className={footerStyle}>
        {footer}
      </Stack>
    </Stack>
  );
};

export default Layout;

const headerStyle = mergeStyles({
  borderBottom: '1px solid',
  borderBottomColor: '#e9e8e7',
});

const mainStyle = mergeStyles({
  width: '100%',
  background: '#f2f2f2',
});

const footerStyle = mergeStyles({
  borderBottom: '1px solid',
  borderBottomColor: '#e9e8e7',
  background: '#e8e6df',
});

const headerTokens: IStackTokens = {
  padding: 's1 m', 
  childrenGap: 'l1',
};

const footerTokens: IStackTokens = {
  padding: 'l2',
};

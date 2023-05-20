import { Component } from 'react';
import { Stack, getTheme, mergeStyleSets } from '@fluentui/react';

interface ILayoutProps {
  header: JSX.Element;
  navigation: JSX.Element;
  main: JSX.Element;
  footer: JSX.Element;
}

export class Layout extends Component<ILayoutProps, {}> {
  constructor(props: ILayoutProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { header, navigation, main, footer } = this.props;
    return (
      <Stack>
        <Stack horizontal horizontalAlign="center" verticalAlign="center" className={classNames.headerWrapper} tokens={tokens.headerWrapper}>
          <Stack horizontal verticalAlign="center" className={classNames.header} tokens={tokens.header}>
            {header}
          </Stack>
        </Stack>
        <Stack horizontalAlign="center" verticalAlign="center" className={classNames.navigationWrapper} tokens={tokens.navigationWrapper}>
          <Stack verticalAlign="center" className={classNames.navigation}>
            {navigation}
          </Stack>
        </Stack>
        {main}
        <Stack wrap={true} horizontal horizontalAlign="center" verticalAlign="center" className={classNames.footerWrapper} tokens={tokens.footerWrapper}>
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center" className={classNames.footer} tokens={tokens.footer}>
            {footer}
          </Stack>
        </Stack>
      </Stack>
    );
  }
}

const theme = getTheme();

const classNames = mergeStyleSets({
  headerWrapper: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.neutralQuaternaryAlt,
    minWidth: '480px',
  },
  header: {
    width: '100%',
    maxWidth: '1768px',
  },
  navigationWrapper: {
    borderBottom: '1px solid',
    borderBottomColor: theme.palette.neutralQuaternaryAlt,
    minWidth: '480px',
  },
  navigation: {
    width: '100%',
    maxWidth: '1768px',
  },
  footerWrapper: {
    borderTop: '1px solid',
    borderTopColor: theme.palette.neutralQuaternaryAlt,
    background: theme.palette.neutralLight,
    minWidth: '480px',
  },
  footer: {
    width: '100%',
    maxWidth: '1768px',
  }
})

const tokens = {
  headerWrapper: {
    padding: '12px 0', 
  },
  header: {
    padding: '0 s1',
    childrenGap: 'l1',
  },
  navigationWrapper: {
    padding: 's1 0',
  },
  contentArea: {
    padding: '24px',
    childrenGap: 'l1'
  },
  footerWrapper: {
    padding: 'l2',
  },
  footer: {
    padding: '0 s1',
    childrenGap: 'l1',
  },
}

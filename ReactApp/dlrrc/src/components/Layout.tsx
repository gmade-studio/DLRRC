import { Component } from 'react';
import { Stack, mergeStyleSets } from '@fluentui/react';

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

  render() {
    const { header, navigation, main, footer } = this.props;
    return (
      <Stack>
        <Stack horizontal verticalAlign="center" className={classNames.header} tokens={tokens.header}>
          {header}
        </Stack>
        <Stack className={classNames.navigation} tokens={tokens.navigation}>
          {navigation}
        </Stack>
        <Stack id="main" horizontalAlign="center" className={classNames.main}>
          <Stack className={classNames.contentArea} tokens={tokens.contentArea}>
            {main}
          </Stack>
        </Stack>
        <Stack wrap={true} horizontal horizontalAlign="space-between" verticalAlign="center" className={classNames.footer} tokens={tokens.footer}>
          {footer}
        </Stack>
      </Stack>
    );
  }
}

const classNames = mergeStyleSets({
  header: {
    borderBottom: '1px solid',
    borderBottomColor: '#e9e8e7',
  },
  navigation: {
    borderBottom: '1px solid',
    borderBottomColor: '#e9e8e7',
  },
  main: {
    width: '100%',
    background: '#f2f2f2',
    minHeight: '100vh'
  },
  contentArea: {
    maxWidth: '960px',
    minWidth: '480px',
    width: '100%'
  },
  footer: {
    borderBottom: '1px solid',
    borderBottomColor: '#e9e8e7',
    background: '#e8e6df',
  }
})

const tokens = {
  header: {
    padding: '12px m', 
    childrenGap: 'l1',
  },
  navigation: {
    padding: 's2 s1',
  },
  contentArea: {
    padding: '24px',
    childrenGap: 'l1'
  },
  footer: {
    padding: 'l2',
  }
}

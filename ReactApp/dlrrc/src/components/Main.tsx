import { Component } from 'react';
import { Pivot, PivotItem, Stack, getTheme, mergeStyleSets } from '@fluentui/react';
import { About, ViewRange, ScoreRange, Downloads } from '.';
import { Checklist } from '../models';
import * as dlrrc from '../data/dlrrc.min.json';

interface IMainState {
  selectedKey: string | undefined;
};

export class Main extends Component<{}, IMainState> {
  constructor() {
    super({});
    this.state = {
      selectedKey: 'aboutDlrrc'
    };
  }

  public render(): JSX.Element {
    const { selectedKey } = this.state;
    const checklist: Checklist = dlrrc
    return (
      <Stack id="main" horizontalAlign="center" className={classNames.main}>
        <Stack horizontal className={classNames.pivotContainer} tokens={tokens.pivotContainer}>
          <Pivot selectedKey={selectedKey} onLinkClick={this._handleLinkClick} headersOnly={true}>
            <PivotItem headerText="About DLRRC" itemKey="aboutDlrrc"/>
            <PivotItem headerText="View DLRRC" itemKey="viewDlrrc"/>
            <PivotItem headerText="Score a report" itemKey="scoreAReport"/>
            <PivotItem headerText="Downloads" itemKey="downloads"/>
          </Pivot>
        </Stack>
        <Stack id="contentArea" className={classNames.contentArea}>
          <Stack className={selectedKey == 'aboutDlrrc' ? undefined : classNames.hidden} tokens={tokens.contentArea}>
            <About/>
          </Stack>
          <Stack className={selectedKey == 'viewDlrrc' ? undefined : classNames.hidden} tokens={tokens.contentArea}>
            <ViewRange parts={checklist.parts} />
          </Stack>
          <Stack className={selectedKey == 'scoreAReport' ? undefined : classNames.hidden} tokens={tokens.contentArea}>
            <ScoreRange totalScore={checklist.totalScore} parts={checklist.parts} />
          </Stack>
          <Stack className={selectedKey == 'downloads' ? undefined : classNames.hidden} tokens={tokens.contentArea}>
            <Downloads/>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  private _handleLinkClick = (item?: PivotItem) => {
    if (item) {
      this.setState({
        selectedKey: item.props.itemKey!
      });
      this._scrollToMain();
    }
  };

  private _scrollToMain = () => {
    let anchorElement = document.getElementById('main');
    if(anchorElement) { anchorElement.scrollIntoView(); }
  }
}

const theme = getTheme();

const classNames = mergeStyleSets({
  main: {
    width: '100%',
    background: '#f2f2f2',
    minWidth: '480px',
    minHeight: '100vh',
  },
  contentArea: {
    maxWidth: '960px',
    minWidth: '480px',
    width: '100%'
  },
  pivotContainer: {
    width: '100%',
    backgroundColor: theme.palette.white,
  },
  hidden: {
    display: 'none'
  }
});

const tokens = {
  pivotContainer: {
    padding: 's2 s1',
  },
  contentArea: {
    padding: '24px',
    childrenGap: 'l1'
  }
}

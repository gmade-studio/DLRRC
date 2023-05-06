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

  handleLinkClick = (item?: PivotItem) => {
    if (item) {
      this.setState({
        selectedKey: item.props.itemKey!
      });
    }
  };

  content = () => {
    const { selectedKey } = this.state;
    const checklist: Checklist = dlrrc
    switch (selectedKey) {
      case 'viewDlrrc':
        return <ViewRange parts={checklist.parts} />;
      case 'scoreAReport':
        return <ScoreRange totalScore={checklist.totalScore} parts={checklist.parts} />;
      case 'downloads':
        return <Downloads/>;
      default:
        return <About/>;
    }
  }

  render() {
    const { selectedKey } = this.state;
    return (
      <Stack horizontalAlign="center" className={classNames.main}>
        <Stack horizontal className={classNames.pivotContainer} tokens={tokens.pivotContainer}>
          <Pivot selectedKey={selectedKey} onLinkClick={this.handleLinkClick} headersOnly={true}>
            <PivotItem headerText="About DLRRC" itemKey="aboutDlrrc"/>
            <PivotItem headerText="View DLRRC" itemKey="viewDlrrc"/>
            <PivotItem headerText="Score a report" itemKey="scoreAReport"/>
            <PivotItem headerText="Downloads" itemKey="downloads"/>
          </Pivot>
        </Stack>
        <Stack id="contentArea" className={classNames.contentArea} tokens={tokens.contentArea}>
          {this.content()}
        </Stack>
      </Stack>
    );
  }
}

const theme = getTheme();

const classNames = mergeStyleSets({
  main: {
    width: '100%',
    background: '#f2f2f2',
    minWidth: '480px'
  },
  contentArea: {
    maxWidth: '960px',
    minWidth: '480px',
    minHeight: '100vh',
    width: '100%'
  },
  pivotContainer: {
    width: '100%',
    backgroundColor: theme.palette.white,
  },
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

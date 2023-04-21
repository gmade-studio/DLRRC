import { Component } from 'react';
import { Stack, Text, Breadcrumb, IBreadcrumbItem, IStackTokens } from '@fluentui/react';
import PartRange from './PartRange';
import { Card } from './Card';
import { Part } from './types';

interface IChecklistRangeProps {
  totalScore: number;
  parts: Part[];
}

interface IChecklistRangeState {
  currentScore: number | undefined;
  partRanges: Array<{no: string, currentScore: number}>;
}

export default class ChecklistRange extends Component<IChecklistRangeProps, IChecklistRangeState> {
  constructor(props: IChecklistRangeProps) {
    super(props);
    this.state = {
      currentScore: 0,
      partRanges: props.parts.map((part) => ({no: part.no, currentScore: 0}))
    };
  }

  handlePartScoreChange = (no: string, newScore: number) => {
    const partRanges = [...this.state.partRanges];
    const index = partRanges.findIndex(part => part.no === no);
    if (index >= 0) {
      partRanges[index].currentScore = newScore;
      const currentScore = partRanges.reduce((acc, part) => acc + part.currentScore, 0);
      this.setState({ currentScore, partRanges });
    }
    console.log(partRanges);
  };

  render() {
    const { partRanges, currentScore } = this.state;
    const { totalScore, parts } = this.props;
    return (
      <>
        <Breadcrumb
          items={breadcrubmItems}
          maxDisplayedItems={10}
        />
        <Stack tokens={checklistTokens}>
          <Card>
            <Stack>
              <Text variant="large">About</Text>
              <Text>
                This is a preview version of the app. All core functions are already. Features and UI will be updated later.
              </Text>
              <Text>
                Notice: Part scores are summarized at the end of each part; total score is listed at the end of the app.
              </Text>
            </Stack>
          </Card>
          {partRanges.map(partRange => {
            const part = parts.find((part) => part.no == partRange.no) as Part;
            return (
              <Card>
                <PartRange
                  no={part.no}
                  label={part.label}
                  totalScore={part.totalScore}
                  items={part.items}
                  onPartScoreChange={this.handlePartScoreChange}
                />
              </Card>
            );
          })}
          <Card>
            <Text>
              {`Total Score: ${currentScore} / ${totalScore}`}
            </Text>
          </Card>
        </Stack>
      </>
    );
  }
}

const breadcrubmItems: IBreadcrumbItem[] = [
  { text: 'Applications', key: 'apps'},
  { text: 'DLRRC: Deep Learning Radiomics Reproducibility Checklist', key: 'dlrrc', isCurrentItem: true },
];

const checklistTokens: IStackTokens = {
  padding: 'l2',
  childrenGap: 'l1'
};


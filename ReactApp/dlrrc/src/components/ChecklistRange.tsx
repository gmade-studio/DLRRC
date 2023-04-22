import { Component } from 'react';
import { Stack, Text, Breadcrumb, ProgressIndicator, IBreadcrumbItem, IStackTokens } from '@fluentui/react';
import { Card, PartRange } from '.';
import { Part } from '../models';

interface IChecklistRangeProps {
  totalScore: number;
  parts: Part[];
}

interface IChecklistRangeState {
  currentScore: number | undefined;
  completedCount: number;
  partRanges: Array<{
    no: string, 
    currentScore: number,
    completedCount: number
  }>;
}

export class ChecklistRange extends Component<IChecklistRangeProps, IChecklistRangeState> {
  constructor(props: IChecklistRangeProps) {
    super(props);
    this.state = {
      currentScore: 0,
      completedCount: 0,
      partRanges: props.parts.map((part) => ({
        no: part.no, 
        currentScore: 0,
        completedCount: 0
      }))
    };
  }

  handlePartScoreChange = (no: string, newScore: number, newCompletedCount: number) => {
    const partRanges = [...this.state.partRanges];
    const index = partRanges.findIndex(part => part.no === no);
    if (index >= 0) {
      partRanges[index].currentScore = newScore;
      partRanges[index].completedCount = newCompletedCount;
      const currentScore = partRanges.reduce((acc, part) => acc + part.currentScore, 0);
      const completedCount = partRanges.reduce((acc, part) => acc + part.completedCount, 0);
      this.setState({ currentScore, completedCount, partRanges });
    }
    console.log(partRanges);
  };

  render() {
    const { partRanges, currentScore, completedCount } = this.state;
    const { totalScore, parts } = this.props;
    const itemsCount = parts.reduce((acc, part) => acc + part.items.length, 0);
    return (
      <>
        <Breadcrumb
          items={breadcrubmItems}
          maxDisplayedItems={10}
        />
        <Stack tokens={checklistTokens}>
          <Card>
            <Text variant="large">About</Text>
            <Text>
              This is a preview version of the app. All core functions are already. Features and UI will be updated later.
            </Text>
            <Text>
              Notice: Part scores are summarized at the end of each part; total score is listed at the end of the app.
            </Text>
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
            <Text variant="large">Progress</Text>
            <ProgressIndicator
              label={`Total`}
              description={`Score: ${completedCount} / ${itemsCount} (${(completedCount / itemsCount * 100).toFixed(1)}%)`}
              percentComplete={completedCount / itemsCount}
            />
          </Card>
          {(completedCount == itemsCount)?
            (
              <Card>
                <Text variant="large">Score</Text>
                <ProgressIndicator
                  label={`Total`}
                  description={`Score: ${currentScore} / ${totalScore} (${((currentScore as number) / totalScore * 100).toFixed(1)}%)`}
                  percentComplete={(currentScore as number) / totalScore}
                />
                {partRanges.map(partRange => {
                  const part = parts.find((part) => part.no == partRange.no) as Part;
                  return (
                    <ProgressIndicator
                      label={`Part ${partRange.no}`}
                      description={`Score: ${partRange.currentScore} / ${part.totalScore} (${(partRange.currentScore / part.totalScore * 100).toFixed(1)}%)`}
                      percentComplete={partRange.currentScore / part.totalScore}
                    />
                  );
                })}
              </Card>
            ) : null
          }
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

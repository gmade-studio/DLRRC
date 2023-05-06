import { Component } from 'react';
import { Text, DefaultButton, PrimaryButton, ProgressIndicator, Stack, getTheme, mergeStyleSets, TooltipHost } from '@fluentui/react';
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
  currentPage: number;
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
      })),
      currentPage: 0
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

  previousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 0) {
      this.setState({
        currentPage: currentPage - 1
      });
    }
    this.scrollToMain();
  }

  nextPage = () => {
    const { partRanges, currentPage } = this.state;
    if (currentPage < partRanges.length + 1) {
      this.setState({
        currentPage: currentPage + 1
      });
    }
    this.scrollToMain();
  }

  previousPageLabel = () => {
    const { partRanges, currentPage } = this.state;
    if (currentPage == 1) {
      return 'Cancel';
    }
    else if (currentPage == partRanges.length + 1) {
      return 'Return';
    }
    return 'Previous'
  }

  nextPageLabel = () => {
    const { partRanges, currentPage } = this.state;
    if (currentPage == 0) {
      return 'Start';
    }
    else if (currentPage < partRanges.length) {
      return 'Next';
    }
    return 'See score'
  }

  scrollToMain = () => {
    let anchorElement = document.getElementById('main');
    if(anchorElement) { anchorElement.scrollIntoView(); }
  }

  isNextDisable = () => {
    const { partRanges, currentPage } = this.state;
    const { parts } = this.props;

    if (currentPage == 0) {
      return false;
    }
    if (currentPage == parts.length + 1) {
      return false;
    }

    const partRange = partRanges[currentPage - 1];
    const part = parts[currentPage - 1];
    return partRange.completedCount < part.items.length;
  }

  render() {
    const { partRanges, currentScore, completedCount, currentPage } = this.state;
    const { totalScore, parts } = this.props;
    const itemsCount = parts.reduce((acc, part) => acc + part.items.length, 0);

    const toolTip = (
      <Stack>
        {`Progress: ${completedCount} / ${itemsCount} (${(completedCount / itemsCount * 100).toFixed(1)}%)`}
      </Stack>
    );

    return (
      <>
        { currentPage == 0 ? (
          <Card>
            <Text className={classNames.cardHeader}>About</Text>
            <Text>
              This is a preview version of the app. All core functions are already. Features and UI will be updated later.
            </Text>
            <Text>
              Notice: Part scores are summarized at the end of each part; total score is listed at the end of the app.
            </Text>
          </Card>
        ) : null}

        { currentPage > 0 ? (
          <TooltipHost content={toolTip}>
            <ProgressIndicator percentComplete={completedCount / itemsCount} barHeight={20} />
          </TooltipHost>
        ) : null}
       
        { partRanges.map(partRange => {
          const partIndex = parts.findIndex((part) => part.no == partRange.no);
          const part = parts[partIndex];
          return (
            <Card hidden={currentPage != partIndex + 1}>
              <PartRange no={part.no} label={part.label} totalScore={part.totalScore} items={part.items} onPartScoreChange={this.handlePartScoreChange} />
            </Card>
          );
        })}
        { (currentPage == partRanges.length + 1) ? (
          <Card>
            <Text className={classNames.cardHeader}>Score</Text>
            <ProgressIndicator
              label={`Total`}
              description={`Score: ${currentScore} / ${totalScore} (${((currentScore as number) / totalScore * 100).toFixed(1)}%)`}
              percentComplete={(currentScore as number) / totalScore}
              barHeight={5}
            />
            {partRanges.map(partRange => {
              const part = parts.find((part) => part.no == partRange.no) as Part;
              return (
                <ProgressIndicator
                  label={`Part ${partRange.no}`}
                  description={`Score: ${partRange.currentScore} / ${part.totalScore} (${(partRange.currentScore / part.totalScore * 100).toFixed(1)}%)`}
                  percentComplete={partRange.currentScore / part.totalScore}
                  barHeight={5}
                />
              );
            })}
          </Card>
        ) : null}
        <Stack horizontal horizontalAlign="space-between">
          { currentPage > 0 ? (
            <DefaultButton onClick={this.previousPage}>
              {this.previousPageLabel()}
            </DefaultButton>
          ) : <div/>}
          { currentPage < partRanges.length + 1 ? (
            <PrimaryButton onClick={this.nextPage} disabled={this.isNextDisable()}>
              {this.nextPageLabel()}
            </PrimaryButton>
          ) : <div/>}
        </Stack>
      </>
    );
  }
}

const theme = getTheme();
const classNames = mergeStyleSets({
  cardHeader: [
    theme.fonts.xLarge,
  ]
});

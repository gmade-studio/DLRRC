import { Component } from 'react';
import { Text, DefaultButton, PrimaryButton, ProgressIndicator, Stack, TooltipHost, getTheme, mergeStyleSets } from '@fluentui/react';
import { Card, PartRange } from '.';
import { Part } from '../models';

interface IScoreRangeProps {
  totalScore: number;
  parts: Part[];
}

interface IScoreRangeState {
  currentScore: number | undefined;
  completedCount: number;
  partRanges: Array<{
    no: string, 
    currentScore: number,
    completedCount: number
  }>;
  currentPage: number;
}

export class ScoreRange extends Component<IScoreRangeProps, IScoreRangeState> {
  constructor(props: IScoreRangeProps) {
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
    this._scrollToMain();
  }

  public render(): JSX.Element {
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
        { currentPage < partRanges.length ? (
          <TooltipHost content={toolTip}>
            <ProgressIndicator percentComplete={completedCount / itemsCount} barHeight={20} />
          </TooltipHost>
        ) : null }
      
        { partRanges.map(partRange => {
          const partIndex = parts.findIndex((part) => part.no == partRange.no);
          const part = parts[partIndex];
          return (
            <Card hidden={currentPage != partIndex}>
              <PartRange no={part.no} label={part.label} totalScore={part.totalScore} items={part.items} onPartScoreChange={this._handlePartScoreChange} />
            </Card>
          );
        })}
        { (currentPage == partRanges.length) ? (
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
            <DefaultButton onClick={this._previousPage}>
              {this._previousPageLabel()}
            </DefaultButton>
          ) : <div/>}
          { currentPage < partRanges.length ? (
            <PrimaryButton onClick={this._nextPage} disabled={this._isNextDisable()}>
              {this._nextPageLabel()}
            </PrimaryButton>
          ) : <div/>}
        </Stack>
      </>
    );
  }

  private _handlePartScoreChange = (no: string, newScore: number, newCompletedCount: number) => {
    const partRanges = [...this.state.partRanges];
    const index = partRanges.findIndex(part => part.no === no);
    if (index >= 0) {
      partRanges[index].currentScore = newScore;
      partRanges[index].completedCount = newCompletedCount;
      const currentScore = partRanges.reduce((acc, part) => acc + part.currentScore, 0);
      const completedCount = partRanges.reduce((acc, part) => acc + part.completedCount, 0);
      this.setState({ currentScore, completedCount, partRanges });
    }
  };

  private _previousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 0) {
      this.setState({
        currentPage: currentPage - 1
      });
    }
    this._scrollToMain();
  }

  private _nextPage = () => {
    const { partRanges, currentPage } = this.state;
    if (currentPage < partRanges.length + 1) {
      this.setState({
        currentPage: currentPage + 1
      });
    }
    this._scrollToMain();
  }

  private _isNextDisable = () => {
    const { partRanges, currentPage } = this.state;
    const { parts } = this.props;

    if (currentPage == parts.length) {
      return false;
    }

    const partRange = partRanges[currentPage];
    const part = parts[currentPage];
    return partRange.completedCount < part.items.length;
  }

  private _previousPageLabel = () => {
    const { partRanges, currentPage } = this.state;
    if (currentPage == partRanges.length) {
      return 'Return';
    }
    return 'Previous'
  }

  private _nextPageLabel = () => {
    const { partRanges, currentPage } = this.state;
    if (currentPage < partRanges.length - 1) {
      return 'Next';
    }
    return 'See score'
  }

  private _scrollToMain = () => {
    let anchorElement = document.getElementById('main');
    if(anchorElement) { anchorElement.scrollIntoView(); }
  }
}

const theme = getTheme();
const classNames = mergeStyleSets({
  cardHeader: [
    theme.fonts.xLarge,
  ]
});

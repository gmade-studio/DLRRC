import { Component } from 'react';
import { Text } from '@fluentui/react';
import { ItemRange } from '.';
import { Item } from '../models';

interface IPartRangeProps {
  no: string;
  label: string;
  totalScore: number;
  items: Item[];
  onPartScoreChange: (no: string, newValue: number, newCompleteCount: number) => void;
}

interface IPartRangeState {
  currentScore: number | undefined;
  completedCount: number;
  itemRanges: Array<{
    no: number, 
    isComplete: boolean, 
    currentScore: number
  }>;
}

export class PartRange extends Component<IPartRangeProps, IPartRangeState> {
  constructor(props: IPartRangeProps) {
    super(props);
    this.state = {
      currentScore: 0,
      completedCount: 0,
      itemRanges: props.items.map((item) => ({
        no: item.no, 
        isComplete: false, 
        currentScore: 0
      }))
    };
  }

  handleItemScoreChange = (itemNo: number, newScore: number) => {
    const { no, onPartScoreChange } = this.props;
    const itemRanges = [...this.state.itemRanges];
    const index = itemRanges.findIndex(item => item.no === itemNo);
    if (index >= 0) {
      itemRanges[index].isComplete = true;
      itemRanges[index].currentScore = newScore;
      const currentScore = itemRanges.reduce((acc, item) => acc + item.currentScore, 0);
      const completedCount = itemRanges.filter(item => item.isComplete).length;
      this.setState({ currentScore, completedCount, itemRanges });
      onPartScoreChange(no, currentScore, completedCount);
    }
  };

  render() {
    const { itemRanges } = this.state;
    const { no, label, items } = this.props;
    return (
      <>
        <Text variant="large">
          {`Part ${no} ${label}`}
        </Text>
        {itemRanges.map(itemRange => {
          const item = items.find((item) => item.no == itemRange.no) as Item;
          return (
            <ItemRange
              no={item.no}
              label={item.label}
              description={item.description}
              totalScore={item.totalScore}
              options={item.options}
              onItemScoreChange={this.handleItemScoreChange}
            />
          );
        })}
      </>
    );
  }
}

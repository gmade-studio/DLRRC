import { Component } from 'react';
import { Stack, Text, IStackTokens } from '@fluentui/react';
import ItemRange from './ItemRange';
import { Item } from './types';

interface IPartRangeProps {
  no: string;
  label: string;
  totalScore: number;
  items: Item[];
  onPartScoreChange: (no: string, newValue: number) => void;
}

interface IPartRangeState {
  currentScore: number | undefined;
  itemRanges: Array<{no: number, currentScore: number}>;
}

export default class PartRange extends Component<IPartRangeProps, IPartRangeState> {
  constructor(props: IPartRangeProps) {
    super(props);
    this.state = {
      currentScore: 0,
      itemRanges: props.items.map((item) => ({no: item.no, currentScore: 0}))
    };
  }

  handleItemScoreChange = (itemNo: number, newScore: number) => {
    const { no, onPartScoreChange } = this.props;
    const itemRanges = [...this.state.itemRanges];
    const index = itemRanges.findIndex(item => item.no === itemNo);
    if (index >= 0) {
      itemRanges[index].currentScore = newScore;
      const currentScore = itemRanges.reduce((acc, item) => acc + item.currentScore, 0);
      this.setState({ currentScore, itemRanges });
      onPartScoreChange(no, currentScore);
    }
  };

  render() {
    const { itemRanges, currentScore } = this.state;
    const { no, label, totalScore, items } = this.props;
    return (
      <Stack tokens={partTokens}>
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
        <Text>
          {`Part Score: ${currentScore} / ${totalScore}`}
        </Text>
      </Stack>
    );
  }
}

const partTokens: IStackTokens = {
  padding: 'm 0',
  childrenGap: 'l1'
};

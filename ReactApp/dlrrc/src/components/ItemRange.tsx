import { Component, Fragment, FormEvent } from 'react';
import { Stack, Panel, Text, IconButton, ChoiceGroup, IChoiceGroupOption, IIconProps, IStackTokens } from '@fluentui/react';
import { Option } from '../models';

interface IItemRangeProps {
  no: number;
  label: string;
  description: string;
  totalScore: number;
  options: Option[];
  onItemScoreChange: (no: number, newValue: number) => void;
}

interface IItemRangeState {
  selectedKey: string | undefined;
  isComplete: boolean;
  currentScore: number;
  isOpen: boolean;
}

export class ItemRange extends Component<IItemRangeProps, IItemRangeState> {
  constructor(props: IItemRangeProps) {
    super(props);
    this.state = {
      selectedKey: undefined,
      isComplete: false,
      currentScore: 0,
      isOpen: false
    }
  }
  
  private _onChange = (_?: FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption): void => {
    const { no, onItemScoreChange } = this.props;
    if (option) {
      const newScore = this.props.options.find((opt) => opt.answer == option.key)?.score
      this.setState({
        selectedKey: option.key,
        isComplete: true,
        currentScore: newScore as number
      });
      onItemScoreChange(no, newScore as number);
    }
  };

  private openPanel = (): void => {
    this.setState({
      isOpen: true
    });
  }

  private dismissPanel = (): void => {
    this.setState({
      isOpen: false
    });
  }
    
  public render(): JSX.Element {
    const options = this.props.options.map(
      option => ({
        key: option.answer, 
        text: option.answer
      })
    )
    const { selectedKey, currentScore } = this.state;
    const { no, label, description } = this.props;

    return (
      <Stack tokens={itemTokens}>
        <Stack horizontal tokens={itemHeaderTokens}>
          <Text>
            {no}
          </Text>
          <Text>
            {label.split('\n').map((line, index) => <Fragment key={index}>{line}<br /></Fragment>)}
          </Text>
          <IconButton iconProps={infoIcon} title="Description" onClick={this.openPanel} />
        </Stack>
        <Stack tokens={itemContentTokens}>
          <Panel
            headerText={`Description to item ${no}`}
            isOpen={this.state.isOpen}
            onDismiss={this.dismissPanel}
          >
            <Text>
              {description}
            </Text>
          </Panel>
          <ChoiceGroup
            options={options}
            onChange={this._onChange}
            selectedKey={selectedKey}
          />
        </Stack>
      </Stack>
    );
  }
}

const infoIcon: IIconProps = { iconName: 'Lightbulb' };
const itemTokens: IStackTokens = {
  childrenGap: 's2'
};
const itemHeaderTokens: IStackTokens = {
  childrenGap: 's1',
  padding: '0 s2'
};
const itemContentTokens: IStackTokens = {
  childrenGap: 's1',
  padding: '0 l2'
};

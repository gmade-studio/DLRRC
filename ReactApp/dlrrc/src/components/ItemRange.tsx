import { Component, Fragment, FormEvent } from 'react';
import { Stack, Text, Link, ChoiceGroup, IChoiceGroupOption, IStackTokens, getTheme, mergeStyleSets } from '@fluentui/react';
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
    
  public render(): JSX.Element {
    const options = this.props.options.map(
      option => ({
        key: option.answer, 
        text: option.answer
      })
    )
    const { selectedKey, isOpen } = this.state;
    const { no, label, description } = this.props;

    return (
      <Stack className={classNames.itemRange} tokens={itemRangeTokens}>
        <Stack horizontal tokens={itemHeaderTokens} className={classNames.header}>
          <Text className={classNames.no}>
            {no}
          </Text>
          <Stack>
            <Text className={classNames.itemHeader}>
              {label.split('\n').map((line, index) => <Fragment key={index}>{line}<br /></Fragment>)}
            </Text>
            <Link onClick={this._toggleVisibilityOfDescription} className={classNames.learnMoreButton} >
              { isOpen ? 'Collapse' : 'Extend' } detailed description
            </Link>
            { isOpen ? (
              <Text className={classNames.description}>
                {description}
              </Text>
            ) : null}
          </Stack>
        </Stack>
        <ChoiceGroup options={options} onChange={this._onOptionsChange} selectedKey={selectedKey} className={classNames.choiceGroup} />
      </Stack>
    );
  }
  
  private _onOptionsChange = (_?: FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption): void => {
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

  private _toggleVisibilityOfDescription = (): void => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }
}

const theme = getTheme();
const classNames = mergeStyleSets({
  itemRange: {
    borderBottomColor: theme.palette.neutralLighter,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    paddingBottom: '15px'
  },
  header: {
    background: theme.palette.neutralLighterAlt,
    padding: '15px 10px',
    borderTopColor: theme.palette.neutralQuaternary,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderBottomColor: theme.palette.neutralQuaternary,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid'
  },
  no: [
    theme.fonts.medium,
    {
      maxWidth: '20px',
      minWidth: '20px',
      fontWeight: 'bold'
    }
  ],
  itemHeader: [
    theme.fonts.medium,
    {
      fontWeight: 'bold'
    }
  ],
  learnMoreButton: [
    theme.fonts.small,
    {
      marginTop: '5px'
    }
  ],
  description: [
    theme.fonts.small,
    {
      marginTop: '5px',
      maxWidth: '700px'
    }
  ],
  choiceGroup: [
    {
      marginLeft: '50px'
    }
  ]
})

const itemRangeTokens: IStackTokens = {
  childrenGap: '5px'
};
const itemHeaderTokens: IStackTokens = {
  childrenGap: 's1',
  padding: '0 s2'
};

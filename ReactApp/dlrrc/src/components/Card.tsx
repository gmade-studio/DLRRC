import { Component } from "react";
import { Stack, IStackProps, IStackTokens, Depths, getTheme, mergeStyleSets  } from '@fluentui/react';

interface ICardProps extends IStackProps {
  hidden?: boolean
}

export class Card extends Component<ICardProps> {
  static hidden: false;

  public render(): JSX.Element {
    const tokens = this.props.tokens == undefined ? cardTokens : this.props.tokens;
    const className = this.props.className == undefined ? classNames.card : this.props.className;
    return (
      <Stack tokens={tokens} className={`${className} ${this.props.hidden ? classNames.hiddenCard : ''}`} {...this.props}>
        {this.props.children}
      </Stack>
    );
  }
}

const theme = getTheme();

const classNames = mergeStyleSets({
  card: {
    boxShadow: Depths.depth8,
    borderRadius: '3px',
    background: theme.palette.white
  },
  hiddenCard: {
    display: 'none'
  }
})

const cardTokens: IStackTokens = {
  padding: 'l1',
  childrenGap: 'l1'
};

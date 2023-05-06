import { Component } from "react";
import { Stack, IStackProps, IStackTokens, Depths, getTheme, mergeStyles  } from '@fluentui/react';

interface ICardProps extends IStackProps {
  hidden?: boolean
}

export class Card extends Component<ICardProps> {
  static hidden: false;

  render() {
    const tokens = this.props.tokens == undefined ? cardTokens : this.props.tokens;
    const className = this.props.className == undefined ? cardStyle : this.props.className;
    return (
      <Stack tokens={tokens} className={`${className} ${this.props.hidden ? hiddenCard : ''}`} {...this.props}>
        {this.props.children}
      </Stack>
    );
  }
}

const theme = getTheme();

const cardStyle = mergeStyles({
  boxShadow: Depths.depth8,
  borderRadius: '3px',
  background: theme.palette.white
});

const hiddenCard = mergeStyles( {
  display: 'none'
})

const cardTokens: IStackTokens = {
  padding: 'l1',
  childrenGap: 'l1'
};

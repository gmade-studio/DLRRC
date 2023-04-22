import { Component } from "react";
import { Stack, IStackTokens, Depths, mergeStyles, IStackProps } from '@fluentui/react';

export class Card extends Component<IStackProps> {
  constructor(props: IStackProps) {
    super(props);
  }

  render() {
    const tokens = this.props.tokens == undefined ? cardTokens : this.props.tokens;
    const className = this.props.className == undefined ? cardStyle : this.props.className;
    return (
      <Stack tokens={tokens} className={className} {...this.props}>
        {this.props.children}
      </Stack>
    );
  }
}

const cardStyle = mergeStyles({
  boxShadow: Depths.depth8,
  borderRadius: '3px',
  background: 'white',
});

const cardTokens: IStackTokens = {
  padding: 'l1',
  childrenGap: 'l1'
};

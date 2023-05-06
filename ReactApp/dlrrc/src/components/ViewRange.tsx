import { Component, Fragment } from 'react';
import { Text, Stack, IStackTokens, getTheme, mergeStyleSets } from '@fluentui/react';
import { Card } from '.';
import { Part } from '../models';

interface IViewRangeProps {
  parts: Part[];
}

export class ViewRange extends Component<IViewRangeProps> {
  constructor(props: IViewRangeProps) {
    super(props);
    this.scrollToContentArea();
  }

  scrollToContentArea = () => {
    let anchorElement = document.getElementById('contentArea');
    if(anchorElement) { anchorElement.scrollIntoView(); }
  }

  render() {
    const { parts } = this.props;

    return (
      <>
        { parts.map(part => (
          <Card>
            <Text className={classNames.cardHeader}>
              {`Part ${part.no} ${part.label}`}
            </Text>
            { part.items.map(item => (
              <Stack className={classNames.itemRange} tokens={itemRangeTokens}>
                <Stack horizontal tokens={itemHeaderTokens} className={classNames.header}>
                  <Text className={classNames.no}>
                    {item.no}
                  </Text>
                  <Stack>
                    <Text className={classNames.itemHeader}>
                      {item.label.split('\n').map((line, index) => <Fragment key={index}>{line}<br /></Fragment>)}
                    </Text>
                    <Text className={classNames.description}>
                      {item.description}
                    </Text>
                  </Stack>
                </Stack>
                <Stack className={classNames.optionContainer} tokens={optionContainerTokens}>
                  { item.options.map(option => (
                    <Text><b>{`${option.answer}`}</b>{` (${option.score} points)`}</Text>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Card>
        ))}
      </>
    );
  }
}

const theme = getTheme();
const classNames = mergeStyleSets({
  cardHeader: [
    theme.fonts.xLarge,
  ],
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
  optionContainer: [
    {
      marginLeft: '50px',
    }
  ]
});

const itemRangeTokens: IStackTokens = {
  childrenGap: '5px'
};
const itemHeaderTokens: IStackTokens = {
  childrenGap: 's1',
  padding: '0 s2'
};
const optionContainerTokens: IStackTokens = {
  childrenGap: 'm',
  padding: '10px 0 0 0'
};

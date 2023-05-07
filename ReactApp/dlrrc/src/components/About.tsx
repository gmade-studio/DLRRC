import { Component } from 'react';
import { Text, getTheme, mergeStyleSets } from '@fluentui/react';
import { Card } from '.';

export class About extends Component {
  public render(): JSX.Element {
    return (
      <Card>
        <Text className={classNames.cardHeader}>About</Text>
        <Text>
          This is a preview version of the app. All core functions are already. Features and UI will be updated later.
        </Text>
        <Text>
          Notice: Part scores are summarized at the end of each part; total score is listed at the end of the app.
        </Text>
      </Card>
    );
  }
}

const theme = getTheme();

const classNames = mergeStyleSets({
  cardHeader: [
    theme.fonts.xLarge,
  ]
});

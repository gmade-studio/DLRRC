import { Component } from 'react';
import { Breadcrumb, IBreadcrumbItem, IBreadcrumbStyles, IDividerAsProps, getTheme, mergeStyleSets } from '@fluentui/react';

export class Navigation extends Component {
  render() {
    return (
      <Breadcrumb items={breadcrubmItems} className={classNames.breadcrubm} styles={breadcrumbStyles} dividerAs={this._getCustomDivider} />
    );
  }

  private _getCustomDivider(_: IDividerAsProps): JSX.Element {
    return (
      <span className={classNames.customDivider}>
        /
      </span>
    );
  }
}

const breadcrubmItems: IBreadcrumbItem[] = [
  { text: 'Apps', key: 'apps'},
  { text: 'DLRRC: Deep Learning Radiomics Reproducibility Checklist', key: 'dlrrc', isCurrentItem: true },
];

const theme = getTheme();

const breadcrumbStyles: Partial<IBreadcrumbStyles> = {
  item: [
    theme.fonts.medium
  ],
  itemLink: [
    theme.fonts.medium
  ]
};

const classNames = mergeStyleSets({
  breadcrubm: {
    marginTop: '0',
    backgroundColor: theme.palette.white
  },
  customDivider: {
    cursor: 'pointer', 
    padding: 1
  }
});


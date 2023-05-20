import { Component } from 'react';
import {
  DocumentCard, DocumentCardActivity, DocumentCardDetails, DocumentCardPreview, DocumentCardTitle, 
  IDocumentCardPreviewProps, DocumentCardType, IDocumentCardActivityPerson,
  Stack, IStackTokens, Text, getTheme, mergeStyleSets
} from '@fluentui/react';
import { Card } from '.';

export class Downloads extends Component {
  public render(): JSX.Element {
    return (
      <Card>
        <Text className={classNames.cardHeader}>Downloads</Text>
        <Stack tokens={documentsTokens}>
          <DocumentCard onClickHref={urls.excel} type={DocumentCardType.compact} className={classNames.documentCard}>
            <DocumentCardPreview {...previewExcelUsingIcon} />
            <DocumentCardDetails>
              <DocumentCardTitle title="Deep Learning Radiomics Reproducibility Checklist (Excel Workbook)" shouldTruncate />
              <DocumentCardActivity activity="Last modified April 20, 2023, 2:43:16 AM" people={people} />
            </DocumentCardDetails>
          </DocumentCard>
          <DocumentCard onClickHref={urls.word} type={DocumentCardType.compact} className={classNames.documentCard}>
            <DocumentCardPreview {...previewWordUsingIcon} />
            <DocumentCardDetails>
              <DocumentCardTitle title="Deep Learning Radiomics Reproducibility Checklist (Word Document)" shouldTruncate />
              <DocumentCardActivity activity="Last modified April 20, 2023, 2:43:16 AM" people={people} />
            </DocumentCardDetails>
          </DocumentCard>
        </Stack>
      </Card>
    );
  }
}

const urls = {
  excel: './attachments/DLRRC.xlsx',
  word: './attachments/DLRRC.docx'
}

const people: IDocumentCardActivityPerson[] = [
  { name: 'Teng Zuo', profileImageSrc: '', initials: 'TZ' },
  { name: 'Lingfeng He', profileImageSrc: '', initials: 'LH' },
  { name: 'Zezheng Lin', profileImageSrc: '', initials: 'ZL' },
  { name: 'Jianhui Chen', profileImageSrc: '', initials: 'JC' },
  { name: 'Ning Li', profileImageSrc: '', initials: 'NL' },
];

const theme = getTheme();

const classNames = mergeStyleSets({
  cardHeader: [
    theme.fonts.xLarge,
  ],
  documentCard: {
    minWidth: '100%',
  },
});

const documentsTokens: IStackTokens = {
  childrenGap: 20
};

const previewExcelUsingIcon: IDocumentCardPreviewProps = {
  previewImages: [
    {
      previewIconProps: {
        iconName: 'ExcelLogo',
        styles: {
          root: {
            fontSize: theme.fonts.superLarge.fontSize,
            color: '#217346',
            backgroundColor: theme.palette.neutralLighterAlt,
          },
        },
      },
      width: 128
    },
  ],
  styles: {
    previewIcon: { backgroundColor: theme.palette.neutralLighterAlt },
  },
};

const previewWordUsingIcon: IDocumentCardPreviewProps = {
  previewImages: [
    {
      previewIconProps: {
        iconName: 'WordLogo',
        styles: {
          root: {
            fontSize: theme.fonts.superLarge.fontSize,
            color: '#2b579a',
            backgroundColor: theme.palette.neutralLighterAlt,
          },
        },
      },
      width: 128
    },
  ],
  styles: {
    previewIcon: { backgroundColor: theme.palette.neutralLighterAlt },
  },
};

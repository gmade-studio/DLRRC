import { Component } from 'react';
import { Text, Link, FontIcon, Stack, IStackTokens, getTheme, mergeStyleSets } from '@fluentui/react';
import { Card } from '.';

export class About extends Component {
  public render(): JSX.Element {
    return (
      <Card>
        <Text className={classNames.cardHeader}>Background</Text>
        <Text className={classNames.cardContext}>
          Computer science and hardware have developed prominently in this decade, 
          advancing Artificial Intelligence and Deep Learning applications in translational medicine. 
          As an icon, DL-radiomics research mushrooms and solves several traditional radiological challenges. 
          Behind the glory of DL-radiomics successful performance, 
          there is limited attention to the neglected reproducibility of existing reports, 
          which runs contrary to radiomics original intention, 
          to realize unexperienced-dependent radiological processing with high robustness and generalization. 
          Besides focusing on objective causes of reproduction barriers, deep-seated factors, 
          between contemporary academic evaluation systems and scientific research, should also be mentioned. 
        </Text>
        <Text className={classNames.cardContext}>
          Hence, there is an urgent need for a targeted inspection to promote this area's healthy development. 
          Considering this, we propose a reproducibility specification checklist.
        </Text>
        <Text className={classNames.cardHeader}>Learn more</Text>
        <Text className={classNames.cardContext}>
          We also take Renal cell carcinoma, one of the common genitourinary cancers, as an example
          to glimpse the reproducibility defects in the whole DL-radiomics field. 
          Specifically, we analyse the performance of existing DL-radiomics reports in RCC.
          The results show a trend of increasing reproducibility but still a need to further improve, 
          especially in technological details of pre-processing, training, validation, and testing. 
        </Text>
        <Text className={classNames.cardContext}>
          The fulltext of our preprint can be download at&nbsp;
          <Link href={urls.ssrn} target="_blank">SSRN {icon}</Link> and&nbsp;
          <Link href={urls.researchGate} target="_blank">ResearchGate {icon}</Link>.
        </Text>
        <Text className={classNames.cardHeader}>Please cite as</Text>
        <Stack className={classNames.bibBox} tokens={bibBoxTokens}>
          <Text className={classNames.bib}>
            Zuo, T., He, L., Lin, Z., Chen, J., & Li, N. (2023). 
            Reconsideration Reproducibility of Currently Deep Learning-Based Radiomics: Taking Renal Cell Carcinoma as an Example 
            (SSRN Scholarly Paper No. 4435866).&nbsp;
            <Link href={urls.doi} target="_blank">https://doi.org/10.2139/ssrn.4435866 {icon}</Link>
          </Text>
        </Stack>
        <Text className={classNames.cardHeader}>Source code</Text>
        <Text className={classNames.cardContext}>
          The source code of this web app can be found at&nbsp;
          <Link href={urls.github} target="_blank">Github {icon}</Link>.
        </Text>
      </Card>
    );
  }
}

const icon = (
  <FontIcon iconName="NavigateExternalInline" />
);

const urls = {
  ssrn: 'https://ssrn.com/abstract=4435866',
  researchGate: 'https://www.researchgate.net/publication/370716277_Reconsideration_Reproducibility_of_Currently_Deep_Learning-Based_Radiomics_Taking_Renal_Cell_Carcinoma_as_an_Example',
  doi: 'https://doi.org/10.2139/ssrn.4435866',
  github: 'https://github.com/GmadeStudio/DLRRC/tree/main/ReactApp/dlrrc'
}

const theme = getTheme();

const classNames = mergeStyleSets({
  cardHeader: [
    theme.fonts.xLarge,
  ],
  cardContext: [
    theme.fonts.mediumPlus
  ],
  bibBox: [
    theme.fonts.mediumPlus,
    {
      backgroundColor: theme.palette.neutralLighter
    }
  ],
  bib: [
    theme.fonts.medium,
  ]
});

const bibBoxTokens: IStackTokens = {
  padding: 'm',
};

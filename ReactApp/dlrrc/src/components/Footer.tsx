import { Text, Link, Stack, IStackTokens } from '@fluentui/react';

export default function Footer() {
  return (
    <>
      <Stack/>
      <Stack horizontal tokens={footerRightContentTokens}>
        <Text>
          Powered by&nbsp;
          <Link href={gmadeStudioUrl}>Gmade Studio</Link>
        </Text>
        <Text>
          Copyright © 2023&nbsp;
          <Link href={orcid.Zuo}>Zuo</Link>,&nbsp;
          <Link href={orcid.He}>He</Link>,&nbsp;
          <Link href={orcid.Lin}>Lin</Link>,&nbsp;
          <Link href={orcid.Chen}>Chen</Link> and&nbsp;
          <Link href={orcid.Li}>Li</Link>
        </Text>
      </Stack>
    </>
  );
};

const gmadeStudioUrl = "http://gmade-studio.com/en-us";

const orcid = {
  Zuo: 'https://orcid.org/0000-0001-7920-1259',
  He: 'https://orcid.org/0000-0001-7567-6708',
  Lin: 'https://orcid.org/0009-0004-1217-4486',
  Chen: 'https://orcid.org/0000-0001-7494-1258',
  Li: 'https://orcid.org/0000-0003-3420-0206'
}

const footerRightContentTokens: IStackTokens = {
  childrenGap: 'l1'
};

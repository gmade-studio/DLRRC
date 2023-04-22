import { Text, Link, Image, Stack, ILinkStyles, IStackTokens, mergeStyles, useTheme } from '@fluentui/react';
import logo from '../assets/GmadeLogo.png';

export function Header() {
  const theme = useTheme();
  const siteLinkStyle: ILinkStyles = {
    root: {
      color: theme.palette.neutralSecondary,
      texeDecorationColor: theme.palette.neutralSecondary,
      textUnderlineOffset: '0.4em',
      ':link': {
        texeDecorationColor: theme.palette.neutralSecondary,
      },
      ':visited': {
        texeDecorationColor: theme.palette.neutralSecondary,
      },
      ':hover': {
        texeDecorationColor: theme.palette.neutralSecondary,
      },
      ':focus': {
        texeDecorationColor: theme.palette.neutralSecondary,
      },
    },
  };

  return (
    <>
      <Link href={gmadeStudioUrl}>
        <Image src={logo} height="35px" />
      </Link>
      <Stack horizontal className={siteLinkBorderStyle} verticalAlign="center" tokens={siteLogoTokens}>
        <Link href={gmadeStudioAppsUrl} styles={siteLinkStyle}>
          <Text variant="large">
            Applications
          </Text>
        </Link>
      </Stack>
    </>
  );
};

const gmadeStudioUrl = "http://gmade-studio.com/en-us";
const gmadeStudioAppsUrl = "https://apps.gmade-studio.com/";

const siteLogoTokens: IStackTokens = {
  padding: '0 l1'
};

const siteLinkBorderStyle = mergeStyles({
  borderLeft: '2px solid',
  borderLeftColor: '#000000',
  height: '25px',
});

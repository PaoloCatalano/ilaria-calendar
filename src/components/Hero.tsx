import React, { useContext } from 'react';
import { Box, Heading, Button, Image, ResponsiveContext } from 'grommet';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const METADATA_QUERY = graphql`
  query {
    site {
      siteMetadata {
        title
        subTitle
        formLink
      }
    }
    imageSharp {
      original {
        src
      }
    }
  }
`;

const Hero = () => {
  const data = useStaticQuery(METADATA_QUERY);
  const size = useContext(ResponsiveContext);

  const { title, subTitle, formLink } = data.site.siteMetadata;
  const { src: logoSrc } = data.imageSharp.original;

  return (
    <Box
      a11yTitle="Calendar events title"
      align="center"
      flex="grow"
      height="80vh"
      justify="center"
      pad="medium"
      animation="slideDown"
    >
      <Box width="small" height="small">
        <Image fit="contain" src={logoSrc} a11yTitle="logo" />
      </Box>

      <Separator />

      <Heading
        textAlign="center"
        size={size === 'small' ? 'medium' : 'large'}
        a11yTitle="Application title"
        color="text"
      >
        {title}
      </Heading>

      <Separator spacing="medium" />

      {subTitle && (
        <Heading
          size={size === 'small' ? 'small' : 'medium'}
          textAlign="center"
          a11yTitle="Application sub title"
          color="text"
        >
          {subTitle}
        </Heading>
      )}

      <Separator spacing="medium" />

      <Box direction={size === 'small' ? 'column' : 'row'} gap="large">
        <HeroButton
          href="#calendars"
          label="Calendar | Calendario"
          a11yTitle="Calendar | Calendario"
          primary
        />
        <HeroButton
          href={formLink}
          label="Book Now | Prenota Adesso"
          a11yTitle="Book Now | Prenota Adesso"
          color="secondary"
          // target="_blank"
        />
        {size === 'small' && <Separator spacing="large" />}
        {size === 'small' && <Separator spacing="large" />}
        {size === 'small' && <Separator spacing="large" />}
        {size === 'small' && <Separator spacing="large" />}
        {size === 'small' && <Separator spacing="large" />}
      </Box>
    </Box>
  );
};

const Separator = ({ spacing = 'small' }: { spacing?: string }) => (
  <Box margin={{ vertical: spacing }} />
);
//da cambiare (strano bug!!)
const HeroButton = styled(Button)`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Hero;

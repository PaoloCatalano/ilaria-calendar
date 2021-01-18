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
      height="30vh"
      justify="center"
      pad="medium"
      animation="slideDown"
    >
      <Box direction={size === 'small' ? 'column' : 'row'} gap="large">
        <HeroButton
          href={formLink}
          label="Book Now | Prenota Adesso"
          a11yTitle="Book Now | Prenota Adesso"
          color="secondary"
          // target="_blank"
        />
        <HeroButton
          href="#calendars"
          label="Top | Inizio Calendario"
          a11yTitle="Calendar | Calendario"
          primary
        />
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

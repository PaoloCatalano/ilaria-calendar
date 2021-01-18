import React from 'react';
import { Box, Text, Anchor } from 'grommet';

const Footer = () => (
  <Box
    tag="footer"
    justify="center"
    direction="row"
    pad="small"
    background="#222"
  >
    <Text color="name" a11yTitle="Ilaria Serena">
        ILARIA SERENA
    </Text>
  </Box>
);

export default Footer;

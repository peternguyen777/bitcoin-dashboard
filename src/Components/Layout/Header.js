import React from "react";
import { IconButton, Heading, Button, useColorMode } from "@chakra-ui/react";
import { Flex, Spacer, Box } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { SunIcon, MoonIcon } from "@bitcoin-design/bitcoin-icons-react/filled";
import { ChevronDownIcon } from "@chakra-ui/icons";

function Header(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  const FiatClickHandler = (event) => {
    const newCurrency = props.currencylist[event.target.value];
    props.setCurrency(newCurrency);
  };

  const currencyListArray = Object.values(props.currencylist);

  return (
    <Flex p={4} alignItems="center">
      <Box>
        <Heading
          fontWeight="extrabold"
          size="md"
          bgGradient="linear(to-r, yellow.500,orange.400, red.400)"
          bgClip="text"
        >
          ₿itcoin Dashboard
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Menu mr={4}>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {props.currency}
          </MenuButton>
          <MenuList minW="0" w={"90px"}>
            {currencyListArray.map((fiat) => (
              <MenuItem
                onClick={FiatClickHandler}
                value={fiat.code}
                key={fiat.code}
              >
                {fiat.code}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <IconButton
          ml={2}
          icon={
            colorMode === "light" ? (
              <SunIcon style={{ height: "30px", width: "30px" }} />
            ) : (
              <MoonIcon style={{ height: "30px", width: "30px" }} />
            )
          }
          size="md"
          onClick={toggleColorMode}
        />
      </Box>
    </Flex>
  );
}

export default Header;

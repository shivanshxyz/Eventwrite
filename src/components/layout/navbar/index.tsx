import React, { useEffect, useState } from "react"
import {
  Box,
  Text,
  Flex,
  Image,
  Button,
  Spacer,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { BiMenu, BiWallet, BiSearch } from "react-icons/bi"
import { IoIosAdd, IoIosLogOut } from "react-icons/io"
import Link from "next/link"
import SignUpModal from "../../modals/sign-up"
import Router from "next/router"

const Navbar = () => {
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()

  const btnRef = React.useRef()

  const navbar_menu = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Features",
      link: "/about",
    },
    {
      name: "Events",
      link: "/events",
    },
  ]

  return (
    <>
      <Flex
        align="center"
        justify={["center", "center", "center", "flex-start"]}
        w="100%"
        fontFamily="MontserratBold"
        px={["xs", "xs", "xs", "md"]}
        transition="all ease 0.5s"
        shadow="lg"
        bg="linear-gradient( 64.3deg,  rgba(254,122,152,0.81) 17.7%, rgba(255,206,134,1) 64.7%, rgba(172,253,163,0.64) 112.1% )"
        color="white"
        zIndex={1000}
        textTransform="uppercase"
        py="sm"
        position="sticky"
        top={0}
      >
        <IconButton
          aria-label="open menu"
          display={["flex", "flex", "flex", "none"]}
          icon={<BiMenu />}
          position="absolute"
          left={5}
          _hover={{
            bgColor: "#42a7ff",
            borderColor: "#42a7ff",
          }}
          _active={{
            bgColor: "#42a7ff",
            borderColor: "#42a7ff",
          }}
          //@ts-ignore
          ref={btnRef}
          variant="outline"
          onClick={onOpen1}
        />
        <Link passHref href="/">
          <Image
            src="/logo3.png"
            alt="Eventwrite"
            paddingLeft="md"
            marginX="auto"
            width={170}
            height={75}
            cursor="pointer"
            mx="5"
            my="3"
          />
        </Link>
        <Flex
          justify="center"
          align="center"
          display={["none", "none", "none", "flex"]}
          w="100%"
          ml={[0, 0, 0, "md"]}
        >
          <Menu>
            <MenuButton as={Box} mx="5" fontSize={20}>
              Menu ▼
            </MenuButton>
            <MenuList bg="white" textColor="black" border="2px" borderColor={"white"}>
              {navbar_menu.map((option) => {
                return (
                  <Box p="10px" ml="5px" key={option.name}>
                    <Link passHref href={option.link}>
                      <Text
                        fontSize={17}
                        px="sm"
                        cursor="pointer"
                        _hover={{
                          background:
                            "linear-gradient( 64.3deg,  rgba(254,122,152,0.81) 17.7%, rgba(255,206,134,1) 64.7%, rgba(172,253,163,0.64) 112.1% )",
                          backgroundClip: "text",
                        }}
                        mr="sm"
                      >
                        {option.name}
                      </Text>
                    </Link>
                  </Box>
                )
              })}
            </MenuList>
          </Menu>
          <Spacer />
          <Button
            onClick={() => {
              Router.push('/add');
            }}
            pl="1"
            rounded="full"
            bg={"whiteAlpha.800"}
            color="blackAlpha.700"
            fontWeight="medium"
            _hover={{
              shadow: "sm",
              bg: "white",
            }}
            border="2px"
            borderColor={"white"}
            _focus={{}}
            _active={{ transform: "scale(0.95)" }}
            role="group"
            leftIcon={
              <Flex
              _groupHover={{
                  transform: "scale(1.05)",
                }}
                transitionDuration="200ms"
                justify="center"
                alignItems="center"
                color="white"
                bg="rgba(254,122,152,0.81)"
                rounded="full"
                p="0.5"
                >
                <IoIosAdd size="25px" />
              </Flex>
            }
            >
            Create Event
          </Button>
          <Button
            // fontSize={[16]}
            borderRadius="full"
            shadow="md"
            fontFamily="Poppins"
            mx="10"
            background="whiteAlpha.800"
            color="blackAlpha.700"
            onClick={onOpen2}
            border="1px"
            borderColor="white"
            fontWeight="medium"
            _hover={{
              bgColor: "white",
              transform: "scale(1.01)",
            }}
          >
            {isOpen2 && <SignUpModal isOpen={isOpen2} onOpen={onOpen2} onClose={onClose2} />}
            Signup / Signin
          </Button>
        </Flex>
      </Flex>
      <Drawer
        isOpen={isOpen1}
        placement="left"
        onClose={onClose1}
        //@ts-ignore
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bgColor="#000">
          <DrawerCloseButton color="white" />
          <DrawerHeader />

          <DrawerBody>
            <Link passHref href="/">
              <Image
                src="/logo3.png"
                alt="metabillionaire logo"
                width={170}
                height={75}
                m="0 auto"
              />
            </Link>
            <Flex
              justify="center"
              align="flex-start"
              w="100%"
              mt="md"
              flexDir="column"
              color="white"
            >
              {navbar_menu.map((option) => {
                return (
                  <Box
                    fontSize={17}
                    px="sm"
                    my="xs"
                    cursor="pointer"
                    onClick={() => onClose1()}
                    _hover={{
                      color: "#42a7ff",
                    }}
                    key={option.name}
                  >
                    <Link passHref href={option.link}>
                      <Text
                        fontSize={17}
                        px="sm"
                        cursor="pointer"
                        _hover={{
                          color: "#42a7ff",
                        }}
                        mr="sm"
                      >
                        {option.name}
                      </Text>
                    </Link>
                  </Box>
                )
              })}
              <Spacer />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navbar

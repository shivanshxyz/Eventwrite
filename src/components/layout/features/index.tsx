import {
    Flex,
    Box,
    Text
} from "@chakra-ui/react"

import FeatureCard from "../../atoms/card/feature-card"

export default function Features({} : {}){
    const sampleText:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce maximus velit ornare elit aliquam, fermentum cursus augue consectetur. Donec et justo at odio volutpat pulvinar. Phasellus tincidunt libero lacus, ut bibendum eros ultrices vitae. Phasellus volutpat elit ut purus bibendum gravida."
    return (
        <>
            <Flex flexDir={"column"} justifyContent="center" alignItems="center" gap="10" bgColor={"#d3b1b138"} m="20" pb={10} pt={10} rounded={"xl"}>
                <Text fontFamily="poppins" fontWeight={100} fontSize="6rem">Features</Text>
                <Flex justifyContent="space-evenly" w="full" wrap="wrap" gap="10">
                    <FeatureCard heading="Sample Heading" content={sampleText} image="./image/floatCube.gif"/>
                    <FeatureCard heading="Sample Heading" content={sampleText} image="./image/floatCube.gif"/>
                    <FeatureCard heading="Sample Heading" content={sampleText} image="./image/floatCube.gif"/>
                </Flex>
            </Flex>
        </>
    )
}
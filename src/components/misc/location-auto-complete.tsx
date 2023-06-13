import { useEffect, useRef, useState } from "react"
import axios from "axios"
import mapboxgl from "mapbox-gl"

import { Box, Flex } from "@chakra-ui/react"
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete"

import { MAPBOX_API_KEY } from "../../utils/constants/env"

interface VenueAutoCompleteProps {
  venueXY: Coordinates
  setVenueXY: Action<Coordinates>
}

const VenueAutoComplete = ({ venueXY, setVenueXY }: VenueAutoCompleteProps) => {
  const mapContainerRef = useRef(null)

  const [options, setOptions] = useState([])

  if (!MAPBOX_API_KEY) {
    throw new Error("No Mapbox API key found")
  }

  mapboxgl.accessToken = MAPBOX_API_KEY
  const onVenueChange = async (value: string) => {
    const { data }: AxiosResponse = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${MAPBOX_API_KEY}`
    )
    if (data) {
      setOptions(data.features)
    }
  }

  useEffect(() => {
    if (venueXY.name) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current || "map", // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [venueXY.x, venueXY.y], // starting position
        zoom: 8, // starting zoom
      })
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserLocation: true,
        })
      )

      map.addControl(new mapboxgl.NavigationControl(), "bottom-right")
      const marker = new mapboxgl.Marker().setLngLat([venueXY.x, venueXY.y]).addTo(map)

      return () => map.remove()
    }
  }, [venueXY.name, venueXY.x, venueXY.y])

  return (
    <Flex flexDir={"column"}>
      <Flex w="30%" h="25vh" mt="4" pos="absolute" justifyContent="center">
        <AutoComplete rollNavigation>
          <AutoCompleteInput
            variant="outline"
            placeholder="What's the location?"
            onChange={(e) => {
              onVenueChange(e.target.value)
            }}
            autoFocus
          />
          <AutoCompleteList maxH="10x">
            {options &&
              options.map((option: any, oid) => (
                <AutoCompleteItem
                  key={`option-${oid}`}
                  value={option.place_name}
                  textTransform="capitalize"
                  onClick={() =>
                    setVenueXY({
                      name: option.place_name,
                      x: option.center[0],
                      y: option.center[1],
                    })
                  }
                >
                  {option.place_name}
                </AutoCompleteItem>
              ))}
          </AutoCompleteList>
        </AutoComplete>
      </Flex>
      {venueXY.name && (
        <Box
          className="map-container"
          w="100%"
          h="25vh"
          borderRadius="md"
          mt="20"
          ref={mapContainerRef}
        ></Box>
      )}
    </Flex>
  )
}

export default VenueAutoComplete

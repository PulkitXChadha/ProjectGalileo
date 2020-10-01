/*
 * <license header>
 */

import React from "react";
import { Heading, View, Image } from "@adobe/react-spectrum";
import homeImage from "../images/home.png";
export const Home = () => (
  <View width="size-6000">
    <Heading level={1}>Welcome to Project Galileo!</Heading>
    <Image src={homeImage} alt="Home" />
  </View>
);

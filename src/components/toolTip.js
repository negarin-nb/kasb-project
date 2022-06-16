import React from 'react';
import { View, Text,useState } from 'react-native';
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import { processFontFamily } from "expo-font";

export default function ToolTip({tooltipPos}) {
              return tooltipPos.visible ? (
                <View>
                  <Svg>
                    <Rect
                      x={tooltipPos.x - 50}
                      y={tooltipPos.y + 10}
                      width="90"
                      height="40"
                      fill="#24438E"
                      rx={5}
                    />
                    <TextSVG
                      x={tooltipPos.x - 8}
                      y={tooltipPos.y + 33}
                      fill="white"
                      fontSize="16"
                      fontFamily={processFontFamily("YekanBakhMedium")}
                      textAnchor="middle"
                    >
                      {tooltipPos.value + " تومان"}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }
            
   


  
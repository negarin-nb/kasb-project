import React from 'react';
import { View, Text,useState } from 'react-native';
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import { processFontFamily } from "expo-font";
import arabicPersianReshaper from "arabic-persian-reshaper";
import { NumericFormat } from 'react-number-format';


export default function ToolTip({tooltipPos}) {
              return tooltipPos.visible ? (
                <View>
                  <Svg>
                    <Rect
                      x={tooltipPos.x - 55}
                      y={tooltipPos.y + 10}
                      width="90"
                      height="40"
                      fill="#24438E"
                      rx={5}
                    />
                    <NumericFormat
                      value={tooltipPos.value}
                      displayType="text"
                      thousandSeparator=","
                      decimalSeparator="/"
                      renderText={(value) => (
                        <TextSVG
                          x={tooltipPos.x - 8}
                          y={tooltipPos.y + 33}
                          fill="white"
                          fontSize="12"
                          fontFamily={processFontFamily("IranYekanBold")}
                          textAnchor="middle"
                        >
                          {value +
                            arabicPersianReshaper.PersianShaper.convertArabic(
                              " تومان"
                            )}
                        </TextSVG>
                      )}
                    />
                    
                  </Svg>
                </View>
              ) : null;
            }
            
   


  
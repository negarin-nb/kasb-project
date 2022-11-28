import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NumericFormat } from 'react-number-format';


export default function CurrencyFormat({amount, customeStyle}) {
  return (
    <View>
      <NumericFormat
        value={amount}
        displayType="text"
        thousandSeparator=","
        decimalSeparator="/"
        suffix=" تومان"
        renderText={(value) => <Text style={customeStyle}>{value}</Text>}
      />
    </View>
  );
}


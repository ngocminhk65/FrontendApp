import React from 'react';
import { Image } from 'react-native';

const IconProvider = (source) => ({
  toReactElement: ({ animation, ...props }) => (
    <Image {...props} source={source}/>
  ),
});

export const AssetIconsPack = {
  name: 'assets',
  icons: {
    'home': IconProvider(require('../../assets/image/icon1.svg')),
    // ...
  },
};
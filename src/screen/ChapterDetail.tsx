import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { TaskBar } from '../components/common/Taskbar';
import { AssetIconsPack } from '../components/common/IconProvider';

const HomeScreen = () => (
  <>
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>HOME</Text>
    </Layout><TaskBar />
    </>
);

export default () => (
    <><IconRegistry icons={[EvaIconsPack,AssetIconsPack]} /><ApplicationProvider {...eva} theme={eva.light}>
        <HomeScreen />
    </ApplicationProvider></>
);
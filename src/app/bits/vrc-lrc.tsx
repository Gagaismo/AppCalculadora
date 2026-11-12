import { Stack } from 'expo-router';

import { PantallaVrcLrc } from '@/screens/bits/vrc-lrc';

/** VRC/LRC paso a paso, apilada sobre la pestaña «Bits». */
export default function RutaVrcLrc() {
  return (
    <>
      <Stack.Screen options={{ title: 'VRC / LRC · paridad' }} />
      <PantallaVrcLrc />
    </>
  );
}

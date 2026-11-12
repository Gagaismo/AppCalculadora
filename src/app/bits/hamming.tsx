import { Stack } from 'expo-router';

import { PantallaHamming } from '@/screens/bits/hamming';

/** Hamming paso a paso, apilada sobre la pestaña «Bits». */
export default function RutaHamming() {
  return (
    <>
      <Stack.Screen options={{ title: 'Hamming · corrección FEC' }} />
      <PantallaHamming />
    </>
  );
}

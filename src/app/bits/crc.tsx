import { Stack } from 'expo-router';

import { PantallaCrc } from '@/screens/bits';

/** CRC paso a paso, apilada sobre la pestaña «Bits». */
export default function RutaCrc() {
  return (
    <>
      <Stack.Screen options={{ title: 'CRC · división módulo 2' }} />
      <PantallaCrc />
    </>
  );
}

import { Pressable, Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { buscarFormula } from '@/formulas';

import { ProveedorSesion, textoDeslizador, useSesionFormula } from './sesion';

/**
 * La sesión de una Fórmula: lo cargado en la pantalla vertical que también lee y
 * escribe la pantalla de la gráfica. En RNTL 14 `render` y `fireEvent` llevan `await`.
 */

const shannon = buscarFormula('U05-F17')!;

function Lector({ nombre }: { nombre: string }) {
  const { textos } = useSesionFormula(shannon);
  return <Text testID={`lector-${nombre}`}>{textos.B.join('|')}</Text>;
}

function Escritor({ nombre, valor }: { nombre: string; valor: string }) {
  const { setTextos, olvidar } = useSesionFormula(shannon);
  return (
    <>
      <Pressable testID={`escribir-${nombre}`} onPress={() => setTextos((t) => ({ ...t, B: [valor] }))} />
      <Pressable testID={`olvidar-${nombre}`} onPress={olvidar} />
    </>
  );
}

describe('useSesionFormula', () => {
  it('dos pantallas de la misma Fórmula ven lo mismo dentro del proveedor', async () => {
    await render(
      <ProveedorSesion>
        <Escritor nombre="a" valor="3000" />
        <Lector nombre="b" />
      </ProveedorSesion>,
    );
    expect(screen.getByTestId('lector-b')).toHaveTextContent('');
    await fireEvent.press(screen.getByTestId('escribir-a'));
    expect(screen.getByTestId('lector-b')).toHaveTextContent('3000');
  });

  it('olvidar la sesión vuelve a los campos vacíos', async () => {
    await render(
      <ProveedorSesion>
        <Escritor nombre="a" valor="3000" />
        <Lector nombre="b" />
      </ProveedorSesion>,
    );
    await fireEvent.press(screen.getByTestId('escribir-a'));
    await fireEvent.press(screen.getByTestId('olvidar-a'));
    expect(screen.getByTestId('lector-b')).toHaveTextContent('');
  });

  it('sin proveedor, cada pantalla guarda su propio estado', async () => {
    await render(
      <>
        <Escritor nombre="a" valor="3000" />
        <Lector nombre="b" />
      </>,
    );
    await fireEvent.press(screen.getByTestId('escribir-a'));
    expect(screen.getByTestId('lector-b')).toHaveTextContent('');
  });
});

describe('textoDeslizador', () => {
  it('escribe tres cifras significativas con coma decimal, como las tipearía una persona', () => {
    expect(textoDeslizador(4754.679577)).toBe('4750');
    expect(textoDeslizador(0.0123456)).toBe('0,0123');
    expect(textoDeslizador(-3.14159)).toBe('-3,14');
    expect(textoDeslizador(0)).toBe('0');
  });
});

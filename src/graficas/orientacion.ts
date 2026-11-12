import { useFocusEffect } from 'expo-router';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { useCallback } from 'react';

/**
 * Traba la pantalla en horizontal mientras está enfocada y la devuelve a vertical al
 * salir (D1). Lo usa sólo la pantalla de la gráfica; el resto de la app es vertical.
 *
 * **Por qué no hace falta trabar en vertical al arrancar.** `app.json` mantiene
 * `"orientation": "portrait"`:
 *
 * - En Android eso escribe `android:screenOrientation="portrait"` en la actividad
 *   (`@expo/config-plugins/build/android/Orientation.js`, `setAndroidOrientation`), y
 *   `lockAsync` lo pisa en tiempo de ejecución con `currentActivity.requestedOrientation`
 *   (`expo-screen-orientation/android/.../ScreenOrientationModule.kt:38`). La app arranca
 *   vertical desde el primer cuadro, sin esperar a que cargue el JavaScript.
 * - En iOS `"orientation": "portrait"` deja en `UISupportedInterfaceOrientations` sólo
 *   las verticales (`@expo/config-plugins/build/ios/Orientation.js`), y UIKit sólo
 *   permite las orientaciones que estén en esa lista: el horizontal no funcionaría (o
 *   terminaría en `UIApplicationInvalidInterfaceOrientation`). Por eso `app.json` declara a mano `ios.infoPlist.UISupportedInterfaceOrientations` con
 *   las horizontales —tiene prioridad sobre `orientation`, según
 *   `createInfoPlistPluginWithPropertyGuard`— y el plugin con
 *   `initialOrientation: "PORTRAIT_UP"`, que escribe `EXDefaultScreenOrientationMask`
 *   y es la máscara con la que arranca el módulo
 *   (`ios/ScreenOrientationViewController.swift:32-58`): las demás pantallas siguen en
 *   vertical.
 *
 * La alternativa, `"orientation": "default"` más `lockAsync(PORTRAIT_UP)` al arrancar,
 * dejaba que Android girara durante el splash, antes de que el JavaScript trabara nada.
 *
 * **Por qué se vuelve con `PORTRAIT_UP` y no con `unlockAsync`.** Desbloquear en
 * Android deja la actividad en `unspecified`: la app seguiría al sensor y giraría en
 * todas las pantallas.
 *
 * Los errores se descartan: en web `lockAsync` puede rechazar si el navegador no está a
 * pantalla completa, y la gráfica se usa igual en vertical.
 */
export function useOrientacionHorizontal(): void {
  useFocusEffect(
    useCallback(() => {
      lockAsync(OrientationLock.LANDSCAPE).catch(() => {});
      return () => {
        lockAsync(OrientationLock.PORTRAIT_UP).catch(() => {});
      };
    }, []),
  );
}

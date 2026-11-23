# Límites de EAS Build para este proyecto

Relevados sobre la cuenta real durante el ticket #3. Reemplazan la nota de «sin verificar» que
tenía [`AGENTS.md`](../../AGENTS.md).

| Dato | Valor |
|---|---|
| Cuenta de Expo | `lagueb` |
| `projectId` | `6800743f-f9be-4a0d-8798-c80c9157e8e0` |
| Builds incluidos por mes | **15** |
| Builds simultáneos | **10** |
| Ancho de banda incluido | 100 GiB |

> El nombre exacto del plan no quedó registrado durante el relevamiento. Los números de arriba son
> los que muestra la cuenta; si en algún momento hay que discutir un límite con Expo, conviene
> confirmar contra qué plan corresponden.

## Qué significa para la entrega

La entrega del TFI es en **noviembre de 2026**. Con 15 builds por mes hay margen de sobra: el APK
no se compila en cada cambio, se compila en hitos. El desarrollo del día a día va contra **Expo Go**,
que no consume nada.

La regla práctica que se desprende: **no poner `eas build` en integración continua**. El workflow de
integración continua corre typecheck y tests, y nada más. Compilar en cada push quemaría la cuota del
mes en dos días y no agregaría información que los tests no den ya.

Desde entonces el APK tiene un segundo camino que no consume cuota: el workflow
[`apk.yml`](../../.github/workflows/apk.yml) de GitHub Actions, que compila con `expo prebuild` y
Gradle en el runner. La regla de los hitos se mantiene igual: corre a mano o con un tag de versión,
nunca en cada push. Ver [`docs/compilar-apk.md`](../compilar-apk.md).

Con 10 builds simultáneos, tampoco hay riesgo de cola propia: la espera, cuando la hay, es la cola
compartida del tier gratuito de Expo, no un límite de esta cuenta.

## El keystore

EAS generó el keystore de Android en la nube.

**Ese keystore es el que firma el APK.** Vive en la cuenta de Expo, no en este repositorio. Si se
pierde el acceso a la cuenta no se puede publicar una actualización de la misma app, así que la
cuenta `lagueb` es parte de lo que hay que conservar hasta la entrega.

El workflow `apk.yml` firma con ese mismo keystore, descargado de EAS y cargado como secret del
repositorio. Un APK de Actions se instala encima de uno de EAS; al revés, sólo después de subir el
contador de EAS por encima del último `versionCode` de Actions (ver
[`docs/compilar-apk.md`](../compilar-apk.md)).

## Si alguna vez no alcanzara

Ya no depende de la cuota: el camino habitual es GitHub Actions, que no la consume, y EAS Build queda
como alternativa con sus 15 builds por mes.

Compilar localmente (`npx expo run:android --variant release`) se evaluó y se descartó: exige
instalar Android Studio y el SDK de Android en la máquina de desarrollo, que es justamente lo que este
stack evita, y esa máquina no tiene el espacio en disco para hacerlo.

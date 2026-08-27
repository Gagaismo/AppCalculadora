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
GitHub Actions corre typecheck y tests, y nada más. Compilar en cada push quemaría la cuota del mes
en dos días y no agregaría información que los tests no den ya.

Con 10 builds simultáneos, tampoco hay riesgo de cola propia: la espera, cuando la hay, es la cola
compartida del tier gratuito de Expo, no un límite de esta cuenta.

## El keystore

EAS generó el keystore de Android en la nube, porque la máquina de desarrollo no tiene `keytool`
—viene con el JDK, que no está instalado porque no hace falta Android Studio—.

**Ese keystore es el que firma el APK.** Vive en la cuenta de Expo, no en este repositorio. Si se
pierde el acceso a la cuenta no se puede publicar una actualización de la misma app, así que la
cuenta `lagueb` es parte de lo que hay que conservar hasta la entrega.

## Si alguna vez no alcanzara

La alternativa evaluada es compilar localmente:

```
npx expo run:android --variant release
```

No consume cuota de EAS, pero exige instalar Android Studio y el SDK de Android en la máquina de
desarrollo, que es justamente lo que este stack evita. Es un plan de contingencia, no el camino
habitual.

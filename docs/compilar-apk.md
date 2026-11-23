# Compilar el APK con GitHub Actions

El APK se compila con el workflow [`apk.yml`](../.github/workflows/apk.yml): `expo prebuild` genera
el proyecto Android en el runner y Gradle lo compila. No usa EAS Build, así que no consume su cuota
de 15 builds por mes, y como el repositorio es público los minutos de GitHub Actions no se cobran.

El APK sale firmado con **el mismo keystore que EAS ya tiene para la app**, así que se instala encima
de los APK que compiló EAS sin desinstalar nada. Para eso hay que cargar el keystore una sola vez como
secret del repositorio. Sin esos secrets el workflow falla a propósito: nunca publica un APK firmado
con la clave de debug.

## 1. Cargar el keystore (una sola vez)

Son cuatro secrets del repositorio:

| Secret | Valor |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | El `.jks` codificado en base64 |
| `ANDROID_KEYSTORE_PASSWORD` | Contraseña del keystore |
| `ANDROID_KEY_ALIAS` | Alias de la clave |
| `ANDROID_KEY_PASSWORD` | Contraseña de la clave |

### Camino principal: el asistente

Desde la raíz del repositorio, en Git Bash:

```
bash scripts/cargar-keystore.sh
```

Inicia sesión en Expo si hace falta, abre `eas credentials` para bajar las credenciales de EAS a
`credentials.json`, carga los cuatro secrets con `gh secret set` pasándolos por entrada estándar
—ninguna contraseña se muestra ni se copia—, borra `credentials.json` y el `.jks` y verifica con
`gh secret list` que estén los cuatro. Necesita `node` y `gh` con sesión iniciada.

### Alternativa manual

1. **Bajar el keystore**: `npx eas-cli credentials` → **Android** → perfil `apk` →
   **Keystore: Manage everything needed to build your project** → **Download existing keystore**.
   El CLI guarda un `.jks` y muestra el alias y las dos contraseñas. El `.jks` **no se commitea**:
   si quedó dentro del repositorio, movelo afuera antes de cualquier `git add`.
2. **Pasarlo a base64**, porque un secret es texto. Lo más limpio es no pasar por el portapapeles:

   ```
   base64 -w0 ruta/al/keystore.jks | gh secret set ANDROID_KEYSTORE_BASE64
   ```

   O generar el archivo y cargarlo con `gh secret set ANDROID_KEYSTORE_BASE64 < archivo`. Con
   `certutil -encode ruta\al\keystore.jks keystore.b64.txt` también sirve (el workflow tolera sus
   encabezados y saltos de línea). Con PowerShell,
   `[Convert]::ToBase64String([IO.File]::ReadAllBytes("ruta\al\keystore.jks")) | Set-Clipboard`
   lo deja en el portapapeles para pegarlo en la web; después **limpiá el historial del
   portapapeles** (Win+V → **Borrar todo**), porque el keystore queda guardado ahí.
3. **Cargar los otros tres**: `gh secret set NOMBRE`, que pide el valor sin mostrarlo, o desde la web
   en **Settings → Secrets and variables → Actions → New repository secret**.
4. **Borrar** de la PC el `.jks` y cualquier `keystore.b64.txt`: es el keystore, sólo que en texto.

## 2. Disparar la compilación

El APK se compila en hitos, no en cada push. Hay dos formas:

- **A mano**: `gh workflow run apk.yml`, o desde la pestaña **Actions → Compilar APK → Run workflow**.
  El botón y el comando sólo funcionan cuando `apk.yml` ya está en la rama por defecto (`main`).
- **Con un tag de versión**: además del APK, crea una **Release** de GitHub con el archivo adjunto.

  ```
  git tag v1.2.0
  git push origin v1.2.0
  ```

Antes de compilar, el workflow corre `typecheck` y los tests: un APK roto no llega a compilarse.

El APK incluye `arm64-v8a` y `armeabi-v7a`: corre en celulares de 64 bits y en los de 32 bits de
gama baja, pero no en emuladores x86.

## 3. Dónde bajar el APK

- **Siempre**: en la corrida, sección **Artifacts** al pie, o con `gh run download`. El artefacto se
  llama `calculadora-comunicaciones-v<versión>-<versionCode>` y GitHub lo guarda 90 días.
- **Si se disparó con un tag**: en **Releases**, adjunto a la versión.

El `versionCode` es 1000 más el número de corrida, para quedar siempre por encima del que lleva EAS:
Android no deja instalar un APK encima de otro con `versionCode` mayor.

La contracara: una vez instalado un APK de Actions (`versionCode` 1001 o más), un APK posterior de
EAS, cuyo contador va mucho más abajo, **no se instala encima** sin desinstalar la app. Si hace falta
volver a compilar con EAS, antes hay que subir su contador por encima del último `versionCode` de
Actions (se ve en el nombre del artefacto):

```
npx eas-cli build:version:set --platform android
```

## Qué es público

El repositorio es público, así que **cualquiera puede descargar los artifacts y las Releases**. Eso
está bien para un APK que se entrega a la cátedra, pero conviene saberlo.

Los **secrets no se exponen**: GitHub no los muestra en los logs y no se los pasa a los workflows que
disparan los pull requests desde forks. Además, `apk.yml` no corre en pull requests.

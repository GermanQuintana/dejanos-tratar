# Déjanos tratar

Web estática divulgativa en español, revisada el 27 de septiembre de 2026.

Abrir `dist/index.html` o servir `dist` mediante un servidor web. `server.py` permite previsualizar con soporte de peticiones parciales para los medios en http://127.0.0.1:8765. Ejecutarlo con Python 3.

La carpeta `dist` contiene la web completa y se puede publicar en un alojamiento estático. No requiere instalación ni compilación. Los archivos de medios suman aproximadamente 470 MB; comprobar los límites del proveedor antes de publicarlos. `media-manifest.json` conserva los nombres originales. Los originales no se han modificado.

Publica 16 audios y 14 vídeos, incluidos dos karaokes; conserva los 17 audios originales y el PDF de letras aportados en el repositorio, navegación móvil, reproducción y descarga, fuentes junto a las afirmaciones y estilos de impresión. El reproductor de audio permite ir a la canción anterior o siguiente y avanza automáticamente cuando acaba una canción. No reproduce medios automáticamente al abrir la página. Usa fuentes de Google Fonts con alternativas locales y no incluye analítica ni formularios.

La normativa se diferencia de las propuestas. La nueva ley se presenta como proyecto en fase de enmiendas. La reforma de 2025 no se presenta como derogación. La cesión limitada se distingue de una habilitación general de dispensación. Las posiciones institucionales se atribuyen a los documentos enlazados, sin implicar adhesión a esta iniciativa.

14 OCT: se mantiene el llamamiento en Madrid; hora, lugar y recorrido se remiten a las comunicaciones oficiales. No se publican plazos de enmiendas ni cifras sectoriales de verificación incierta.

Publicación mediante GitHub Pages: el flujo `.github/workflows/pages.yml` publica la carpeta `dist` al actualizar `main`. No requiere servicios externos para servir los medios. GitHub Pages debe estar configurado con GitHub Actions como origen.

Actualización: cartel retirado de la página y apartado de firmantes del convenio eliminado. Cada grabación muestra la letra del bloque correspondiente del PDF aportado, sin estilos, metadatos, estrellas ni etiquetas entre corchetes. Las versiones agrupadas en el PDF comparten esa letra.

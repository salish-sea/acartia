export type MapLayer = {
  /**
   * The url of the map layer tile server.
   */
  tiles: string;

  /**
   * The url of the thumbnail to be displayed in the layers panel.
   */
  thumbnail: string;

  /**
   * Label to be displayed in the layers panel.
   */
  label: string;

  /**
   * Color we can use for text that should contrast the thumbnail image (for collapsed layers panel button).
   */
  contrastColor: string;
};

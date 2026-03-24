export type OverlayConfigItem = {
  /**
   * The url to fetch external overlay data from.
   */
  url: string;

  /**
   * The url to fetch the thumbnail for the layers card.
   */
  thumbnail: string;

  /**
   * The url of the overlay icon to use when plotting them on the map.
   */
  iconUrl: string;

  /**
   * Label to which an overlay is referred to, used as display name in layers card.
   */
  label: string;

  /**
   * The map object we use to map the raw data from the external source to a normalised
   * form for us to render.
   */
  map: OverlayMap;

  /**
   * Extra request param stuff we can pass through.
   * TODO: Could this cause any problems?
   */
  request?: { body?: object; method?: string };
};

export type OverlayMap = {
  /**
   * Keys delimited by '.' to access the collection of features from the corresponding object.
   */
  features: string;

  /**
   * Keys delimited by '.' to access the overlay id from the corresponding object.
   */
  id: string;

  /**
   * Keys delimited by '.' to access the overlay name from the corresponding object.
   */
  name: string;

  /**
   * Keys delimited by '.' to access the overlay latitude from the corresponding object.
   */
  latitude: string;

  /**
   * Keys delimited by '.' to access the overlay longitude from the corresponding object.
   */
  longitude: string;
};

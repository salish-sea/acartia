import store from '../../store'
import { generateInitFilterState }  from "../../constants"

describe('Vuex Store Mutations', () => {
  beforeEach(() => {
    // Reset the state before each test
    store.replaceState({
      isAuthenticated: false,
      token: null,
      userDetails: [],
      isAdmin: false,
      userRequestList: [],
      sightings: [],
      filteredSightings: [],
      lastSighting: undefined,
      loading: false,
      error: null,
      mapFilters: generateInitFilterState(7, 1),
      mapOptions: {
        contributors: [],
        species: [],
      },
      map: null,
      activeMapLayer: "ssemi-map-layer",
      tableFilters: generateInitFilterState(1, 1),
      tableSightings: []
    });
  });

  it('sets the authentication status', () => {
    store.commit('setAuthentication', true);
    expect(store.state.isAuthenticated).toBe(true);

    store.commit('setAuthentication', false);
    expect(store.state.isAuthenticated).toBe(false);
  });

  it('sets the user token', () => {
    store.commit('setUserToken', 'sample_token');
    expect(store.state.token).toBe('sample_token');

    store.commit('setUserToken', null);
    expect(store.state.token).toBe(null);
  });

  it('sets user details', () => {
    const userDetails = { name: 'John Doe' };
    store.commit('setUserDetails', userDetails);
    expect(store.state.userDetails).toEqual(userDetails);
  });

  it('sets admin status', () => {
    store.commit('setIsAdmin', true);
    expect(store.state.isAdmin).toBe(true);

    store.commit('setIsAdmin', false);
    expect(store.state.isAdmin).toBe(false);
  });

  it('sets the user request list', () => {
    const requestList = [{ id: 1, request: 'Sample request' }];
    store.commit('setUserRequestList', requestList);
    expect(store.state.userRequestList).toEqual(requestList);
  });

  it('sets sightings and filtered sightings', () => {
    const sightings = [{ properties: { type: 'Orca' } }];
    store.commit('setSightings', sightings);
    expect(store.state.sightings).toEqual(sightings);
    expect(store.state.filteredSightings).toEqual(sightings);
  });

  it('empties sightings', () => {
    store.commit('setSightings', [{ id: 1 }]);
    store.commit('emptySightings');
    expect(store.state.sightings).toEqual([]);
    expect(store.state.filteredSightings).toEqual([]);
  });

  it('sets loading state', () => {
    store.commit('setLoading', true);
    expect(store.state.loading).toBe(true);

    store.commit('setLoading', false);
    expect(store.state.loading).toBe(false);
  });

  it('sets error state', () => {
    const errorMessage = 'An error occurred';
    store.commit('setError', errorMessage);
    expect(store.state.error).toBe(errorMessage);

    store.commit('setError', null);
    expect(store.state.error).toBe(null);
  });

  it('sets the last sighting -  once set, doesn\'t change without refresh', () => {
    const sighting = { id: 1, properties: { type: 'bird' } };
    store.commit('setLastSighting', sighting);
    expect(store.state.lastSighting).toEqual(sighting);

    const newSighting = { id: 2 };
    store.commit('setLastSighting', newSighting);
    expect(store.state.lastSighting).toEqual(sighting);
  });

  it('resets map filters', () => {
    const originalFilters = { ...store.state.mapFilters };
    store.commit('setFilterSpecies', 'Orca');
    store.commit('resetMapFilters');
    expect(store.state.mapFilters).toEqual(originalFilters);
  });

  it('sets map', () => {
    const map = { id: 'mapInstance' };
    store.commit('setMap', map);
    expect(store.state.map).toEqual(map);
  });

  it('sets map options', () => {
    const options = { contributors: ['OrcaSound'], species: ['Orca'] };
    store.commit('setMapOptions', options);
    expect(store.state.mapOptions).toEqual(options);
  });

  it('sets active map layer', () => {
    store.commit('setActiveMapLayer', 'new-layer');
    expect(store.state.activeMapLayer).toBe('new-layer');
  });

  it('sets filter verified only', () => {
    store.commit('setFilterVerifiedOnly', true);
    expect(store.state.mapFilters.verifiedOnly).toBe(true);
  });

  it('sets filter species', () => {
    store.commit('setFilterSpecies', 'Orca');
    expect(store.state.mapFilters.species).toBe('Orca');
  });

  it('sets filter contributor', () => {
    store.commit('setFilterContributor', 'OrcaSound');
    expect(store.state.mapFilters.contributor).toBe('OrcaSound');
  });

  it('sets filter date begin', () => {
    const date = '2024-01-01';
    store.commit('setFilterDateBegin', date);
    expect(store.state.mapFilters.dateBegin).toBe(date);
  });

  it('sets filter date end', () => {
    const date = '2024-12-31';
    store.commit('setFilterDateEnd', date);
    expect(store.state.mapFilters.dateEnd).toBe(date);
  });

  it('sets table filter species', () => {
    store.commit('setTableFilterSpecies', 'Dolphin');
    expect(store.state.tableFilters.species).toBe('Dolphin');
  });

  it('sets table filter contributor', () => {
    store.commit('setTableFilterContributor', 'OrcaSound');
    expect(store.state.tableFilters.contributor).toBe('OrcaSound');
  });

  it('sets table filter date start', () => {
    const date = '2024-06-15';
    store.commit('setTableFilterDate', date);
    expect(store.state.tableFilters.dateBegin).toBe(date);
  });

  it('sets table filter date end', () => {
    const date = '2024-06-30';
    store.commit('setTableFilterDate', date);
    expect(store.state.tableFilters.dateEnd).toBe(date);
  });
});

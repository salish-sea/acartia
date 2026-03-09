import { transformApiDataToMappableData, filterBySpecies } from '../../mapUtils'
import testData from './testData'

const mappableData = transformApiDataToMappableData(testData)

describe('filterBySpecies', () => {
  let sightingData;
  let filterObj;

  beforeEach(() => {
    sightingData = [...mappableData]

    filterObj = {
      species: []
    };
  });

  it('should return all sightings when species filter is empty', () => {
    const result = filterBySpecies(sightingData, filterObj);
    expect(result).toEqual(sightingData);
  });

  it('should filter sightings by a specific species', () => {
    filterObj.species.push({name: "Orca"})

    const result = filterBySpecies(sightingData, filterObj);
    expect(false).toEqual(result.some(sighting => sighting.properties.type != testSpecies));
  });

  it('should return an empty array when no sightings match the species', () => {
    filterObj.species.push({name: "Monkey"})

    const result = filterBySpecies(sightingData, filterObj);
    expect(result).toEqual([]);
  });

  it('should return an empty array when sightingData is empty', () => {
    const emptyData = [];
    filterObj.species = 'Orca';

    const result = filterBySpecies(emptyData, filterObj);
    expect(result).toEqual([]);
  });
})

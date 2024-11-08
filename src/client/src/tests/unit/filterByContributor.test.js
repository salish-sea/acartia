import { transformApiDataToMappableData, filterByContributor } from '../../mapUtils'
import testData from './testData'

const mappableData = transformApiDataToMappableData(testData)

describe('filter sightings by contributor', () => {
  let sightingData;
  let filterObj;

  beforeEach(() => {
    sightingData = [...mappableData]

    filterObj = {
      contributor: []
    };
  });

  it('should return all sightings when contributor filter is empty', () => {
    const result = filterByContributor(sightingData, filterObj);
    expect(result.length).toEqual(sightingData.length);
  });

  it('should filter sightings by a specific contributor', () => {
    filterObj.contributor.push({name: "OrcaSound"})

    const result = filterByContributor(sightingData, filterObj);
    expect(false).toEqual(result.some(sighting => sighting.properties.type != testContributor));
  });

  it('should return an empty array when no sightings match the contributor', () => {
    filterObj.contributor.push({name: "Banksy"})

    const result = filterByContributor(sightingData, filterObj);
    expect(result).toEqual([]);
  });

  it('should return an empty array when sightingData is empty', () => {
    const emptyData = [];
    filterObj.contributor.push({name: "OrcaSound"})

    const result = filterByContributor(emptyData, filterObj);
    expect(result).toEqual([]);
  });
})

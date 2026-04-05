import { transformApiDataToMappableData, filterByVerificationStatus} from '../../mapUtils'
import testData from './testData'

const mappableData = transformApiDataToMappableData(testData)

describe('filterByVerificationStatus', () => {
  let sightingData;
  let filterObj;

  beforeEach(() => {
    sightingData = [...mappableData]

    filterObj = {
      verifiedOnly: false,
    };
  });

  it('should return all sightings when verifiedOnly is false', () => {
    const result = filterByVerificationStatus(sightingData, filterObj);
    expect(result).toEqual(sightingData);
  });

  it('should filter sightings to include only verified entries when verifiedOnly is true', () => {
    filterObj.verifiedOnly = true;

    const result = filterByVerificationStatus(sightingData, filterObj);
    expect(false).toEqual(result.some(sighting => sighting.properties.verified == false));
  });

  it('should return an empty array when no sightings are verified', () => {
    filterObj.verifiedOnly = true; // Set verifiedOnly to true
    sightingData = [
      { properties: { verified: false } },
      { properties: { verified: false } },
    ]; // All sightings are unverified

    const result = filterByVerificationStatus(sightingData, filterObj);
    expect(result).toEqual([]); // Should return an empty array
  });

  it('should return an empty array when sightingData is empty', () => {
    const emptyData = [];
    filterObj.verifiedOnly = true; // Set verifiedOnly to true

    const result = filterByVerificationStatus(emptyData, filterObj);
    expect(result).toEqual([]); // Should return an empty array
  });
})

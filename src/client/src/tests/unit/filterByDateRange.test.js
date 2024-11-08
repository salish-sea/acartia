import { filterByDateRange } from '../../mapUtils'
import dayjs from 'dayjs'

describe('filterByDateRange', () => {
  let sightingData;
  let filterObj;

  beforeEach(() => {
    sightingData = [
      { properties: { created: "2024-09-20 01:31:00" } },
      { properties: { created: "2024-09-21 01:31:00" } },
      { properties: { created: "2024-09-22 01:31:00" } },
      { properties: { created: "2024-09-24 01:31:00" } },
      { properties: { created: "2024-09-25 01:31:00" } },
      { properties: { created: "2024-09-25 01:31:00" } },
      { properties: { created: "2024-09-26 01:31:00" } },
      { properties: { created: "2024-09-26 01:31:00" } },
    ];

    filterObj = {
      dateBegin: '2024-09-21',
      dateEnd: '2024-09-25',
    };
  });

  it('should return sightings within the specified date range', () => {
    const result = filterByDateRange(sightingData, filterObj);
    expect(result).toEqual(
      [
      { properties: { created: "2024-09-21 01:31:00" } },
      { properties: { created: "2024-09-22 01:31:00" } },
      { properties: { created: "2024-09-24 01:31:00" } },
      { properties: { created: "2024-09-25 01:31:00" } },
      { properties: { created: "2024-09-25 01:31:00" } },
      ]
    );
  });

  it('should return an empty array when no sightings match the date range', () => {
    filterObj.dateBegin = '2025-09-21';
    const result = filterByDateRange(sightingData, filterObj);
    expect(result).toEqual([]);
  });

  it('should return an empty array when only end date is specified', () => {
    filterObj.dateBegin = undefined;
    const result = filterByDateRange(sightingData, filterObj);
    expect(result).toEqual([]);
  });

  it('should handle dates when only start date is specified', () => {
    filterObj.dateEnd = undefined;
    const result = filterByDateRange(sightingData, filterObj);
    expect(result).toEqual([]);
  });

  it('should return an empty array when sightingData is empty', () => {
    const emptyData = [];
    const result = filterByDateRange(emptyData, filterObj);
    expect(result).toEqual([]);
  });

  // Edge Cases
  it('should return all sightings when the date range includes all dates', () => {
    filterObj.dateBegin = '2024-09-19';
    filterObj.dateEnd = '2024-09-26';
    const result = filterByDateRange(sightingData, filterObj);
    expect(result).toEqual(sightingData);
  });

  it('should handle cases where the start and end dates are the same', () => {
    filterObj.dateBegin = '2024-09-25';
    filterObj.dateEnd = '2024-09-25';
    const result = filterByDateRange(sightingData, filterObj);
    expect(result).toEqual([
      { properties: { created: "2024-09-25 01:31:00" } },
      { properties: { created: "2024-09-25 01:31:00" } },
    ]);
  });

  it('should handle dates at the boundaries of the sighting data', () => {
    filterObj.dateBegin = '2024-09-20';
    filterObj.dateEnd = '2024-09-26';
    const result = filterByDateRange(sightingData, filterObj);
    expect(result).toEqual([
      { properties: { created: "2024-09-20 01:31:00" } },
      { properties: { created: "2024-09-21 01:31:00" } },
      { properties: { created: "2024-09-22 01:31:00" } },
      { properties: { created: "2024-09-24 01:31:00" } },
      { properties: { created: "2024-09-25 01:31:00" } },
      { properties: { created: "2024-09-25 01:31:00" } },
      { properties: { created: "2024-09-26 01:31:00" } },
      { properties: { created: "2024-09-26 01:31:00" } },
    ]);
  });
})

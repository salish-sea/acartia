import dayjs from 'dayjs'

const ALL_SPECIES = "allSpecies"
const ALL_CONTRIBUTORS = "allContributors"

export function filterSightingData(sightingData, filterObj) {

  //filterByDate
  let startDate = filterObj.dateBegin
  let endDate = filterObj.dateEnd

  let endIdx = sightingData.length - 1
  let startIdx = 0

  //Sliding window; find last idx in date range
  for (let i = endIdx; i >= 0; i--) {
    if (dayjs(sightingData[i].properties.created.slice(0, 10)).isSame(dayjs(endDate))) {
      endIdx = i
      break
    }
  }

  //Sliding window; find first idx in date range
  for (let i = endIdx; i >= 0; i--) {
    if (dayjs(sightingData[i].properties.created.slice(0, 10)).isBefore(dayjs(startDate))) {
      startIdx = i + 1
      break
    }
  }

  sightingData = sightingData.slice(startIdx, endIdx)

  //Filter by verification i.e. if true, remove unverfied data
  if (filterObj.verifiedOnly === true) {
    sightingData = sightingData.filter(sighting => sighting.properties.verified)
  }


  //Filter by Species
  if (filterObj.species != ALL_SPECIES) {
    sightingData = sightingData.filter(sighting => {
      if (sighting.properties.type == filterObj.species) {
        return true
      } else {
        return false
      }
    })
  }

  //Filter by Contributor (field is data_source_witness from api, becomes witness after mutation)
  if (filterObj.contributor != ALL_CONTRIBUTORS) {
    sightingData = sightingData.filter(sighting => {
      if (sighting.properties.witness == filterObj.contributor) {
        return true
      } else {
        return false
      }
    })
  }

  return sightingData
}

export const legendColorMap = {
    "Atlantic White-sided Dolphin": "#FF5733",
    "Atlantic White-sided Dolphin Sighting:": "#FF8D1A",
    "Autre": "#FFC300",
    "Baird's Beaked Whale": "#DAF7A6",
    "Beluga": "#33FF57",
    "Beluga Whale": "#33FFBF",
    "Beluga Whale Sighting:": "#33A1FF",
    "black right whale": "#337BFF",
    "Blue Shark": "#8A2BE2",
    "Blue Whale": "#7B33FF",
    "Blue Whale Sighting:": "#6A5ACD",
    "Bottlenose Dolphin": "#FF33F6",
    "Bottlenose Whale": "#FF33A1",
    "Common Dolphin": "#FF5733",
    "Common Dolphin - Unidentified": "#FF8D1A",
    "Common Dolphin Sighting:": "#FFC300",
    "Common Long-Beaked Dolphin": "#DAF7A6",
    "Common Short-Beaked Dolphin": "#33FF57",
    "Dall's Porpoise": "#33FFBF",
    "Dall\\'s Porpoise": "#33A1FF",
    "Fin Whale": "#337BFF",
    "Fin Whale Sighting:": "#8A2BE2",
    "Finback Whale": "#7B33FF",
    "Gray Whale": "#6A5ACD",
    "Gray Whale Sighting:": "#FF33F6",
    "Grey": "#FF33A1",
    "grey whale": "#FF5733",
    "Harbor Porpoise": "#FF8D1A",
    "Humpback": "#FFC300",
    "Humpback Sighting:": "#DAF7A6",
    "Humpback Whale": "#33FF57",
    "Killer Whale": "#33FFBF",
    "Killer Whale (Orca)": "#33A1FF",
    "Killer Whale (Orca) Sighting:": "#337BFF",
    "Killer Whale Sighting:": "#8A2BE2",
    "long-beaked common dolphin": "#7B33FF",
    "Long-beaked Common Dolphin": "#6A5ACD",
    "Marsouin commun": "#FF33F6",
    "Minke Whale": "#FF33A1",
    "Minke Whale Sighting:": "#FF5733",
    "Mola Mola / Sunfish": "#FF8D1A",
    "Non spÃ©cifiÃ©": "#FFC300",
    "Non spécifié": "#DAF7A6",
    "Northern Right Whale Dolphin": "#33FF57",
    "Northern Right Whale Dolphin Sighting:": "#33FFBF",
    "Orca": "#33A1FF",
    "Orca Sighting:": "#337BFF",
    "Other": "#8A2BE2",
    "Other (Specify in comments)": "#7B33FF",
    "Other (Specify in comments) Sighting:": "#6A5ACD",
    "Other Sighting:": "#FF33F6",
    "Other Species": "#FF33A1",
    "Pacific White-Sided Dolphin": "#FF5733",
    "Pacific White-sided Dolphin": "#FF8D1A",
    "Pacific White-sided Dolphin Sighting:": "#FFC300",
    "Petit rorqual": "#DAF7A6",
    "Right Whale": "#33FF57",
    "Right Whale Sighting:": "#33FFBF",
    "Risso's Dolphin": "#33A1FF",
    "Risso's Dolphin Sighting:": "#337BFF",
    "Risso\\'s Dolphin": "#8A2BE2",
    "Sei Whale": "#7B33FF",
    "Short Finned Pilot Whale": "#6A5ACD",
    "Short Finned Pilot Whale Sighting:": "#FF33F6",
    "Southern Resident Killer Whale": "#FF33A1",
    "Southern Resident Killer Whale Sighting:": "#FF5733",
    "Southern Resident Orca": "#FF8D1A",
    "Sowerby's Beaked Whale": "#FFC300",
    "Sperm Whale": "#DAF7A6",
    "Sperm Whale Sighting:": "#33FF57",
    "steller sealion": "#33FFBF",
    "Striped Dolphin": "#33A1FF",
    "Unspecified": "#337BFF",
    "Unspecified Sighting:": "#8A2BE2",
    "Whale - Unidentified": "#7B33FF"
};

export function getPopupHtmlString(sighting) {
  let verified = sighting.verified == 1 ? "True" : "False"

  return `<div style="
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #F2F2FF;
    width: 200px;
    padding: 10px;
    padding-top:2rem;
    box-sizing: border-box;
    position: relative;
    border-radius: 10px;
">
    <span style="
        color: var(--Primary, #545F71);
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 19px;
        letter-spacing: -0.28px;
        margin-top: 10px; /* Added margin-top for the first span */
    "><b>Date: </b><span style="font-weight: 400;">

    ${sighting.created}

    </span></span>

    <hr style="width: 100%; border: 1px solid #ccc; margin: 10px 0;">
    <span style="
        color: var(--Primary, #545F71);
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-style: normal;
text-align: left;
        font-weight: 600;
        line-height: 19px;
        letter-spacing: -0.28px;
    "><b>Species: </b><span style="font-weight: 400;">

    ${sighting.type}

    </span></span>
    <hr style="width: 100%; border: 1px solid #ccc; margin: 10px 0;">
    <span style="
        color: var(--Primary, #545F71);
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 19px;
text-align:left;
        letter-spacing: -0.28px;
    "><b>No Sighted: </b><span style="font-weight: 400;">

    ${sighting.no_sighted}

    <span></span>


    <hr style="width: 100%; border: 1px solid #ccc; margin: 10px 0;">
    <span style="
        color: var(--Primary, #545F71);
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 19px;
        letter-spacing: -0.28px;
    "><b>Submitter: </b><span style="font-weight: 400;">

    ${sighting.witness}

    <span></span>


    <hr style="width: 100%; border: 1px solid #ccc; margin: 10px 0;">
    <span style="
        color: var(--Primary, #545F71);
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 19px;
        letter-spacing: -0.28px;
    "><b>Contributor: </b><span style="font-weight: 400;">

    ${sighting.entity}

   <span></span>


    <hr style="width: 100%; border: 1px solid #ccc; margin: 10px 0;">
    <span style="
        color: var(--Primary, #545F71);
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 19px;
        letter-spacing: -0.28px;
    "><b>Time of Sighting: </b><span style="font-weight: 400;">

    ${sighting.ssemmi_date_added}

    <span></span>


        <hr style="width: 100%; border: 1px solid #ccc; margin: 10px 0;">
            <span style="
        color: var(--Primary, #545F71);
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 19px;
text-align:left;
        letter-spacing: -0.28px;
    "><b>Sighting Ref: </b><span style="font-weight: 400;">

    ${sighting.sightingRef}

    <span></span>
        <hr style="width: 100%; border: 1px solid #ccc; margin: 10px 0;">

            <span style="
        color: var(--Primary, #545F71);
        font-family: Inter, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 19px;
text-align:left;
        letter-spacing: -0.28px;
    "><b>Verified: </b><span style="font-weight: 400;"> ${verified}
    <span></span>
        <hr style="width: 100%; border: 1px solid #ccc; margin: 10px 0;">
    </div>
`
}

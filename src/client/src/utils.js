import dayjs from 'dayjs'

export function getNDaysAgo(n) {
  let day = dayjs(new Date()).subtract(n, "day")
  day = day.format('YYYY-MM-DD')
  return day
}

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

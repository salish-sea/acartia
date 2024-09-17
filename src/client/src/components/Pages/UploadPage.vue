<template>
    <div id="about-container">
        <div class="page-desc">
            <h2>Upload Sightings</h2>
            <div>
                Manual upload
            </div>
            <div>
                <form>
                    <label for="date">Date Sighted*</label>
                    <input type="date" id="date" name="date">
                    <label for="species">Species*</label>
                    <select id="species" name="species">
                        <option value="whale1">Whale 1</option>
                        <option value="whale1">Whale 2</option>
                        <option value="whale1">Whale 3</option>
                        <option value="whale1">Whale 4</option>
                    </select>
                    <label for="pod">Pod</label>
                    <select id="pod" name="pod">
                        <option value="pod1">Pod 1</option>
                        <option value="pod2">Pod 2</option>
                        <option value="pod3">Pod 3</option>
                        <option value="pod4">Pod 4</option>
                    </select>
                    <label for="number">Number Sightings*</label>
                    <select id="number" name="number">
                        <option value="no1">Number 1</option>
                        <option value="no2">Number 2</option>
                        <option value="no3">Number 3</option>
                        <option value="no4">Number 4</option>
                    </select>
                    <label for="behaviour">Observed Behaviours</label>
                    <select id="behaviour" name="behaviour">
                        <option value="behaviour1">behaviour 1</option>
                        <option value="behaviour2">behaviour 2</option>
                        <option value="behaviour3">behaviour 3</option>
                        <option value="behaviour4">behaviour 4</option>
                    </select>
                    <label for="notes">Additional notes</label>
                    <textarea name="notes" rows="10" cols="30"></textarea>
                </form>
            </div>
        </div> 
    </div>
</template>

<script>
import { mdbRow} from 'mdbvue'

export default {
    name: 'About',
    components: {
        mdbRow
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.page-desc {
    font-family: 'Inter';
    text-align: left;
    width: 50%;
    padding: 5%;
    margin: auto;
    position: relative;
    margin-left: 5%;
    display: inline-table;
    color: rgba(84, 95, 113, 1);
}

h2 {
    font-family: 'Inter';
    font-weight: 700 !important;
    font-size: 32px;
    text-align: center;
    letter-spacing: -0.02em;
    line-height: 36px;
    padding-bottom: 12px;
}

h3 {
    font-weight: 700 !important;
    font-size: 24px !important;
    text-align: left;
    line-height: 30px;
    letter-spacing: -0.02em;
}

#first {
    line-height: 22px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.02em;
    text-align: center;
}

#first span {
    display: block;
}

#step1 {
    text-align: left;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.02em;
    margin-top: 20px;
    width: 864px;
}

#step2 {
    text-align: left;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.02em;
    margin-top: 30px;
}

#content1{
    margin-top: 20px;
}

#content2{
    margin-top: 20px;
}

#content3 {
    font-family: 'Inter';
    text-align: center;
    width: 678px;
    height: 228px;
    padding: 64px, 0px, 0px, 0px;
    margin: auto;
    margin-left: 5%;
    display: inline-block;
    color: rgba(84, 95, 113, 1);
}

#content3 h3 {
    text-align: center;
}

#list{
    margin-top: 20px;
}

#buttons {
    display: block;
    padding: 24px;
    border: none;
    border-radius: 12px;
    background: #EEF1F4 !important;
    text-decoration: none;
    width: 327px;
    height: 78px;
    box-shadow: none;
    font-family: 'Inter';
    font-weight: 700;
    font-size: 24px;
    text-align: left;
    letter-spacing: -0.02em;
    line-height: 30px;
    color: rgba(84, 95, 113, 1);
    text-transform: none;
    margin: auto;
    margin-top: 24px;
}

.icon {
    max-width: 70%;
    max-height: 70%;
}

.righticon {
    padding-right: 200%;
    display: inline;
}

li {
    margin-bottom: 24px;
}

#export-btn {
    display: block;
    padding: 24px;
    border: none;
    border-radius: 12px;
    background: #EEF1F4 !important;
    text-decoration: none;
    width: 327px;
    height: 110px;
    box-shadow: none;
    font-family: 'Inter';
    font-weight: 700;
    font-size: 24px;
    text-align: left;
    letter-spacing: -0.02em;
    line-height: 30px;
    color: rgba(84, 95, 113, 1);
    text-transform: none;
    margin: auto;
}

#export-btn span {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.02em;
    display: inline-block;
    padding-top: 6px;
}

#contact-btn {
    display: block;
    padding: 24px;
    border: none;
    border-radius: 12px;
    background: #EEF1F4 !important;
    text-decoration: none;
    width: 327px;
    height: 110px;
    box-shadow: none;
    font-family: 'Inter';
    font-weight: 700;
    font-size: 24px;
    text-align: left;
    letter-spacing: -0.02em;
    line-height: 30px;
    color: rgba(84, 95, 113, 1);
    text-transform: none;
    margin: auto;
}

#contact-btn span {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.02em;
    display: inline-block;
    padding-top: 6px;
}

.row {
    margin-top: 24px;
}
</style>

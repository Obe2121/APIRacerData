addYearField();
addRoundField();
addSubmitButton();
createRacerTable();

function addYearField(){
    input1 = document.createElement('input');
    input1.placeholder="Enter Year";
    input1.name='year';
    input1.classList.add('form-control');
    document.body.appendChild(input1);
};

function addRoundField(){
    input2 = document.createElement('input');
    input2.placeholder="Enter Round";
    input2.name="round";
    input2.classList.add('form-control')
    document.body.appendChild(input2);
};

function handleSubmit(){
    raceYear=document.getElementsByName("year")[0].value;
    raceRound=document.getElementsByName("round")[0].value
    console.log(raceYear, raceRound);
    doAPICall(raceYear, raceRound);

};

function addSubmitButton(){
    button=document.createElement('button');
    button.innerText="Search";
    button.classList.add('btn', 'btn-primary');
    button.addEventListener('click',()=>handleSubmit());
    document.body.appendChild(button);

};

function creatTableHeaderEntry(label) {
    th = document.createElement("th");
    th.innerText = label;
    th.scope = 'col'
    tr.appendChild(th)
}


function createRacerTable(){
    table = document.createElement('table');
    table.classList.add("table", "table-striped");
    document.body.appendChild(table)

        thead=document.createElement("thead");
        table.appendChild(thead);

        tr=document.createElement("tr");
        thead.appendChild(tr);

        creatTableHeaderEntry("First Name");
        creatTableHeaderEntry("Last Name");
        creatTableHeaderEntry("Date of Birth");
        creatTableHeaderEntry("Position");
        creatTableHeaderEntry("Wins");
        creatTableHeaderEntry("nationality");
        creatTableHeaderEntry("Constuctor");

        tbody=document.createElement("tbody");
        table.appendChild(tbody)

};

async function doAPICall(raceYear, raceRound) {
    result = await axios.get(`http://ergast.com/api/f1/${raceYear}/${raceRound}/driverStandings.json`).catch((e)=>{console.error(e); alert('Please try again')}).finally(console.log("API Request is over"))
    console.log(result)
    console.log(result.data)

    result=result.data

    tbody = document.getElementsByTagName('tbody')[0];

    tr = document.createElement('tr')
    tbody.appendChild(tr);

        th= document.createElement("th");
        th.scope = "row";
        th.innerHTML = result.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName;
        tr.appendChild(th)

        td = document.createElement("td");
        td.innerText = result.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName;
        tr.appendChild(td)

        td = document.createElement("td");
        td.innerText = result.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.dateOfBirth;
        tr.appendChild(td)

        td = document.createElement("td");
        td.innerText = result.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].position;
        tr.appendChild(td)

        td = document.createElement("td");
        td.innerText = result.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].wins;
        tr.appendChild(td)

        td = document.createElement("td");
        td.innerText = result.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.nationality;
        tr.appendChild(td)

        td = document.createElement("td");
        td.innerText = result.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0].name
        tr.appendChild(td)

}
const API_KEY = "ffce1d3ec1ae4feaaa466b7c584acf8c";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_TEAMLIST = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;
const ENDPOINT_TEAMDETAILS = `${BASE_URL}teams/`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function getAllTeams() {
    if ("caches" in window) {
        caches.match(ENDPOINT_TEAMLIST).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Team Data: " + data);
                    showTeam(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_TEAMLIST)
        .then(data => {
            showTeam(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function getTeamDetails() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    if ("caches" in window) {
        caches.match(ENDPOINT_TEAMDETAILS + idParam).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Team Details: " + data);
                    showTeamDetails(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_TEAMDETAILS + idParam)
        .then(data => {
            showTeamDetails(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    let standings = "";
    let standingElement =  document.getElementById("homeStandings");

    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });

     standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}

function showTeam(data) {
    let teams = "";
    let teamElement =  document.getElementById("teamList");

    data.teams.forEach(function (team) {
        teams += `
                <tr>
                    <td><img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td><a href="./teamdetails.html?id=${team.id}">${team.name}</a></td>
                    <td>${team.founded}</td>
                    <td>${team.clubColors}</td>
                    <td>${team.venue}</td>
                </tr>
        `;
    });

     teamElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>Founded</th>
                            <th>Club Colors</th>
                            <th>Venue</th>
                        </tr>
                     </thead>
                    <tbody id="teams">
                        ${teams}
                    </tbody>
                </table>
                
                </div>
    `;
}

function showTeamDetails(data) {
    let squads = "";
    let teamDetailsElement =  document.getElementById("teamDetails");

    data.squad.forEach(function (squad) {
        squads += `
                <tr>
                    <td>${squad.name}</td>
                    <td>${squad.position}</td>
                    <td>${squad.nationality}</td>
                    <td>${squad.role}</td>
                </tr>
        `;
    });

     teamDetailsElement.innerHTML = `
                <div class="center-align">
                    <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" width="100px" alt="badge"/>
                    <h4 class="header center orange-text">${data.name}</h4>
                </div>

                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="centered responsive-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Founded</th>
                            <th>Club Colors</th>
                            <th>Venue</th>
                        </tr>
                    </thead>
                    <tbody id="details">
                        <tr>
                            <td>${data.name}</td>
                            <td>${data.founded}</td>
                            <td>${data.clubColors}</td>
                            <td>${data.venue}</td>
                        </tr>
                    </tbody>
                </table>
                                
                </div>

                <div class="center-align">
                    <h4 class="header center orange-text">Squad</h4>
                </div>

                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Nationality</th>
                            <th>Role</th>
                        </tr>
                     </thead>
                    <tbody id="squads">
                        ${squads}
                    </tbody>
                </table>
                
                </div>
    `;
}
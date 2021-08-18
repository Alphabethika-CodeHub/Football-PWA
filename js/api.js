    const base_url = "https://api.football-data.org/v2/";
    const id_league = 2021;
    const endpoint_latest = `${base_url}teams/18/matches?status=FINISHED&limit=1`
    const endpoint_upcoming = `${base_url}teams/64/matches?status=SCHEDULED&limit=1`
    const endpoint_upcoming_schedule = `${base_url}competitions/${id_league}/matches?status=SCHEDULED&limit=10`    
    const endpoint_standings = `${base_url}competitions/${id_league}/standings?standingType=TOTAL`
    const endpoint_team = `${base_url}teams/`    

    let fetchApi = url => {
        return fetch(url, {
            headers: {
                'X-Auth-Token': '3496fbb31b2f4827a0871f2ff328b716'
            }
        });
    }

    function status(response) {
        if (response.status !== 200) {
                console.log("Error : " + response.status);    
                return Promise.reject(new Error(response.statusText));
            } else {    
                return Promise.resolve(response);
        }
    }

    function json(response) {
        return response.json();
    }

    function error(error) {
        console.log("Error : " + error);
    }

    function getLatestMatch() {
        if ("caches" in window) {
            caches.match(endpoint_latest).then(function(response) {
            if (response) {
                    response.json().then(function(data) {
                        LatestMatch(data)
                    });
                }
            });
        }

        fetchApi(endpoint_latest)
        .then(status)
        .then(json)
        .then(function(data) {        
            LatestMatch(data)
        })

        .catch(error);
    }

    function getUpcomingtMatch() {
        if ("caches" in window) {
            caches.match(endpoint_upcoming).then(function(response) {
            if (response) {
                    response.json().then(function(data) {
                        UpcomingMatch(data)
                    });
                }
            });
        }

        fetchApi(endpoint_upcoming)
        .then(status)
        .then(json)
        .then(function(data) {        
            UpcomingMatch(data)
        })

        .catch(error);
    }

    function getStandings() {
        if ("caches" in window) {
            caches.match(endpoint_standings).then(function(response) {
            if (response) {
                    response.json().then(function(data) {
                        Standings_League(data)
                    });
                }
            });
        }

        fetchApi(endpoint_standings)
        .then(status)
        .then(json)
        .then(function(data) {        
            Standings_League(data)
        })

        .catch(error);
    }

    function getDetailTeamById() {
        return new Promise(function (resolve) {
            let urlParams = new URLSearchParams(window.location.search);
            let id_Param = urlParams.get("id");
            let Squad_Team_HTML = ''
            let Squad_Team_Table_HTML = ''


            if ("caches" in window) {
                caches.match(endpoint_team + id_Param).then(function (response) {
                    if (response) {
                        response.json().then(function (data) {
                            resultDetailTeamBreakdownJSON(data)
                            data.squad.forEach(function (squad, index) {
                                dataSquadJSON = squad;
                                Squad_Team_HTML += `
                                <tr>
                                    <td>${index + 1}. </td>
                                    <td>${squad.name}</td>
                                    <td >${squad.position}</td>
                                </tr>`
                            });
                            Squad_Team_Table_HTML += `<table><tbody> ${Squad_Team_HTML} </tbody></table>`
                            document.getElementById("squad").innerHTML = Squad_Team_Table_HTML;
                            resolve(data);
                        });
                    }
                });
            }
    
            fetchApi(endpoint_team + id_Param)
                .then(status)
                .then(json)
                .then(function (data) {
                    resultDetailTeamBreakdownJSON(data)
                    dataTeamJSON = data;
                    
                    data.squad.forEach(function (squad, index) {
                        dataSquadJSON = squad;
                        Squad_Team_HTML += `
                        <tr>
                            <td>${index + 1}. </td>
                            <td>${squad.name}</td>
                            <td>${squad.position}</td>
                        </tr>`
                    });
                    
                    Squad_Team_Table_HTML += `
                    <table>
                        <thead>
                            <tr>
                                <td class="center-align">No</td>
                                <td class="center-align">Name</td>
                                <td class="center-align">Position</td>
                            </tr>
                        </thead>
                        <tbody>${Squad_Team_HTML}</tbody>
                    </table>`
                    document.getElementById("squad").innerHTML = Squad_Team_Table_HTML;
                    resolve(data);
                })
                .catch(error);
        });
    }    

    function getSavedTeams() {
      getAll().then(function (teams) {
        console.log(teams);        
        let Saved_Teams_HTML = "";
        teams.forEach(function (team) {
          Saved_Teams_HTML += `
              <div class="row mt-3">
                <div class="col s12 m7">
                  <div class="card">
                    <div class="center-align">
                      <img class="mt-2" src="${team.crestUrl}" width="50%" alt="club_logo">
                      <hr>
                      </div>
                      <div class="card-content">
                        <h5 class="center-align">Last Updated</h5>
                        <p class="center-align">${convertDate(new Date(team.lastUpdated))}</p>
                      </div>
                      <hr>
                      <div class="card-action">
                        <span class="card-title truncate">${team.name}</span>
                        <a href="./detail-team.html?id=${team.id}&saved=true">Read More <i class="fas fa-arrow-right"></i></a>
                        <p><strong>Website :</strong> ${team.website}</p>
                        <a class="btn-floating halfway-fab waves-effect waves-light red" id="deleted" onclick="deletedTeam(${team.id})"><i onclick="M.toast({html: 'Team Ini Berhasil Di Hapus.'})" class="fas fa-trash-alt"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
        });   
        if(teams.length == 0) Saved_Teams_HTML +=  `
            <div class="row">
                <div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text center-align mt-3">
                            <span class="card-title">You don't have a team favorite here yet</span>                             
                        </div>                            
                    </div>
                </div>
            </div>`
        document.getElementById("body-content").innerHTML = Saved_Teams_HTML;
      });
    }      
    
    function getSavedTeamById() {
      var urlParams = new URLSearchParams(window.location.search);
      var idParam = urlParams.get("id");
      getById(idParam).then(function (team) {
          Saved_TeamID_HTML = '';
            var Saved_TeamID_HTML = `
            <div class="card mt-3">
                <div class="card-content">
                    <div class="center-align">
                        <img src="${team.crestUrl}" width="50%" alt="club-logo">
                    </div>
                    <ul class="collection with-header">
                        <li class="collection-header center-align"><h4>${team.name}</h4></li>
                        <li class="collection-item center-align"><strong>Name :</strong> <span>${team.name}</span></li>
                        <li class="collection-item center-align"><strong>Short Name :</strong> <span>${team.shortName}</span></li>
                        <li class="collection-item center-align"><strong>TLA :</strong> <span>${team.tla}</span></li>
                        <li class="collection-item center-align"><strong>Address :</strong> <span>${team.address}</span></li>
                        <li class="collection-item center-align"><strong>Phone :</strong> <span>${team.phone}</span></li>
                        <li class="collection-item center-align"><strong>Website :</strong> <span>${team.website}</span></li>
                        <li class="collection-item center-align"><strong>Email :</strong> <span>${team.email}</span></li>
                        <li class="collection-item center-align"><strong>Founded :</strong> <span>${team.founded}</span></li>
                        <li class="collection-item center-align"><strong>Club Colors :</strong> <span>${team.clubColors}</span></li>
                        <li class="collection-item center-align"><strong>Venue :</strong> <span>${team.venue}</span></li>
                      </ul>
                </div>
            </div>
          `;            
          document.getElementById("body-content").innerHTML = Saved_TeamID_HTML;
      });
    }    
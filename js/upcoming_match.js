function UpcomingMatch(data) {
    let Upcoming_Match_HTML = "";
            data.matches.forEach(function(upcoming) {
                upcoming = JSON.parse(JSON.stringify(upcoming).replace(/http:/g, 'https:'));
                Upcoming_Match_HTML += `
                <div class="row ">
                    <div class="push-m3 col s12 m6">
                      <div class="card" style="background-color: #202731;">
                        <div class="card-content white-text">
                          <span class="card-title center-align">Upcoming Match</span>

                            <ul>
                                <li class="center-align"><p> <strong>${upcoming.homeTeam.name} VS ${upcoming.awayTeam.name}</strong> </p></li>
                                <li class="center-align mt-2">${upcoming.competition.name}</li>
                                <li class="center-align"><strong>${convertDate(new Date(upcoming.utcDate))}</strong></li>
                            </ul>

                        </div>                    
                      </div>
                    </div>
                </div>                
                `;
            });            
    document.getElementById("upcoming-match").innerHTML = Upcoming_Match_HTML;
}
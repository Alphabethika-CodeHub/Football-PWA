function LatestMatch(data) {
    let Latest_Match_HTML = "";
            data.matches.forEach(function(latest) {
                latest = JSON.parse(JSON.stringify(latest).replace(/http:/g, 'https:'));
                Latest_Match_HTML += `
                <div class="row ">
                    <div class="push-m3 col s12 m6">
                      <div class="card" style="background-color: #202731;">
                        <div class="card-content white-text">
                          <span class="card-title center-align">Latest Match</span>

                            <ul>
                                <li class="center-align"><h4> ${latest.score.fullTime.homeTeam} : ${latest.score.fullTime.awayTeam} </h4></li>
                                <li class="center-align mt-1"><p> <strong>${latest.homeTeam.name}</strong> VS <strong>${latest.awayTeam.name}</strong> </p></li>
                                <li class="center-align mt-2">${latest.competition.name}</li>
                                <li class="center-align"><strong>${convertDate(new Date(latest.utcDate))}</strong></li>
                            </ul>

                        </div>                    
                      </div>
                    </div>
                </div>                
                `;
            });            
  document.getElementById("latest-match").innerHTML = Latest_Match_HTML;
}
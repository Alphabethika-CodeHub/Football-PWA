function Standings_League(data) {
    let Standings_League_HTML = ''
            data.standings.forEach(function(standings) {
                standings.table.forEach(function (standings) {
                    standings = JSON.parse(JSON.stringify(standings).replace(/http:/g, 'https:'));
                    Standings_League_HTML += `                
                        <div class="card">
                            <div class="card-content">
                                <h5 class="center-align">${convertDate(new Date(data.competition.lastUpdated))}</h5>
                                <div class="row">
                                    <div class="push-m2 col m8 s12">
                                        <div class="collection">
                                            <a href="./detail-team.html?id=${standings.team.id}" class="center-align collection-item"><img class="" width="50%" src="${standings.team.crestUrl}" alt="league_logo"></a>
                                            <a class="center-align collection-item"><h5>${standings.team.name}</h5></a>
                                            <a class="center-align collection-item">Position : ${standings.position}</a>
                                            <a href="./detail-team.html?id=${standings.team.id}" class="center-align collection-item">Team : ${standings.team.name}</a>
                                            <a class="center-align collection-item">Played Games : ${standings.playedGames}</a>
                                            <a class="center-align collection-item">Won : ${standings.won}</a>
                                            <a class="center-align collection-item">Draw : ${standings.draw}</a>
                                            <a class="center-align collection-item">Lost : ${standings.lost}</a>
                                            <a class="center-align collection-item">Goals For : ${standings.goalsFor}</a>
                                            <a class="center-align collection-item">Goals Against : ${standings.goalsAgainst}</a>
                                            <a class="center-align collection-item">Goals Difference : ${standings.goalDifference}</a>
                                            <a class="center-align collection-item">Points : ${standings.points}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                })
            });            
    document.getElementById("standings-tables").innerHTML = Standings_League_HTML;
}
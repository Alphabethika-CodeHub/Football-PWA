function resultDetailTeamBreakdownJSON(data) {
    data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));    
    document.getElementById("club-name").innerHTML = data.name;
    document.getElementById("club-logo").src = data.crestUrl;
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("shortName").innerHTML = data.shortName;
    document.getElementById("tla").innerHTML = data.tla;
    document.getElementById("address").innerHTML = data.address;
    document.getElementById("phone").innerHTML = data.phone;
    document.getElementById("website").innerHTML = data.website;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("founded").innerHTML = data.founded;
    document.getElementById("club-colors").innerHTML = data.clubColors;
    document.getElementById("venue").innerHTML = data.venue;
}
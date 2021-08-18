function formatAMPM(date) {
    let Jam = date.getHours();
    let Menit = date.getMinutes();
    let AMPM = Jam >= 12 ? 'pm' : 'am';
    Jam = Jam % 12;
    Jam = Jam ? Jam : 12;
    Menit = Menit < 10 ? '0' + Menit : Menit;
    let strTime = Jam + ':' + Menit + ' ' + AMPM;
    return strTime;
}

let convertDate = date => {
    const namaBulan = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return `${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()} ${formatAMPM(date)}`
}
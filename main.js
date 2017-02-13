
// Every second realtime is a minute gametime

// Use jcmp.events.Call('GetTime')[0] to get a table of the current time (eg. timetable.hour)
// Use jcmp.events.Call('ChangeTime', minute, hour, timestep) to change time for everyone

let minute = 0; // Default start minute
let hour = 3; // Default start hour
let timestep = 1; // Default timestep (how fast time goes)

setInterval(function(){
    UpdateTime();
}, 1000)


function UpdateTime() // Increment our server time
{
    minute += timestep;
    if (minute >= 60)
    {
        hour += 1;
        minute = 0;
    }

    if (hour >= 24)
    {
        hour = 0;
    }
}

jcmp.events.Add('PlayerVerified', player => {
    jcmp.events.CallRemote('SyncTime', player, minute, hour, timestep);
})

jcmp.events.Add('ChangeTime', (m, h, ts) => {
    minute = m || minute;
    hour = h || hour;
    timestep = ts || timestep;
    jcmp.events.CallRemote('SyncTime', null, minute, hour, timestep);
})

jcmp.events.Add('GetTime', () => {
    return {hour: hour, minute: minute, timestep: timestep};
})
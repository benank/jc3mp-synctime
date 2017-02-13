const ui = new WebUIWindow('synctime', 'package://synctime/ui/index.html', new Vector2(1,1));

let m = 0;
let h = 0;
let ts = 0;

function UpdateTime() // Increment our server time
{
    m += ts;
    if (m >= 60)
    {
        h += 1;
        m = 0;
    }

    if (h >= 24)
    {
        h = 0;
    }

    jcmp.world.SetTime(h, m);

}

jcmp.ui.AddEvent('ClientTimeUpdate', () => {
    UpdateTime();
})

jcmp.events.AddRemoteCallable('SyncTime', (minute, hour, timestep) => {
    m = minute;
    h = hour;
    ts = timestep;
    jcmp.world.SetTime(h, m);
})
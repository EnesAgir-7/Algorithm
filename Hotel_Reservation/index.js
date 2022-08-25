import readline from 'readline';
//const readline = require('readline');

var days= 365;
let roomNumbers = 2;
let rooms = Array(roomNumbers).fill().map(() => Array(days).fill(0));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

while(true)
{
    const checkIn = await new Promise (function(resolve,){
        rl.question('which date of the year do you want to check-in (0-365): ', resolve);
    });
    const checkOut = await new Promise (function(resolve,){
        rl.question('which date of the year do you want to check-out (0-365): ', resolve);
    });
    
    if (checkIn < 0 || checkIn > 365 || checkOut < 0 || checkOut > 365 || checkOut < checkIn)
    {
        console.log('Decline');
        continue;
    }

    var accept = 0;
    for(var room of rooms)
    {
        var requested = room.slice(checkIn, checkOut);
        var summary = requested.reduce((a, b) => a + b, 0);
        // if summary is equals to zero, it means no  reservarions 
        if (summary > 0)        
            continue;
        for(var k=checkIn; k<=checkOut; k++)
            room[k] = 1;
        
        accept = 1;
        break;
    }
    if (accept == 1)
        console.log('Accept');
    else
        console.log('Decline');
    console.log('--------------------------------\n');
}

rl.on('close', function () {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});
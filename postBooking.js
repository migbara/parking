// load dependences
var request = require('request');
let fs = require('fs');

// aux function to print the date in log
const myDate = () => {
  let d = new Date();
  let parts = d.toISOString().split('T');
  let day = parts[0];
  let hour = parts[1].split('.')[0];
  return `${day} ${hour}`;
};

// aux function to log
const cl = (msg) => {
  console.log(`[${myDate()}]`, msg);
}

// read params
const data = fs.readFileSync('./.env','utf-8');
const env = JSON.parse(data);
const token = env.token;
const zone = env.zone;
const plate = env.plate;
const url = env.url;
const userId = env.userId;
const officeId = env.officeId;
const vehicleId = env.vehicleId;
const dateTimeVehicle = env.dateTimeVehicle;
const turn = env.turn;

// date is 7 days after today
let date = new Date();
date.setDate(date.getDate() + 7);
date = date.toISOString().split('T')[0];

// building request data
var options = {
  'method': 'POST',
  'url': url,
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
  },
  body: JSON.stringify({
    "userId": userId,
    "officeId": officeId,
    "zoneId": zone,
    "vehicle": {
      "id": vehicleId,
      "objectType": "OM.Vehicle",
      "schemaVersion": 0.1,
      "createdBy": "OM.Api",
      "createdAtUtc": dateTimeVehicle,
      "modifiedBy": "OM.Api",
      "modifiedAtUtc": dateTimeVehicle,
      "type": "Car",
      "engine": "Fuel",
      "licensePlate": plate
    },
    "bookingType": "Day",
    "turn": turn,
    "date": date,
    "seatId": [],
    "isGroupReservation": false,
    "isCarSharing": false
  })
};

// launch request
request(options, function (error, response) {
  if (error) throw new Error(error);
  cl(response.statusCode);
  cl(response.body);
});

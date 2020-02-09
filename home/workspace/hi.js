// function driverdistance(){
// var distance = require('google-distance-matrix');
// distance.key('AIzaSyBipYD7v1_WyEZxkzuapeTpG3un9yTLu2Y');
// //AIzaSyBipYD7v1_WyEZxkzuapeTpG3un9yTLu2Y
// var origins = ['San Francisco CA' ];
// var destinations = ['New York NY', 'Montreal', 'Honolulu'];
//  var dist =""  ;
//  var time = "" ;
// distance.mode('driving');
// distance.units('imperial');
 
// distance.matrix(origins, destinations, function (err, distances) {
//     if (err) {
//         return console.log(err);
//     }
//     if(!distances) {
//         return console.log('no distances');
//     }
//     console.log(distances);
//     if (distances.status == 'OK') {
//         for (var i=0; i < origins.length; i++) {
//             for (var j = 0; j < destinations.length; j++) {
//                 var origin = distances.origin_addresses[i];
//                 var destination = distances.destination_addresses[j];
//                 if (distances.rows[0].elements[j].status == 'OK') {
//                     dist = distances.rows[i].elements[j].distance.value;
//                     time = distances.rows[i].elements[j].duration.text;
//                     console.log('Distance from ' + origin + ' to ' + destination + ' is ' + dist);
//                     console.log('time from ' + origin + ' to ' + destination + ' is ' + time);
//                 } else {
//                     console.log(destination + ' is not reachable by land from ' + origin);
//                 }
//             }
//         }
//     }
// });

// }
// driverdistance() ;

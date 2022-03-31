import {MeetingResource} from "./models/meetingResource";
import {ConferenceRoom, conferenceRoomData} from "./models/conferenceRoom";

function getBigRooms<T extends MeetingResource>(rooms: Array<T>, minSize: number): Array<T> {
    let bigRooms: Array<T> = [];

    rooms.forEach(room => {
        if (room.capacity > minSize) {
            bigRooms.push(room);
        }
    });

    return bigRooms;
}


let bigRooms: Array<ConferenceRoom> = getBigRooms<ConferenceRoom>(conferenceRoomData, 20);
console.log(bigRooms);

let getLargeRooms: <T extends MeetingResource>(rooms: Array<T>, minSize: number) => Array<T>
getLargeRooms = getBigRooms;

let largeRooms = getLargeRooms(conferenceRoomData, 30);

console.log(largeRooms);

function shortenArray<T>(data: Array<T>, amountToShorten: number): Array<T> {
    return data.splice(amountToShorten, data.length);
}

let shrinkArray: <U>(original: Array<U>, units: number) => Array<U>

shrinkArray = shortenArray;
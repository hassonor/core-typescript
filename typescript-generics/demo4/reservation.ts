import {MeetingResource} from "../demo2/models/meetingResource";
import {ConferenceRoom, conferenceRoomData} from "../demo2/models/conferenceRoom";

class Reservation<T extends MeetingResource> {
    reservationDate: Date;
    organizerName: string;
    resource: T;

    requestResource(requestResource: T, requester: string) {
        this.resource = requestResource;
        this.organizerName = requester;
        console.log(`${requester} requested a reservation for ${requestResource.name}`);
    }
}

let teamMeeting = new Reservation<ConferenceRoom>();
teamMeeting.requestResource(conferenceRoomData[0], 'Hasson');
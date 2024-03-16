import React, { useEffect, useState } from "react";
import MeetingRoom from "../../../templates/Rooms/MeetingRoom";
import MeetingRooms from "../../../templates/Rooms/MeetingRooms";
interface Room {
  Reserver_SID: any;
  availablity: number;
  capacity: number;
  equipment: string;
  id: number;
  maintinance_end: string;
  maintenance_start: string;
}

function getMaintenanceRooms() {
  const [meetingRooms, setMeetingRooms] = useState<Room[]>([]);

  return (
    <MeetingRooms data-name="meeting-rooms-add">
      <div className="pt-4 div" data-name="add-book-admin">
        <h1 className="py-2 text-2xl font-semibold">
          View maintenance meeting rooms
        </h1>
      </div>
      <div className="p-6" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <div className="flex">
          {meetingRooms.map((room) => (
            <MeetingRoom
              id={room.id}
              Reserver_SID={room.Reserver_SID}
              maintinance_end={room.maintinance_end}
              maintenance_start={room.maintenance_start}
              equipment={room.equipment}
              availablity={room.availablity}
              capacity={room.capacity}
            />
          ))}
        </div>
      </div>
    </MeetingRooms>
  );
}

export default getMaintenanceRooms;

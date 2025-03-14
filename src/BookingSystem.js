import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RoomBooking = () => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    let [bookRoom, setBookRoom] = useState('');

    // total no of rooms in hotel
    const totalRooms = 97; // Adjust as needed

    const toggleRoomSelection = (room) => {
        // will check if room is booked then it will remove from array.
        // if not booked then mark as booked
        setSelectedRooms((prev) =>
            prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
        );
    };

    const bookRooms = () => {
        if (!bookRoom) {
            alert("Please select at least one room you want to book!");
            return;
        }

        if (selectedRooms.length === 97) {
            alert("All the rooms have been booked.");
            return;
        }

        if ((selectedRooms.length + parseInt(bookRoom)) > 97) {
            alert(`${97 - selectedRooms.length} rooms is available.`);
            return;
        }

        if (parseInt(bookRoom) > 5) {
            alert("You can book up to 5 rooms at a time.");
            return;
        }
        // will calculate how much it will take to travel room to room and different floors
        calculateTime();
    };

    const resetSelection = () => {
        setSelectedRooms([]);
    };

    const randomSelection = () => {
        const randomCount = Math.floor(Math.random() * totalRooms) + 1;
        const newSelection = Array.from({length: randomCount}, (_, i) => i + 1);
        setSelectedRooms(newSelection);
    };

    const calculateTime = () => {
        // set default value 0 for total time travel to visit in rooms
        let timeTravel = 0;
        let quote = 0;
        let prevRemainder = -1;
        // loop to check which room in empty and on which floor
        for (let roomNo = 1; roomNo <= totalRooms; roomNo++) {
            // check is room already booked
            if (!selectedRooms.includes(roomNo)) {
                // if not booked check room is available on which floor
                let remainder = parseInt(roomNo / 10);
                // if room is available  then time will to take to visit per room is 1 minute
                if (remainder === 0 || remainder === quote) {
                    // if room is available on same floor then count + 1
                    timeTravel++;
                } else if (remainder !== quote) {
                    // if room is available on different floor then will take 2 minute to reach that floor
                    timeTravel += 2;
                }
                quote = remainder;
                prevRemainder = remainder;
                // how many room are going to book
                --bookRoom;
                // book room
                setSelectedRooms((prev) =>
                    prev.includes(roomNo) ? prev.filter((r) => r !== roomNo) : [...prev, roomNo]
                );
            }
            // add 2 minute if room is not available same room
            if (prevRemainder === -1 && roomNo > 10 && roomNo % 10 === 0) {
                timeTravel += 2;
            }
            // flag to check room is different floor or not
            if(roomNo % 10 === 0){
                prevRemainder = -1;
            }

            // break loop if asked room has been booked
            if (bookRoom === 0) {
                break;
            }
        }
        setBookRoom('');
        alert(`total travel time ${timeTravel}`);
    }

    return (
        <div className="container mt-4">
            <div className="d-flex gap-2 mb-3">
                <input type="number" className="form-control w-auto" placeholder="No of Rooms" onChange={(e) => {
                    setBookRoom(e.target.value)
                }} value={bookRoom}/>
                <button className="btn btn-primary" onClick={bookRooms}>Book</button>
                <button className="btn btn-secondary" onClick={resetSelection}>Reset</button>
                <button className="btn btn-warning" onClick={randomSelection}>Random</button>
            </div>
            <div className="d-flex">
                <div className="p-5 border m-2" style={{maxHeight: "56%", padding: "10%"}}></div>
                <div className="d-flex flex-wrap-reverse" style={{maxWidth: "500px"}}>
                    {Array.from({length: totalRooms}, (_, i) => i + 1).map((room) => {
                        return <>
                            <div
                                key={room}
                                className={`border m-1 ${selectedRooms.includes(room) ? "bg-success text-white" : ""} ${room > 97 ? 'invisible' : ""}`}
                                style={{width: "40px", height: "40px", textAlign: "center", cursor: "pointer"}}
                                onClick={() => toggleRoomSelection(room)}
                            >
                                {parseInt(room % 10) === 0  ?
                                    (parseInt(room / 10)) * 100 + 10 :
                                    (1+parseInt(room / 10)) * 100 + (parseInt(room % 10))
                                }
                            </div>
                        </>
                    })}
                </div>
            </div>
        </div>
    );
};

export default RoomBooking;
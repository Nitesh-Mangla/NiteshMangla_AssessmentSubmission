import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RoomBooking = () => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    let [bookRoom, setBookRoom] = useState('');
    let roomNumber = 101;

    const totalRooms = 97; // Adjust as needed

    const toggleRoomSelection = (room) => {
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
        let timeTravel = 0;
        let quote = 0;
        let prevRemainder = -1;
        for (let roomNo = 1; roomNo <= totalRooms; roomNo++) {
            if (!selectedRooms.includes(roomNo)) {
                let remainder = parseInt(roomNo / 10);
                if (remainder === 0 || remainder === quote) {
                    timeTravel++;
                } else if (remainder !== quote) {
                    timeTravel += 2;
                }
                quote = remainder;
                prevRemainder = remainder;
                --bookRoom;
                setSelectedRooms((prev) =>
                    prev.includes(roomNo) ? prev.filter((r) => r !== roomNo) : [...prev, roomNo]
                );
            }
            if (prevRemainder === -1 && roomNo > 10 && roomNo % 10 === 0) {
                timeTravel += 2;
            }
            if(roomNo % 10 === 0){
                prevRemainder = -1;
            }

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
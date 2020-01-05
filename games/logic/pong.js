//Logic for the game pong

//Logic Module
const logic = {};

//Maps
logic.maps = [
    {
        name: "Classic",
        players: 2,
        entities: {
            walls: [
                {
                    position: {
                        x1: 0,
                        y1: 0,
                        x2: 600,
                        y2: 0,
                    }
                },
                {
                    position: {
                        x1: 0,
                        y1: 400,
                        x2: 600,
                        y2: 400,
                    }
                }
            ]
        }
    }
];
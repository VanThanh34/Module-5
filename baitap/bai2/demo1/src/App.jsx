import './App.css'
import {cities} from "./service/city.js";
import React from "react";

function App() {
    return React.createElement("ul",
        null,
        cities.map((city) => React.createElement("li",
                {key: city.id, style:{color: "red"}},
                city.name
            )
        )
    );
}

export default App

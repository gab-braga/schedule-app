import { useEffect, useState } from "react";
import "./style.css";

function formatDayOfWeek(date) {
    const options = { weekday: "long" };
    const dateString = date.toLocaleDateString('pt-BR', options);
    const dayString = dateString.slice(0, 3).toUpperCase();
    const dayNumber = date.getDate();
    return `${dayString} / ${dayNumber}`;
}

export default ({ day }) => {
    const [isToday, setIsToday] = useState(false);

    useEffect(() => {
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];
        const formattedDate = day.toISOString().split('T')[0];
        setIsToday(formattedToday === formattedDate);
    }, [day]);

    return (
        <div className={isToday ? "day today" : "day"}>
            <span className="title">
                {formatDayOfWeek(day)}
            </span>
            <div className="items">
                <div className="task">
                    <div className="hours">
                        07:00 - 08:00
                    </div>
                    <span className="description">Seção de Academia</span>
                </div>
                <div className="task">
                    <div className="hours">
                        12:00 - 13:00
                    </div>
                    <span className="description">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                </div>
                <div className="task">
                    <div className="hours">
                        12:00 - 13:00
                    </div>
                    <span className="description">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                </div>
                <div className="task">
                    <div className="hours">
                        12:00 - 13:00
                    </div>
                    <span className="description">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                </div>
                <div className="task">
                    <div className="hours">
                        12:00 - 13:00
                    </div>
                    <span className="description">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                </div>
            </div>
        </div>
    );
}
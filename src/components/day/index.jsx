import "./style.css";

function formatDayOfWeek(date) {
    const options = { weekday: "long" };
    const dateString = date.toLocaleDateString('pt-BR', options);
    const dayString = dateString.slice(0, 3).toUpperCase();
    const dayNumber = date.getDate();
    return `${dayString} / ${dayNumber}`;
}

export default ({ day }) => {
    return (
        <div className="day">
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
            <button className="btn-new">
                Novo &#43;
            </button>
        </div>
    );
}
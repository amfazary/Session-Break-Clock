

const Length = ({ title, changeTime, type, time, formateTime}) => {


    return (
        <div>
            <h4>{ title }</h4>
            <div className="time-sets">
                <button 
                    className="btn-small teal darken-4" 
                    onClick={() => changeTime(-60, type)}
                    id={type + "-decrement"}
                >
                    <i 
                        className="material-icons"
                    >
                        arrow_downward
                    </i>
                </button>
                <h5 id={type + "-length"}>{formateTime(time)}</h5>
                <button 
                    className="btn-small teal darken-4" 
                    onClick={() => changeTime(60, type)}
                    id={type + "-increment"}
                >
                    <i 
                        className="material-icons"
                    >
                        arrow_upward
                    </i>
                </button>
            </div>
        </div>
    );
}
 
export default Length;
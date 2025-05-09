import { useSelector } from "react-redux";
import { selectClientsSender } from "../../redux/client/clientSelectors";


const Dash = () => {
    const clientSender = useSelector(selectClientsSender);

    return (
        <div>
            Bienvenu {clientSender?.username}

           <p> Enao izao no admin ato dia ataovy milay</p>
        </div>
    );
}

export default Dash;

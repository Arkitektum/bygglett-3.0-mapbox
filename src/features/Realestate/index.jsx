import locations from 'data/location.json'
import { useParams } from "react-router-dom";





function Realestate () {

    const {location} = useParams();
return(
    <div>
        <h3>Om eiendommen</h3>
        <p>
           Total kvadratmeter for tomt: <strong>{locations[location].realestatetotal}  </strong> <br />     
           Utnyttelsesgraden er <strong> %</strong><br />
           Eksisternde bebygd areal er:<strong>  BYA</strong><br />
           Du kan bygge totalt <strong> BYA</strong>
        </p>
        </div>
    );
}
export default Realestate
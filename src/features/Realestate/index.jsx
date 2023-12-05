import userstory from 'data/location.json'

const location = [userstory.features[0].properties.locationlat,  userstory.features[0].properties.locationlong];   



function Realestate () {
return(
    <div>
        <h3>Om eiendommen</h3>
        <p>
           Total kvadratmeter for tomt: <strong>{userstory.features[0].properties.realestatetotal}  </strong> <br />     
           Utnyttelsesgraden er <strong>{userstory.features[0].properties.possible} %</strong><br />
           Eksisternde bebygd areal er:<strong> {userstory.features[0].properties.occupied} BYA</strong><br />
           Du kan bygge totalt <strong>{(userstory.features[0].properties.realestatetotal * userstory.features[0].properties.possible) - userstory.features[0].properties.occupied} BYA</strong>
        </p>
        </div>
    );
}
export default Realestate
import styles from './FeaturePopup.module.scss';

export default function GeolettPopup({ contextType: { title, location, description, possibleActions, links } }) {
   return (
      <div className={styles.popup}>
         <h3>{title}</h3>
         <div className={styles.location}>{location}</div>
         <div className={styles.description}>{description}</div>
         <ul className={styles.posibleActions}>
            {
               possibleActions.map(action => (
                  <li key={action}>{action}</li>
               ))
            }
         </ul>
         {
            links ?
               <ul className={styles.links}>
                  {
                     links.map(link => (
                        <li key={link.url}>
                           <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                        </li>
                     ))
                  }
               </ul> :
               null
         }
      </div>
   );
}

// const description = '<strong>' + e.features[0].properties.utvalgtNaturtypeTekst + '</strong>' +
// '<p>' + e.features[0].properties.områdenavn + '</p>' +
// '<p>Eiketrær kan bli flere hundre år gamle og et stort mangfold av arter lever i hulrom, dype barkesprekker og på døde grener i slike trær. Så mange som 1500 arter kan leve på og i hule eiker. Hul eik er en utvalgt naturtype som skal tas hensyn til og vurderes i byggesøknaden.</p>' +
// '<p>Tiltaket kan plasseres 15m eller lengre fra stammen. <br /> Dersom tiltaket må plasseres nærmere enn 15m fra stammen, skal kommunen vurdere tiltaket i henhold til bestemmelsene i naturmangfoldloven. Rotsystemet på treet må ikke skades. En arborist kan vurdere det for deg. Gi en begrunnelse for behovet og legg ved en eventuell uttalelse fra arborist.</p>' +
// '<ul><li>Opphav: ' + e.features[0].properties.opphav + '</li>' +
// '<li>Navnerom: <a href=" ' + e.features[0].properties.identifikasjon_navnerom + ' ">Navnerom </a></li>' +
// '<li>Nøyaktighetsklasse:  ' + e.features[0].properties.nøyaktighetsklasse + '</li>' +
// '<li>Faktark<a href=" ' + e.features[0].properties.faktaark + ' ">Faktaark fra miljødirektoratet </a></li></ul>';

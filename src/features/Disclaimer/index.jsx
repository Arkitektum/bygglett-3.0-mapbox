import React from 'react'
import { Header, ContentBox, Container, Paper } from 'dibk-design';
import style from './Disclaimer.module.scss';



function disclaimer() {
return (
    <Container>
        <a className={style.home} href="/"> 
        <svg  width="72" height="64" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0M571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93"/>
        </svg>       
        Til forsiden</a>
         <Header>
            <React.Fragment key=".0">
               Disclaimer
            </React.Fragment>
         </Header>
         <Paper>
         <Header size={3}>Ansvarsfraskrivelse for programvaredemonstrasjon</Header>

<p>DIBK leverer denne programvaren kun for demonstrasjonsformål. Ved å bruke eller få tilgang til programvaren godtar du å være bundet av vilkårene og betingelsene som er beskrevet i denne ansvarsfraskrivelsen. Denne programvaren er ikke ment for bruk som dokumentasjon for byggesøknader.</p>

<Header size={5}> Hensikt</Header>
Denne programvaren er utformet utelukkende for demonstrasjons- og pedagogiske formål. Den er ikke ment å tjene som dokumentasjon for byggeapplikasjoner, og brukere bør ikke stole på den for slike formål.

<Header size={5}>Begrenset funksjonalitet</Header>
Funksjonene og funksjonene til denne programvaren under demonstrasjonen kan være begrenset og representerer ikke de fullstendige egenskapene til sluttproduktet. Den er ikke egnet for konstruksjonsdokumentasjon eller noen kritiske applikasjoner.

<Header size={5}>Ingen garanti</Header>
Denne programvaren leveres "som den er" og uten noen form for garanti, enten det er uttrykkelig eller underforstått. DIBK gir ingen representasjoner eller garantier angående nøyaktigheten, fullstendigheten eller påliteligheten til programvaren for konstruksjonsdokumentasjon.

<Header size={5}>Brukeransvar</Header>
Brukere er eneansvarlig for å verifisere all informasjon innhentet fra programvaren og for å søke profesjonell rådgivning skreddersydd for deres spesifikke behov. Denne programvaren erstatter ikke profesjonell vurdering i byggedokumentasjon.

<Header size={5}>Ikke for operativ bruk</Header>
Denne programvaren skal ikke under noen omstendigheter brukes til drifts- eller produksjonsformål relatert til byggeapplikasjoner. Det er ikke en erstatning for industristandard dokumentasjonspraksis og verktøy.

<Header size={5}>Ansvarsbegrensning</Header>
DIBK skal ikke holdes ansvarlig for noen direkte, indirekte, tilfeldige, spesielle eller følgeskader som oppstår som følge av bruk eller manglende evne til å bruke denne programvaren, selv om det er gjort oppmerksom på muligheten for slike skader.

<Header size={5}>Aksept av vilkår</Header>
Ved å bruke denne programvaren, erkjenner du at du har lest, forstått og godtatt vilkårene og betingelsene som er beskrevet i denne ansvarsfraskrivelsen. Hvis du ikke er enig i disse vilkårene, vennligst avstå fra å bruke programvaren.

<Header size={5}>Endringer</Header>
DIBK forbeholder seg retten til å endre eller oppdatere denne ansvarsfraskrivelsen når som helst uten varsel. Brukere oppfordres til å gjennomgå denne ansvarsfraskrivelsen regelmessig for eventuelle endringer.

Ved å bruke denne programvaren godtar du og godtar å overholde vilkårene og betingelsene i denne ansvarsfraskrivelsen. Hvis du har spørsmål eller bekymringer, vennligst kontakt DIBK for avklaring.
         </Paper>  
         <ContentBox
            color="lightCyan"
            title="Kilder"
         >
            <React.Fragment key=".0">
               <ul>
                <li>Geonorge - www.geonorge.no </li>
                <li>Open street map - www.openstreetmap.org</li>
               </ul>
               <p>Løsningen er utviklet av Arkitektum AS - <a href="http://www.arkitektum.no">Arkitektum AS</a></p>
            </React.Fragment>
         </ContentBox>       
    </Container>
)
}
export default disclaimer
import React from 'react'
import { Header, ContentBox, Container, Accordion, Paper } from 'dibk-design';
import tree from '../../assets/gfx/oak-tree.svg';
import { Link } from 'react-router-dom';

function Home() {
   return (
      <Container>
         <Header big>
            <React.Fragment key=".0">
               Hva kan jeg bygge?
            </React.Fragment>
         </Header>
         <Paper>
            <p>Det finnes i alt 15 sektormyndigheter som kan ha uttalelser i en byggesak. Miljødirektoratet er en av dem. Ofte vet
               ikke søkerne om disse forholdene på forhånd og det er utfordrende for dem å forstå hva de betyr for søknaden. De dukker
               gjerne opp sent i prosessen, etter at søkeren har investert mye i prosjektet, både emosjonelt, i tid brukt til planlegging og
               kanskje også kostnader, for eksempel til arkitekthjelp.
               Denne demonstratoren har til hensikt å vise hvordan tilgjengeliggjøring av temadata kan forenkle byggesøknadsprosessen
               for alle involverte parter. Den viser et tenkt framtidig scenario, med fokus på søkerens opplevelse av prosessen.</p>
         </Paper>
         <ContentBox
            color="lightCyan"
            title="Brukerhistorier"
         >
            <React.Fragment key=".0">
               I samarbeid med flere etater har vi utarbeidet ulike brukerhistorier for å illustrere hvordan bruk av kartløsninger, datasett fra offentlige registre og veiledningstekster kan hjelpe innbyggere til å se muligheter og eventuelle begrensninger på sine eiendommer. Dette er en demonstrator som ikke kan benyttes som kilde til en eventuell byggesøknad.
            </React.Fragment>
         </ContentBox>

                <Accordion  color="lightCyan"
                    onToggleExpand={function noRefCheck(){}}
                    title="Hul Eik"
                    >
                    <React.Fragment key=".0">
                        <img src={tree} />
                        <p>Synnøve ( 65) tannlege</p>
                        <p>Hun tok over barndomshjemmet på Ullevål for noen år siden. Vedlikehold av huset og stell av den store hagen ble for mye for foreldrene hennes.</p>
                        <p>Synnøves datter har nå stiftet familie, og sammen planlegger de å bygge en ny bolig på den store tomta.</p>
                        <p>Synnøve har ikke behov for så mye plass og vil bo i den nye enheten, mens datteren og familien hennes vil ta over det gamle huset.</p>
                        <p>Vil det være plass til å bygge et lite hus på tomta?</p>
                       <a href="/kart/oslo/garasje">Sjekk kartet og utforsk mulighetene!</a>  
                       <Link to="/kart/oslo/garasje">Sjekk kartet og utforsk mulighetene! 𓀬</Link>
                    </React.Fragment>
                    </Accordion>
                    <Accordion color="lightCyan"
                    onToggleExpand={function noRefCheck(){}}
                    title="Stormflo"
                    >
                    <React.Fragment key=".2">
                    <p>Gudrun og Arne vil bygge hytte</p>
                    <p>Eiendommen de vil bygge på kan være berørt av flere ulike typer farer.</p>
                       <a href="/kart"> Se hytta i kartet her</a>  
                    </React.Fragment>
                    </Accordion>
                    
                    <Accordion color="lightCyan"
                    onToggleExpand={function noRefCheck(){}}
                    title="Slåttemark"
                    >
                    <React.Fragment key=".1">
                        
                       <a href="/kart"> TBA </a>  
                    </React.Fragment>
                    </Accordion>   
                    <Accordion color="lightCyan"
                    onToggleExpand={function noRefCheck(){}}
                    title="Innkjørsel - fri sikt og sikkerhetssoner"
                    >
                    <React.Fragment key=".1">
                        
                       <a href="/kart"> TBA </a>  
                    </React.Fragment>
                    </Accordion>                    
          
    </Container>
);
}   
export default Home;
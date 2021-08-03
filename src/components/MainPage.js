import ChildrenField from './ChildrenField';
import { useState } from 'react';

const axios = require('axios').default;

async function myFunc(application) {
  axios.post("http://51.107.208.107/submit_application", application).then(response => console.log(response));
}

async function getChildren(id) {
  const children = [];
  const rawData = await axios.get("http://51.107.208.107/get_children/"+id).then(response => console.log(response.data[0].navn.forkortetNavn));
  return rawData;
  
}

const application = {
  "saksnummer": null,
  "status": null,
  "status_historikk": [],
  "navn": {
      "etternavn": "",
      "forkortetNavn": "",
      "fornavn": "",
      "mellomnavn": "",
      "originaltNavn": null
  },
  "identifikasjonsnummer": {
      "foedselsEllerDNummer": "",
      "identifikatortype": "foedselsnummer"
  },
  "sivilstand": {
      "gyldighetstidspunkt": null,
      "sivilstand": null,
      "sivilstandsdato": null,
      "har_samboer": null,
      "samboer_fra_dato": null,
      "relatert_person": null
  },
  "bostedsadresse": {
      "adresseIdentifikatorFraMatrikkelen": null,
      "skolekrets": null,
      "ukjentBosted": null,
      "vegadresse": {
          "adressekode": null,
          "adressenavn": null,
          "adressenummer": {
              "husbokstav": null,
              "husnummer": null
          },
          "adressetilleggsnavn": null,
          "bruksenhetsnummer": null,
          "bruksenhetstype": null,
          "coAdressenavn": null,
          "kommunenummer": null,
          "poststed": {

          }
      }
  },
  "preferertKontaktadresse": {
      "kontaktadresseIFrittFormat": {
          "adresselinje": [

          ],
          "landkode": null
      },
      "valg": null
  },
  "foedsel": {

  },
  "postadresse": {
      "postadresseIFrittFormat": {
          "adresselinje": [

          ],
          "poststed": null
      },
      "postboksadresse": null,
      "vegadresse": null
  },
  "foreldreansvar": [
      {

      }
  ],
  "opplysninger_om_barn_barnehage": [
      {

      }
  ],
  "opplysninger_om_barn_SFO": [],
  "familierelasjon": [

  ],
  "samlet_inntekt": 0,
  "gratis_kjernetid": null,
  "maks_aarlig_bhg_kostnad": null,
  "flagg": {
      "varig_nedgang_samlet_inntekt": false,
      "mistet_jobb": false,
      "samlivsbrudd": false
  }
}



function MainPage() {
  const [prefill, setPrefill] = useState([]);
  const [saksnummer, setSaksnummer] = useState("");

  const f = async (id) => {
    axios.get("http://51.107.208.107/get_children/"+id).then(response => prefillChild(response.data));
    axios.get("http://51.107.208.107/get_applicant/"+id).then(response => prefillPerson(response.data));
  }
  const prefillPerson = async (data) => {
    if(data.navn.fornavn !== null){
      document.getElementById("fornavn").value = data.navn.fornavn;
      application.navn.fornavn = data.navn.fornavn;  
    }
    if(data.navn.mellomnavn !== null){
      document.getElementById("mellomnavn").value = data.navn.mellomnavn;
      application.navn.mellomnavn = data.navn.mellomnavn;  
    }
    if(data.navn.etternavn !== null){
      document.getElementById("etternavn").value = data.navn.etternavn;
      application.navn.etternavn = data.navn.etternavn;  
    }
    if(data.bostedsadresse.vegadresse.adressenavn !== null){
      document.getElementById("adresse").value = data.bostedsadresse.vegadresse.adressenavn;
      application.bostedsadresse.vegadresse.adressenavn = data.bostedsadresse.vegadresse.adressenavn;  
    }
    
  }

  const submitApp = async (application) => {
    axios.post("http://51.107.208.107/submit_application", application).then(response => setSaksnummer(...response.data.saksnummer));
  }

  const prefillChild = (dataList) => {
    if(dataList !== null){
      const childrenNames = [] 
      for (var i=0; i < dataList.length; i++){
        if(dataList[i] !== null){
          childrenNames.push(dataList[i].navn.forkortetNavn);
        }
      }
      setPrefill(childrenNames);
    }
  } 
  console.log(saksnummer);

  return (
    <div className="App">
      <p>Søknad</p>
      <form className="form">
        <label>
          Fornavn:
          <input id="fornavn" type="text"  onChange={(event) => application.navn.fornavn = event.target.value} />
        </label>
        <label>
          Mellomnavn:
          <input id="mellomnavn" type="text"  onChange={(event) => application.navn.mellomnavn = event.target.value} />
        </label>
        <label>
          Etternavn:
          <input id="etternavn" type="text"  onChange={(event) => application.navn.etternavn = event.target.value} />
        </label>
        <label>
          Fødselsnummer:
          <input type="text"  onChange={(event) => application.identifikasjonsnummer.foedselsEllerDNummer = event.target.value} />
        </label>
        <label>
          Adresse:
          <input id="adresse" type="text"  onChange={(event) => application.adressenavn = event.target.value} />
        </label>
      </form>
      <ChildrenField children={prefill}/>
      <button onClick={async () => { f(application.identifikasjonsnummer.foedselsEllerDNummer) }}>Prefill</button>
      <button onClick={() => console.log(application)}>Console</button>
      <button onClick={() => myFunc(application)}>Submit</button>
      <p>Saksnummer: {saksnummer}</p>
    </div>
  );
}

export default MainPage;
import ChildrenField from './ChildrenField';
import { useState } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

const axios = require('axios').default;

async function myFunc(application) {
  axios.post("http://51.107.208.107/submit_application", application).then(response => console.log(response));
}




function MainPage() {
    //const [state, setState] = useRecoilState(page);
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
          "foedselsEllerDNummer": "03839199405",
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
  const [ChildrenName, setChildrenName] = useState("");
  var placeholder = ChildrenName;
  var child = [<p key={1}>test</p>]


  return (
    <div className="App">
      <p>Søknad</p>
      <form>
        <label>
          Fornavn:
          <input type="text"  onChange={(event) => application.navn.fornavn = event.target.value} />
        </label>
        <label>
          Mellomnavn:
          <input type="text"  onChange={(event) => application.navn.mellomnavn = event.target.value} />
        </label>
        <label>
          Etternavn:
          <input type="text"  onChange={(event) => application.navn.etternavn = event.target.value} />
        </label>
        <label>
          Fødselsnummer:
          <input type="text"  onChange={(event) => application.identifikasjonsnummer.foedselsEllerDNummer = event.target.value} />
        </label>
        <label>
          Adresse:
          <input type="text"  onChange={(event) => application.adressenavn = event.target.value} />
        </label>
        {child}
        <label>
          navn barn:
          <input type="text" onChange={(event) => application.adressenavn = event.target.value} />
        </label>
        <button>Legg til barn</button>
      </form>
      <button onClick={() => console.log(application)}>Console</button>
      <button onClick={() => myFunc(application)}>Submit</button>
    </div>
  );
}

export default MainPage;
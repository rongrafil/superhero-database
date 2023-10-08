import styles from '../../page.module.css';
import UpdateHero from './UpdateHero';
import output from '/superhero-cdk/cdk-outputs.json' //endpoint and API key values exported by CDK deploy
const endpoint = output.SuperheroCdkStack.GraphQLAPIEndpoint;
const apiKey = output.SuperheroCdkStack.GraphQLAPIKey;

//calls API to retrieve specific hero
async function getHero(id) {
  const res = await fetch(endpoint, {
      cache: 'no-store', //refresh server on every get heroes request
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        query: `query getHero {
          getHero(id: "${id}") {
            id
            hero_name
            powers
            backstory
          }
        }`,
      }),
    });

  const data = await res.json();

  return data.data.getHero;
}

//display specific hero details
export default async function HeroPage({ params }) {
  const hero = await getHero(params.id);

  if (hero === null)
  {
    return {}
  }

  else {
    return (
      <div>
        <h1>{hero.hero_name}</h1>
        <div className={styles.hero}>
          <h3>{hero.hero_name}</h3>
          <h5>{hero.powers}</h5>
          <p>{hero.backstory}</p>
        </div>
        
        <UpdateHero id={hero.id}/>
      </div>
    );
  }
  
}
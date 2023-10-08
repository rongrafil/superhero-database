import Link from 'next/link';
import styles from './page.module.css';
import CreateHero from './CreateHero';
import SearchHero from './SearchHero';
import output from '/superhero-cdk/cdk-outputs.json' //endpoint and API key values exported by CDK deploy
const endpoint = output.SuperheroCdkStack.GraphQLAPIEndpoint;
const apiKey = output.SuperheroCdkStack.GraphQLAPIKey;

//retrieve the whole list of existing heroes and to display
async function getHeroes() {
  const res = await fetch(endpoint, {
      cache: 'no-store', //refresh server on every get heroes request
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        query: `query allHeroes {
          allHeroes(count: 50) {
            heroes {
              id
              hero_name
              powers
              backstory
            }
            nextToken
          }
        }`,
      }),
    });

  const data = await res.json();

  return data.data.allHeroes.heroes;
}

//home page which displays the whole list of heroes
export default async function HeroesPage() {
  const heroes = await getHeroes();

  return(
    <div>
      <h1>Superheroes!</h1>

      {/* component for hero name or powers search */}
      <SearchHero /> 
      
      <div className={styles.grid}>
        {heroes.map((hero) => {
          return <Hero key={hero.id} hero={hero} />;
        })}
      </div>

      {/* component for adding a hero */}
      <CreateHero />

    </div>
  );
}

//displays hero details
function Hero({ hero }) {
  const { id, hero_name, powers, backstory } = hero || {};

  return (
    // page redirects to heroes/id upon clicking on one of the hero details
    <Link href={`/heroes/${id}`}>
      <div className={styles.hero}>
        <h2>{hero_name}</h2>
        <h5>{powers}</h5>
        <p>{backstory}</p>
      </div>
    </Link>
  );
}
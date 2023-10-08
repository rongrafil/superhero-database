'use client'

import { useSearchParams } from 'next/navigation'
import styles from '../page.module.css';
import Link from 'next/link';
import output from '/superhero-cdk/cdk-outputs.json' //endpoint and API key values exported by CDK deploy
const endpoint = output.SuperheroCdkStack.GraphQLAPIEndpoint;
const apiKey = output.SuperheroCdkStack.GraphQLAPIKey;

//function to search for hero name or power
async function searchHeroes(query, filter) {
    let queryString = ""

    //assigns a query corresponding to hero name or power search
    if (filter === "hero_name")
        queryString = `query allHeroesByHeroName {
            allHeroesByHeroName(hero_name: "${query}" ) {    
              heroes {
                id
                hero_name
                powers
                backstory
              }
              nextToken
            }
          }`
    else
        queryString = `query allHeroesByPowers {
            allHeroesByPowers(powers: "${query}" ) {    
            heroes {
                id
                hero_name
                powers
                backstory
            }
            nextToken
            }
        }`

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        query: queryString
      }),
    });
 
    let data = await res.json();

    if (filter === "hero_name") 
        data = data.data.allHeroesByHeroName.heroes;
    else
        data = data.data.allHeroesByPowers.heroes;

    return data;
}

//display hero details after search
export default async function SearchHeroes() {
    const searchParams = useSearchParams()
    const query = searchParams.get("query")
    const filter = searchParams.get("filter")

    const heroes = await searchHeroes(query, filter);

    return(
        <div>
            <h1>List of Items</h1>
            <div className={styles.grid}>
                {heroes.map((hero) => (
                    // page redirects to heroes/id upon clicking on one of the hero details
                    <Link key={hero.id} href={`/heroes/${hero.id}`}>
                        <div className={styles.hero}>
                            <h2 key={hero.id}>{hero.hero_name}</h2>
                            <h5 key={hero.id}>{hero.powers}</h5>
                            <p key={hero.id}>{hero.backstory}</p>
                        </div>                  
                    </Link>
                ))}
            </div>
        </div>
    );
}


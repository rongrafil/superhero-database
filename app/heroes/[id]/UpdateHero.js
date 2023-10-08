'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../page.module.css';
import output from '/superhero-cdk/cdk-outputs.json' //endpoint and API key values exported by CDK deploy
const endpoint = output.SuperheroCdkStack.GraphQLAPIEndpoint;
const apiKey = output.SuperheroCdkStack.GraphQLAPIKey;

//function which calls API to update hero details
export default function UpdateHero(hero) {
  const [heroName, setHeroName] = useState('');
  const [powers, setPowers] = useState('');
  const [backstory, setBackstory] = useState('');

  const router = useRouter();

  const { id } = hero || {};

  const update = async() => {
  
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        query: `mutation updateHero {
          updateHero(
            id: "${id}"
            hero_name: "${heroName}"
            powers: "${powers}"
            backstory: "${backstory}"
          ) {
            hero_name
          }
        }`
      }),
    });

    setHeroName('');
    setPowers('');
    setBackstory('');
  }

  //function which calls API to delete hero
  const deleteHero = async() => {
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        query: `mutation deleteHero {
          deleteHero(id:"${id}") {
            id
            hero_name
            powers
            backstory
          }
        }`
      }),
    });

    //refresh new list after hero deletion and redirect to home page
    router.refresh()
    router.push(`/`);
  }

  return (
    <div>
      <form onSubmit={update}>
        <h3>Update Superhero!</h3>
        <input
          type="text"
          placeholder="Superhero Name!"
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
        />
        <textarea
          placeholder="Powers"
          value={powers}
          onChange={(e) => setPowers(e.target.value)}
        />
         <textarea
          placeholder="Backstory"
          value={backstory}
          onChange={(e) => setBackstory(e.target.value)}
        />
        <button type="submit">
          Update
        </button>
      </form>

      <button type="button" onClick={deleteHero} className={styles.delete}>
        Delete
      </button> 
    </div>
    
  );
}
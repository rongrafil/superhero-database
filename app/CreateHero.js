'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import output from '/superhero-cdk/cdk-outputs.json' //endpoint and API key values exported by CDK deploy
const endpoint = output.SuperheroCdkStack.GraphQLAPIEndpoint;
const apiKey = output.SuperheroCdkStack.GraphQLAPIKey;


export default function CreateHero(hero) {
  const [heroName, setHeroName] = useState('');
  const [powers, setPowers] = useState('');
  const [backstory, setBackstory] = useState('');

  const router = useRouter();

  //calls API to create hero
  const create = async() => {

    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        query: `mutation addHero {
          addHero(
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

    //refreshes component for displaying hero list after another hero is added
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={create}>
        <h3>Create a new superhero!</h3>
        <input
          type="text"
          placeholder="Superhero Name"
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
          Create
        </button>
      </form>
    </div>
    
  );
}
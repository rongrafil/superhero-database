'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';


//handles for searching hero names or powers
const SearchForm = () => {
  const router = useRouter();
  const [heroNameQuery, setHeroNameQuery] = useState('');
  const [powersQuery, setPowersQuery] = useState('');
  const [filter, setFilter] = useState('');

  //redirects to /heroes route when searching for a hero name and passes its value sa query param
  const handleHeroNameSubmit = (e) => {
    e.preventDefault();
    router.push(`/heroes?query=${heroNameQuery}&filter=${filter}`);
  };

  //redirects to /heroes route when searching for a power and passes its value sa query param
  const handlePowersSubmit = (e) => {
    e.preventDefault();
    console.log(filter)
    router.push(`/heroes?query=${powersQuery}&filter=${filter}`);
  };

  return (
      <div>
        <div className={styles.search}>
          <p>Search hero name</p>
        </div>
        <div className={styles.search}>
          <form onSubmit={handleHeroNameSubmit}>
            <input
              type="text"
              placeholder="Input hero name"
              value={heroNameQuery}
              onChange={(e) => 
                {
                  setHeroNameQuery(e.target.value); 
                  setFilter("hero_name"); 
                }
              }
            />
          </form>
        </div> 
        <div className={styles.search}>
          <p>Search powers</p>
        </div>
        <div className={styles.search}>
          <form onSubmit={handlePowersSubmit}>
            <input
              type="text"
              placeholder="Input powers"
              value={powersQuery}
              onChange={(e) => 
                {
                  setPowersQuery(e.target.value); 
                  setFilter("powers"); 
                }
              }
            />
          </form>
        </div> 
      </div>
  );
};

export default SearchForm;

import React, { useState } from 'react';
import axios from 'axios';

const HeroContext = React.createContext();

const HeroProvider = ({ children }) => {
  const [searchedHeros, setSearchedHeros] = useState([]);
  const [selectedHero, setSelectedHero] = useState({});

  const getData = async (e) => {
    if (!e) {
      return;
    }

    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${e}&limit=5&apikey=7cf5ee555c47a4c5e9ec988eb75a7861`;

    const res = await axios.get(url);

    if (res.status === 200) {
      setSearchedHeros(res.data.data.results);
    } else {
      alert('Something went wrong, try again!');
    }
  };

  const selectedHeroHandler = (hero) => {
    console.log(hero);
    setSelectedHero(hero);
  };

  return (
    <HeroContext.Provider
      value={{
        searchedHeros,
        getData,
        selectedHeroHandler,
        selectedHero,
      }}
    >
      {children}
    </HeroContext.Provider>
  );
};

export { HeroContext, HeroProvider };

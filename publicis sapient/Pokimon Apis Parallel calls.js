/**
 *
 *
 * Interview Date: 31st may 2025
 *
 * QS: Make a parallel call to the pokimon api and get the abilities of each pokimon asnd show it in a table.
 *
 */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  const [pokimonsData, setPokimonsData] = useState([]);

  useEffect(() => {
    (async () => {
      const pokimons = await fetch("https://pokeapi.co/api/v2/pokemon/");
      const pokimonsParsed = await pokimons?.json();

      const pokimonsAbilities = await Promise.all(
        pokimonsParsed?.results?.map((item) => {
          return (async () => {
            const abilitiesData = await fetch(item?.url);
            const parsedAbilities = await abilitiesData?.json();
            // console.log('parsedAbilities', parsedAbilities)
            return { name: item?.name, ability: parsedAbilities?.abilities };
          })();
        })
      );
      // console.log('pokimonsAbilities', pokimonsAbilities)

      const finalTableObj = await Promise.all(
        pokimonsAbilities?.map((item) => {
          return (async () => {
            const abilitiesMapped = await Promise.all(
              item?.ability?.map((abilityItem) => {
                return (async () => {
                  const abilityData = await fetch(abilityItem?.ability?.url);
                  const parsedAbility = await abilityData?.json();

                  const effects = parsedAbility?.effect_entries?.map(
                    (effect) => {
                      return effect.effect;
                    }
                  );

                  return {
                    abilityName: abilityItem?.ability?.name,
                    abilities: effects,
                  };
                })();
              })
            );
            return {
              name: item?.name,
              abilities: [...abilitiesMapped],
            };
          })();
        })
      );

      // console.log('finalTableObj', finalTableObj)

      setPokimonsData(finalTableObj);

      // await Promise.all()
    })();
  }, []);

  console.log("pokimonsData", pokimonsData);

  return (
    <>
      <table border="1">
        <thead style={{}}>
          <th>Name</th>
          <th>Ability Name</th>
          <th>Abilities</th>
        </thead>
        <tbody>
          {pokimonsData?.map((item) => {
            return (
              <tr>
                <td>{item?.name}</td>
                <td>
                  {item?.abilities
                    ?.map((ability) => {
                      return ability?.abilityName;
                    })
                    ?.join(", ")}
                </td>
                <td>
                  {item?.abilities
                    ?.map((ability) => {
                      return ability?.abilities;
                    })
                    ?.join(", ")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

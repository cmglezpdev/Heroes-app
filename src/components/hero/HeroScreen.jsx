import { useParams, Navigate } from "react-router-dom"
import getHeroesById from "../../selectors/getHerosById";

export const HeroScreen = () => {

  const { heroeId } = useParams();
  const hero = getHeroesById( heroeId );

  if( !hero )
    return <Navigate to='/' />


  return (
    <div>
      <h1>HeroScreen</h1>
      <p>
        {hero.superhero}
      </p>
    </div>
  )
}

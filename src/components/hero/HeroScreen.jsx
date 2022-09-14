import { useMemo } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom"
import getHeroesById from "../../selectors/getHerosById";

export const HeroScreen = () => {

  const navigate = useNavigate();
  const { heroeId } = useParams();
  const hero =  useMemo(() => getHeroesById( heroeId ), [heroeId]);

  if( !hero )
    return <Navigate to='/' />


  const imgPath = `/assets/${hero.id}.jpg`;
  const { superhero, alter_ego, publisher, first_appearance, characters } = hero;


  const handleReturn = () => {
    navigate(-1);
  }

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img src={imgPath} alt={superhero} className='img-thumbnail animate__animated animate__fadeInLeft' />
      </div>

      <div className="col-8 animate__animated animate__fadeIn">
        <h3>{ superhero }</h3>
        <ul className="list-group">
          <li className="list-group-item"><b>Alter ego: </b>{alter_ego}</li>
          <li className="list-group-item"><b>Publisher: </b>{publisher}</li>
          <li className="list-group-item"><b>First Appearance: </b>{first_appearance}</li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{ characters }</p>
      
        <button
          className="btn btn-outline-info"
          onClick={handleReturn}
        >
          Regresar
        </button>

      </div>

    </div>
  )
}

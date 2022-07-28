import { useNavigate, useLocation } from "react-router-dom";
import queryString from 'query-string'

import { useForm } from "../../Hooks/useForm";
import getHeroByName from "../../selectors/getHeroNyName";
import { HeroCard } from "../hero/HeroCard";
import { useMemo } from "react";


export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);

  const [values, handleInputChange] = useForm({
    searchText: q
  });

  const { searchText } = values;
  const heroesFiltered = useMemo( () => getHeroByName(q), [q]);


    const handleSubmit = ( event ) => {
      event.preventDefault();
      navigate(`?q=${searchText}`);
  
      
    }

  

    return (
      <>
        <h1>Search</h1>
        <hr />

        <div className="row">
          <div className="col-5">
            <h4>Buscar</h4>
            <hr />

            <form onSubmit={ handleSubmit }>
              <input 
                type="text" 
                name="searchText" 
                className="form-control"
                placeholder="Buscar un heroe"
                autoComplete="off"
                value={ searchText }
                onChange={handleInputChange}
              />

              <button
                type="submit"
                className="btn btn-outline-primary mt-1"
              >
                Buscar...
              </button>

            </form>
          </div>

          <div className="col-7">
            <h4>Resutados</h4>
            <hr />

            {
              (q === '') 
              ? <div className="alert alert-info">Buscar un heroe</div>
              : (heroesFiltered.length == 0)
                  && <div className="alert alert-danger">No hay resultados de: { q }</div>
            }

            {
              heroesFiltered.map(hero => (
                <HeroCard
                  key={hero.id}
                  { ...hero } 
                />
              ))
            }
          </div>

        </div>
      </>
    )
}

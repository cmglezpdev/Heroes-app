import { HeroCard } from './HeroCard';

import getHeroesByPublisher from '../../selectors/getHeroesByPublisher';
import { useMemo } from 'react';

export const HeroList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher] );

    return (
        <div className='row rows-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn'> 
            {
                heroes.map(heroe =>
                    <HeroCard
                        key={heroe.id}
                        { ...heroe }
                    />
                )
            }
        </div>
    )
}

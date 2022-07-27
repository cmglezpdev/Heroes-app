
import { heroes } from '../data/heroes';

const getHeroesById = ( id ) => {

    return heroes.find( hero => hero.id == id );

}


export default getHeroesById;
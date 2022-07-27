
import { heroes } from '../data/heroes';

const getHeroesByPublisher = ({ id }) => {
    return heroes.filter( hero => heroes.id == id )[0];

}
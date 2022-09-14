
import { heroes } from '../data/heroes';

const getHeroByName = ( name = '' ) => {

    let result = [];
    if( name === '' ) return result;

    heroes.forEach(hero => {
        const { superhero, publisher, alter_ego, first_appearance, characters } = hero;

        if( 
            contains(name, superhero) ||
            contains(name, publisher) ||
            contains(name, alter_ego) ||
            contains(name, first_appearance) || 
            contains(name, characters) 
         ) {
            result.push( hero );
         }
        
    });

    return result;
}


const contains = ( search, sentence ) => {

    const sear = search.toLowerCase();
    const sent = sentence.toLowerCase();
 
    return sent.includes(sear);
}







export default getHeroByName;
import getHeroesByPublisher from '../../selectors/getHeroesByPublisher';

export const HeroList = ({ publisher }) => {

    const heroes = getHeroesByPublisher(publisher);

    return (
        <>
            <h1>Heroe List</h1>

            <ul>
                {
                    heroes.map(heroe => (
                        <li
                            key={heroe.id}
                        >
                            { heroe.superhero }
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

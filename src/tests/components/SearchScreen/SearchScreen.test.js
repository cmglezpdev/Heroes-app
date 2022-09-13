/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';
import getHeroByName from '../../../selectors/getHeroNyName'

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Tests abput SearchScreen', () => { 

    test('should show it correctly with default values', () => {

        const { container } = render(
                <MemoryRouter initialEntries={['/search']}>
                    <SearchScreen />
                </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();
        screen.getByText('Buscar un heroe');
    });

    test('should show to Batman and the input with queryString Value', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input).toHaveProperty('value', 'batman');
    })

    test('should show a error if not exist a hero with the name', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=123432']}>
                <SearchScreen />
            </MemoryRouter>
        );
        
        screen.getByText('No hay resultados de: 123432');
    })

    test('should show the same images that heroes in the search result', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=man']}>
                <SearchScreen />
            </MemoryRouter>
        );
      
        const heroes = getHeroByName('man');
        const imgs = screen.getAllByRole('img');
        
        expect(heroes.length).toBe(imgs.length);
        
        const comp1 = heroes.map(hero => hero.superhero);
        const comp2 = imgs.map(img => img.getAttribute('alt'));
        comp1.sort();
        comp2.sort();

        expect(comp1).toEqual(comp2);
    });

    test('should called the navigate for to change the url', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        );
    
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { 
            target: {
                name: 'searchText', 
                value: 'superman' 
            } 
        })
        
        const form = screen.getByRole('textbox').parentElement;
        fireEvent.submit(form);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('?q=superman');
    });

 })
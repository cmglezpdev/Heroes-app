import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HeroScreen } from '../../../../components/hero/HeroScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))


describe('Tests about HeroScreen', () => {

    test('should not show it if the url have not a hero', () => {
       
        render(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path='/hero' element={<HeroScreen />}/>
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        screen.getByText('No Hero Page');
    });

    test('should show a hero if the url have the parameter', () => {
       
        render(
            <MemoryRouter initialEntries={['/hero/marvel-hulk']}>
                <Routes>
                    <Route path='/hero/:heroeId' element={<HeroScreen />}/>
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        
        screen.getByRole('img');
        screen.getByText('Hulk');
    });

    test('should navigate a page to back', () => {
        render(
            <MemoryRouter initialEntries={['/hero/marvel-hulk']}>
                <Routes>
                    <Route path='/hero/:heroeId' element={<HeroScreen />}/>
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect( mockNavigate ).toHaveBeenCalledTimes(1);
        expect( mockNavigate ).toHaveBeenCalledWith(-1);
    })

})
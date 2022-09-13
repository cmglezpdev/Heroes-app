import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Tests about LoginScreen', () => {

    test('should show it correctly', () => {

        const contextValue = {
            user: {
                name: 'Carlos Manuel',
                logged: true
            },
            dispatch: () => {}
        }

        const{ container } = render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <LoginScreen />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( container ).toMatchSnapshot();
    })

    test('should call the dispatch and to do navigation', () => {
        const contextValue = {
            user: {
                name: 'Carlos Manuel',
                logged: true
            },
            dispatch: mockDispatch
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <LoginScreen />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        const action = {
            type: types.login,
            payload: {name: 'Carlos Manuel'}
        };

        expect( mockDispatch ).toHaveBeenCalledTimes(1);
        expect( mockDispatch ).toHaveBeenCalledWith(action);
    
        const lastPath = localStorage.getItem("lastPath") || "/";
        expect( mockNavigate ).toHaveBeenCalledTimes(1);
        expect( mockNavigate ).toHaveBeenCalledWith(lastPath, { replace: true }) 
    })

})
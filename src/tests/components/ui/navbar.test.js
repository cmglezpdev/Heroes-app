/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext"
import { Navbar } from "../../../components/ui/NavBar"
import { types } from "../../../types/types";

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('tests about navbar', () => { 
    
    const contextValue = {
        user: {
            name: 'Carlos Manuel',
            logged: true
        },
        dispatch: mockDispatch
    }

    let container; 

    beforeEach(() => {
        container = render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )
    })


    test('should show it correctly', () => {
        expect( container ).toMatchSnapshot();
        screen.getByText('Carlos Manuel');
        screen.getByText('Logout');
    });

    test('should call the navigate and the dispatch with the args in the function of logout', () => {
        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect( mockDispatch ).toHaveBeenCalledTimes(1);
        expect( mockDispatch ).toHaveBeenCalledWith({ type: types.logout })
        expect( mockNavigate ).toHaveBeenCalledTimes(1);
        expect( mockNavigate ).toHaveBeenCalledWith('/login', {replace: true});
    })
 })
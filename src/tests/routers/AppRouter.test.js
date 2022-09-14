import { prettyDOM, render, screen } from "@testing-library/react";
import { AppRouter } from "../../routers/AppRouter";
import { AuthContext } from '../../auth/authContext';


describe('tests about AppRouter', () => {

    test('should show login page if not be logged', () => {                 
        const contextValue = {
            user: {
                logged: false
            }
        }
        render(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        
        const h1 = screen.getByRole('heading');
        expect( h1.textContent ).toBe('Login');
    });

    test('should show marvel component if be logged', () => {
        const contextValue = {
            user: {
                name: 'Carlos Manuel',
                logged: true
            }
        }                 
        const { container } = render(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        expect( container ).toMatchSnapshot();
        const nav = screen.getByRole('navigation');
        expect(nav).toBeDefined();


        // console.log(prettyDOM(container));
    });

})
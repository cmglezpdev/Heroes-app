import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { PrivateRoute } from '../../routers/PrivateRoute';

Storage.prototype.setItem = jest.fn();

describe('Tests about PrivateRoute', () => {

    test('should show the login page and save the route in the local storage', () => {

        const contextValue = {
            user: {
                logged: false
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/dc']}>
                    <Routes>
                        <Route path='/dc' element={<PrivateRoute><h1>Private Page</h1></PrivateRoute>} />
                        <Route path='/login' element={<h1>This is the login</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        screen.getByText('This is the login');
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/dc');
    });

    test('should show the private page', () => {

        const contextValue = {
            user: {
                logged: true
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/dc']}>
                    <Routes>
                        <Route path='/dc' element={<PrivateRoute><h1>Private Page</h1></PrivateRoute>} />
                        <Route path='/login' element={<h1>This is the login</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        screen.getByText('Private Page');
    })
})
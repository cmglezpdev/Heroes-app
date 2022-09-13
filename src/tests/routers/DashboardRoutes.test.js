/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen, getByText } from '@testing-library/react'
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { AuthContext } from '../../auth/authContext';
import { MemoryRouter } from 'react-router-dom';

describe('Tests abput DashboardRoutes', () => { 

    test('should show correctly the marvel compoments', () => {
        const contextValue = {
            user: {
                name: 'Carlos Manuel',
                logged: true
            }
        }

        const { container } = render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( container ).toMatchSnapshot();
        screen.getByText('Marvel Comics');
    });

    test('should show correctly the dc compoments', () => {
        const contextValue = {
            user: {
                name: 'Carlos Manuel',
                logged: true
            }
        }

        const { container } = render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/dc']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( container ).toMatchSnapshot();
        screen.getByText('DC Comics');
    });

 })
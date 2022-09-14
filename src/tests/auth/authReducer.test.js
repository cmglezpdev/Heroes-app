import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Tests about authReducer', () => {
    
    const initialState = {logged: false};

    test('should return the default state', () => {
    
        const state = authReducer(initialState, {});
        expect( state ).toEqual(initialState);
    });

    test('should be the login and put the name of user', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Carlos'
            }
        }

        const state = authReducer(initialState, action);
        expect(state).toEqual({name: 'Carlos', logged: true});
    })

    test('should be the logout and remove the name of user', () => {
        const action = {type: types.logout};

        const state = authReducer(initialState, action);
        expect(state).toEqual(initialState);
    })
})
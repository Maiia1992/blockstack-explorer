import fetch from 'cross-fetch';

const SUBMITTING_AUTH = 'SUBMITTING_AUTH';
const SUBMITTED_AUTH = 'SUBMITTED_AUTH';
const AUTH_FAILED = 'AUTH_FAILED';

const submittingAuth = () => ({
  type: SUBMITTING_AUTH,
});

const submittedAuth = () => ({
  type: SUBMITTED_AUTH,
});

const authFailed = () => ({
  type: AUTH_FAILED,
});

const submitAuth = (username, password) =>
  async function innerSubmitAuth(dispatch) {
    dispatch(submittingAuth());
    try {
      const url = `/auth?username=${username}&password=${password}`;
      console.log(url);
      await fetch(url, {
        method: 'POST',
      });
      dispatch(submittedAuth());
    } catch (error) {
      console.log(error);
      dispatch(authFailed());
    }
  };

export const Actions = {
  submitAuth,
};

const initialState = {
  isSubmitting: false,
  hasSubmitted: false,
  authFailed: false,
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMITTING_AUTH: {
      return {
        ...initialState,
        isSubmitting: true,
      };
    }
    case SUBMITTED_AUTH: {
      return {
        ...initialState,
        hasSubmitted: true,
      };
    }
    case AUTH_FAILED: {
      return {
        ...initialState,
        authFailed: true,
      };
    }
    default:
      return state;
  }
};
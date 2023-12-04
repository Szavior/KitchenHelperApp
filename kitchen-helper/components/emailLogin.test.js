import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';


// Mock Firebase signInWithEmailAndPassword function
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

describe('Email Login Component', () => {
  it('calls signInWithEmailAndPassword on button press with valid credentials', () => {
    const { getByText, getByLabelText } = render(<emailLogin />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const button = getByText('Sign in with Email');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'testPassword');
    fireEvent.press(button);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object), // Firebase auth object
      'test@example.com',
      'testPassword'
    );
  });

  it('does not call signInWithEmailAndPassword with empty fields on button press', () => {
    const { getByText } = render(<emailLogin />);
    const button = getByText('Sign in with Email');

    fireEvent.press(button);

    expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
  });
});

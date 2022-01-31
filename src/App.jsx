import React from 'react';
import Title from './components/Title';
import Images from './components/Images';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import UploadForm from './components/UploadForm';

Amplify.configure(awsconfig);


function App({ signOut, user }) {

  console.log(user)

  return (
    <div className="App">
      <h1>Hello {user.attributes.email}</h1>
      <button onClick={signOut}>Sign out</button>
      <Title />
      <UploadForm />
      <Images />
    </div>
  );
}

export default withAuthenticator(App);

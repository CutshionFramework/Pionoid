import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Pionoid | Web I/F </title>
      </Helmet>

      <AppView />
    </>
  );
}

import { useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent";

function ErrorPage() {
    const error = useRouteError();
    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if(error.status === 500){
        // method 2: from loader in EventsPage
        // message = JSON.parse(error.data).message;
        // method 3: from loader in EventPage
        message = error.data.message;
    }

    if(error.status === 404){
        title = 'Not found!';
        message = 'Could not find resource or page';
    }
  return (
    <>
    {/* <MainNavigation /> */}
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
    </>
  );
}

export default ErrorPage;
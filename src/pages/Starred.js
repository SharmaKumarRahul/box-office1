import React, { useEffect, useState } from 'react';
import MiainPageLayout from '../components/MiainPageLayout';
import { useShows } from '../misc/custom-hooks';
import { apiGet } from '../misc/config';
import ShowGrid from '../components/show/ShowGrid';

function Starred() {
  const [starred] = useShows();

  const [shows, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promise = starred.map(showId => apiGet(`/shows/${showId}`));
      Promise.all(promise)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          setShow(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          isLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MiainPageLayout>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>erroe occured: {error}</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MiainPageLayout>
  );
}

export default Starred;

import { useCallback, useState } from "react";
import api from "../../utils/api";

const useFetchDomain = () => {
  const [domain, setDomain] = useState({});
  const [domainLoading, setDomainLoading] = useState(false);
  const [domainError, setDomainError] = useState(null);

  const getDomain = useCallback((domainSearched: string) => {
    setDomainLoading(true);
    api
      .get(`/registrobr/v1/${domainSearched}`)
      .then((response) => setDomain(response.data))
      .catch((error) => console.log(error));
    setDomainLoading(false);
  }, []);

  return {
    domain,
    domainLoading,
    domainError,
    getDomain,
  };
};

export default useFetchDomain;

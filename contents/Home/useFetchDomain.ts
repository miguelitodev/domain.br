import { useCallback, useState } from "react";
import api from "../../utils/api";

type Domain = {
  status: string;
  fqdn: string;
};

const useFetchDomain = () => {
  const [domain, setDomain] = useState<Domain>();
  const [domainLoading, setDomainLoading] = useState(false);
  const [domainError, setDomainError] = useState(null);

  const getDomain = useCallback((domainSearched: string) => {
    setDomainLoading(true);
    setDomainError(null);

    api
      .get(`/registrobr/v1/${domainSearched}`)
      .then((response) => setDomain(response.data))
      .catch((error) => setDomainError(error));

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

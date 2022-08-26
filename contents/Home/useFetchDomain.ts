import { useCallback, useState } from "react";
import api from "../../utils/api";

type Domain = {
  status: string;
  fqdn: string;
  suggestions: Array<string>;
};

type DomainError = {
  message: string | null;
};

const useFetchDomain = () => {
  const [domain, setDomain] = useState<Domain | null>();
  const [domainLoading, setDomainLoading] = useState(false);
  const [domainError, setDomainError] = useState<DomainError | null>();

  const getDomain = useCallback(async (domainSearched: string) => {
    setDomainLoading(true);
    setDomainError(null);
    setDomain(null);

    await api
      .get(`/registrobr/v1/${domainSearched}`)
      .then((response) => setDomain(response.data))
      .catch((error) => console.log(error));

    setDomainLoading(false);
  }, []);

  return {
    domain,
    domainLoading,
    domainError,
    setDomainError,
    getDomain,
  };
};

export default useFetchDomain;

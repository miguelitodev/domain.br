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
      .catch(
        (error) =>
          error &&
          setDomainError({
            message:
              "Ocorreu um erro durante a requisição dos seus dados ao servidor. Por favor tente novamente!",
          })
      );

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

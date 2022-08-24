import { useState } from "react";
import styles from "./Home.module.css";
import useFetchDomain from "./useFetchDomain";

export default function Home() {
  const [domainSearched, setDomainSearched] = useState("");
  const { domain, domainError, domainLoading, getDomain } = useFetchDomain();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Registro <span className={styles.titleDetail}>.br</span>
        </h1>
        <h2 className={styles.subtitle}>Consulte domínios disponíveis</h2>
        <input
          className={styles.inputDomain}
          type="text"
          id="domain"
          name="domain"
          placeholder="Digite aqui..."
          onChange={({ target }) => setDomainSearched(target.value)}
        />
        <button
          className={styles.buttonSearch}
          onClick={() => getDomain(domainSearched)}
        >
          Pesquisar
        </button>

        {!domainLoading && !domainError && <div>{JSON.stringify(domain)}</div>}
        {domainError && <div>{JSON.stringify(domain)}</div>}
      </div>
    </div>
  );
}

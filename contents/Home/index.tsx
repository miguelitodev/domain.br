import { useState } from "react";
import styles from "./Home.module.css";
import useFetchDomain from "./useFetchDomain";

export default function Home() {
  const [domainSearched, setDomainSearched] = useState("");
  const { domain, domainError, domainLoading, getDomain } = useFetchDomain();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-2/6">
        <h1 className="text-5xl font-bold text-gray-600">
          Domínio
          <span className="text-6xl font-extrabold text-green-500">.br</span>
        </h1>
        <h2 className="text-lg font-medium text-gray-500 my-3">
          Consulte aqui domínios .br disponíveis
        </h2>
        <div className="flex flex-row">
          <input
            className="p-2 w-full border rounded-md mr-2"
            type="text"
            id="domain"
            name="domain"
            placeholder="Pesquise aqui..."
            onChange={({ target }) => setDomainSearched(target.value)}
          />
          <button
            className="border-2 border-green-600 text-green-600 p-3 rounded-md font-bold hover:bg-green-600 hover:text-white transition-colors"
            onClick={() => getDomain(domainSearched)}
          >
            Pesquisar
          </button>
        </div>
        {!domainError && !domainLoading && domain?.status === "AVAILABLE" && (
          <div className="w-full flex flex-col p-3 my-3 border-l-8 border-green-400 bg-green-100 font-bold">
            <span className="text-green-700">Aoba, domínio disponível! </span>
            <span>
              👉{" "}
              <a
                href={`https://registro.br/busca-dominio/?fqdn=${domainSearched}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {domain.fqdn}
              </a>{" "}
              👈
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import useFetchDomain from "./useFetchDomain";
import { domainVerify } from "../../utils/domainVerify";

export default function Home() {
  const [domainSearched, setDomainSearched] = useState<string>("");
  const { domain, domainError, domainLoading, setDomainError, getDomain } =
    useFetchDomain();

  const searchDomain = () => {
    const { message, result } = domainVerify(domainSearched);
    result ? getDomain(domainSearched) : setDomainError({ message });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4 md:w-2/4 lg:w-2/6">
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
            onChange={({ target }) => {
              setDomainSearched(target.value.split(".")[0]);
            }}
            onKeyUp={(event: React.KeyboardEvent<HTMLElement>) => {
              event.key === "Enter" && searchDomain();
            }}
          />
          <button
            className="border-2 border-green-600 text-green-600 p-3 rounded-md font-bold hover:bg-green-600 hover:text-white transition-colors"
            onClick={() => domainSearched && searchDomain()}
          >
            Pesquisar
          </button>
        </div>

        {domainError && (
          <div className="w-full flex flex-col p-3 my-3 border-l-8 border-red-400 bg-red-100 ">
            <span className="text-red-700 font-bold">
              Vish! deu ruim ai amigão 😱
            </span>
            <span className="text-red-700 font-medium my-1">
              {domainError.message}
            </span>
            <a
              href="https://github.com/miguelrisquelme/domain.br/issues/new"
              target="_blank"
              rel="noreferrer"
              className="hover:underline text-sm"
            >
              Divulgue aqui seu problema aqui
            </a>
          </div>
        )}

        {domainLoading && !domain && (
          <div
            role="status"
            className="mt-3 w-full flex justify-center items-center"
          >
            <svg
              className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {!domainError && !domainLoading && domain?.status === "AVAILABLE" && (
          <>
            <div className="w-full flex flex-col p-3 my-3 border-l-8 border-green-400 bg-green-100 font-bold">
              <span className="text-green-700">Aoba, domínio disponível!</span>
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
          </>
        )}

        {!domainError && !domainLoading && domain?.status === "REGISTERED" && (
          <>
            <div className="w-full flex flex-col p-3 my-3 border-l-8 border-orange-400 bg-orange-100 font-bold">
              <span className="text-orange-700">
                Poxa, este domínio está indisponível! 😭
              </span>
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
            {domain.suggestions && (
              <div className="flex flex-col">
                <span className="font-normal">
                  Fica triste não 🙌, separamos algumas opções disponíveis para
                  você!
                </span>
                <div className="flex flex-row flex-wrap mt-3">
                  {domain.suggestions.map((suggestion, index) => (
                    <a
                      key={index}
                      target="_blank"
                      rel="noreferrer"
                      href={`https://registro.br/busca-dominio/?fqdn=${domainSearched}.${suggestion}`}
                      className="rounded-md px-2 text-green-900 font-bold border-green-500 border-2 hover:bg-green-500 transition-colors ml-1 my-1"
                    >
                      {suggestion}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export const domainVerify = (value: string) => {
  if (value.length < 2 || value.length > 26) {
    return {
      result: false,
      message: "O domínio precisa ter no mínimo 2 e no máximo 26 caracteres.",
    };
  }

  if (value.match(/([^-a-zàáâãéêíóôõúüç0-9])/)) {
    return {
      result: false,
      message:
        "O domínio não pode conter letras maiusculas, espaços e caracteres especiais. Por favor tente novamente!",
    };
  }

  if (Number(value)) {
    return {
      result: false,
      message:
        "O domínio não pode conter apenas números. Por favor tente novamente!",
    };
  }

  if (value.match(/(^[-]|[-]$)/)) {
    return {
      result: false,
      message:
        "O domínio não pode conter hífen no inicio nem no final. Por favor tente novamente!",
    };
  }

  return {
    result: true,
    message: null,
  };
};

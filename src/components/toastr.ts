import toastr from "toastr";

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

export function mostrarMensagem(
  titulo: string,
  mensagem: string,
  tipo: string
) {
  toastr[tipo](mensagem, titulo);
}

export function mensagemErro(mensagem: string) {
  mostrarMensagem("Erro", mensagem, "error");
}

export function mensagemSucesso(mensagem: string) {
  mostrarMensagem("Sucesso", mensagem, "success");
}

export function mensagemAlert(mensagem: string) {
  mostrarMensagem("Alerta", mensagem, "warning");
}

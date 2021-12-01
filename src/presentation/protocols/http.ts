/**
 * interface para respostas das requisições do protocolo http
 */
interface IHttpResponse {
    // Resposta com código dos status do servidor http (220, 400, 500, ...)
    statusCode: number;
    body: any;
}

/**
 * interface para requisições dos paramentros do protocolo http
 */
interface IHttpRequest {
    // paramentros enviado via body
    body?: any;
}

export { IHttpRequest, IHttpResponse };

export class AccessToken {

    private token : string
    private data_expiracao : Date
    private token_secret : string
    private solicitante : string 

    constructor( token : string, data_expiracao : Date, token_secret : string, solicitante : string ){
        this.token = token
        this.data_expiracao = data_expiracao
        this.token_secret = token_secret
        this.solicitante = solicitante 

    }
}
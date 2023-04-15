export class Token {
    //#region Propriedades
    private accessToken: string;
    private data_expiracao: Date;
    private token_secret: string;
    //#endregion

    //#region Construtor
    constructor( accessToken : string, data_expiracao : Date, token_secret : string ){
        this.accessToken = accessToken;
        this.data_expiracao = data_expiracao;
        this.token_secret = token_secret;
    }
    //#endregion

    //#region Gets
    getAccessToken(): string{ return this.accessToken };
    getDataExpiracao(): Date{ return this.data_expiracao };
    getTokenSecret(): string{ return this.token_secret };
    //#endregion

    //#region Sets
    setAccessToken(accessToken: string): void{
        this.accessToken = this.CriptografarAccessToken(accessToken) ;
    }
    setDataExpiracao(dataExp: Date): void | string {
        if(dataExp.getTime() < Date.now()) return `Data inválida`;
        this.data_expiracao = dataExp;
    }
    //#endregion

    //#region Metodos
    CriptografarAccessToken(accessToken: string): string {
        // Método será implementado corretamente no futuro
        return accessToken + this.token_secret;
    }

    ValidarToken(): boolean {
        let userName = sessionStorage.getItem("userName");
        // Validar no banco de dados se o usuário com o userName recuperado possui o accessToken atual e verificar a data de expiração do token
        return true;
    }

    toString(): string{
        return `AccessToken: ${this.accessToken} \n TokenSecret: ${this.token_secret}
             \n Data Expiração: ${this.data_expiracao.toDateString()}`;
    }
    //#endregion
}